'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { Client, isFullBlock, extractPageId } = require('@notionhq/client');

const NOTION_VERSION = '2025-09-03';
const DEFAULT_GAMES_PATH = path.resolve(__dirname, '..', 'src', '_data', 'games.json');
const DEFAULT_OVERRIDES_PATH = path.resolve(__dirname, '..', 'src', '_data', 'gameTitleOverrides.json');

/**
 * Concatenates plain text from a Notion rich_text array and normalizes outer whitespace.
 * @param {Array<{ plain_text?: string }>} richText
 * @returns {string}
 */
function extractPlainText(richText) {
  if (!Array.isArray(richText)) return '';
  return richText
    .map((item) => (typeof item?.plain_text === 'string' ? item.plain_text : ''))
    .join('')
    .trim();
}

/**
 * Normalizes a game title for fallback lookup in gameTitleOverrides.json.
 * @param {string} value
 * @returns {string}
 */
function normalizeOverrideKey(value) {
  return value
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Loads display-name overrides from JSON, returning exact and normalized maps.
 * @param {string} overridesPath
 * @returns {{ exact: Record<string, string>, normalized: Map<string, string> }}
 */
function loadTitleOverrides(overridesPath = DEFAULT_OVERRIDES_PATH) {
  const exact = {};
  const normalized = new Map();

  if (!fs.existsSync(overridesPath)) {
    return { exact, normalized };
  }

  const parsed = JSON.parse(fs.readFileSync(overridesPath, 'utf8'));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('gameTitleOverrides.json must be a JSON object.');
  }

  for (const [key, val] of Object.entries(parsed)) {
    if (typeof val === 'string' && val.trim()) {
      const cleanVal = val.trim();
      exact[key] = cleanVal;
      normalized.set(normalizeOverrideKey(key), cleanVal);
    }
  }

  return { exact, normalized };
}

/**
 * Resolves a raw Notion title using exact then normalized override lookups.
 * @param {string} rawTitle
 * @param {{ exact: Record<string, string>, normalized: Map<string, string> }} overrides
 * @returns {string}
 */
function resolveDisplayTitle(rawTitle, overrides) {
  if (Object.prototype.hasOwnProperty.call(overrides.exact, rawTitle)) {
    return overrides.exact[rawTitle];
  }
  const norm = overrides.normalized.get(normalizeOverrideKey(rawTitle));
  return norm || rawTitle;
}

/**
 * Paginates through all child blocks of a Notion block or page.
 * @param {import('@notionhq/client').Client} notion
 * @param {string} blockId
 * @returns {Promise<Array<object>>}
 */
async function fetchAllChildren(notion, blockId) {
  const blocks = [];
  let cursor;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    });

    if (!response || !Array.isArray(response.results)) {
      throw new Error('Unexpected response shape from Notion blocks.children.list.');
    }

    blocks.push(...response.results);
    cursor = response.has_more && response.next_cursor ? response.next_cursor : undefined;
  } while (cursor);

  return blocks;
}

/**
 * Builds the plain-text ranked game list from Notion page blocks.
 * @param {import('@notionhq/client').Client} notion
 * @param {string} pageId
 * @param {{ exact: Record<string, string>, normalized: Map<string, string> }} overrides
 * @returns {Promise<Array<{ rank: number, title: string, notes?: string }>>}
 */
async function buildGamesList(notion, pageId, overrides) {
  const topBlocks = await fetchAllChildren(notion, pageId);
  const games = [];

  for (const block of topBlocks) {
    if (!isFullBlock(block) || block.type !== 'numbered_list_item') {
      continue;
    }

    const rawTitle = extractPlainText(block.numbered_list_item?.rich_text);
    if (!rawTitle) {
      continue;
    }

    const title = resolveDisplayTitle(rawTitle, overrides);
    const entry = {
      rank: games.length + 1,
      title,
    };

    if (block.has_children) {
      const childBlocks = await fetchAllChildren(notion, block.id);
      const noteParts = childBlocks
        .filter((child) => isFullBlock(child) && child.type === 'bulleted_list_item')
        .map((child) => extractPlainText(child.bulleted_list_item?.rich_text))
        .filter(Boolean);

      if (noteParts.length > 0) {
        entry.notes = noteParts.join(' ');
      }
    }

    games.push(entry);
  }

  return games;
}

/**
 * Atomically writes games data to disk only after validation succeeds.
 * @param {string} outputPath
 * @param {Array<{ rank: number, title: string, notes?: string }>} games
 */
function writeGamesAtomically(outputPath, games) {
  const tmpPath = `${outputPath}.tmp`;
  try {
    fs.writeFileSync(tmpPath, JSON.stringify(games, null, 2) + '\n', 'utf8');
    fs.renameSync(tmpPath, outputPath);
  } catch (err) {
    if (fs.existsSync(tmpPath)) {
      try {
        fs.unlinkSync(tmpPath);
      } catch (_) {
        // Ignore cleanup failure
      }
    }
    throw err;
  }
}

/**
 * Syncs Notion page numbered list into src/_data/games.json with fail-safe preservation.
 * @param {object} [options]
 * @returns {Promise<Array<{ rank: number, title: string, notes?: string }>>}
 */
async function syncNotionGames(options = {}) {
  const token = (options.token ?? process.env.NOTION_TOKEN ?? '').trim();
  const rawPageId = (options.pageId ?? process.env.NOTION_PAGE_ID ?? '').trim();
  const outputPath = options.outputPath ?? DEFAULT_GAMES_PATH;
  const overridesPath = options.overridesPath ?? DEFAULT_OVERRIDES_PATH;

  if (!token) {
    throw new Error('NOTION_TOKEN environment variable is missing or empty.');
  }

  const pageId = extractPageId(rawPageId);
  if (!pageId) {
    throw new Error('NOTION_PAGE_ID environment variable is missing or not a valid Notion page ID/URL.');
  }

  const notion = options.client ?? new Client({
    auth: token,
    notionVersion: NOTION_VERSION,
  });

  const overrides = loadTitleOverrides(overridesPath);
  const games = await buildGamesList(notion, pageId, overrides);

  if (games.length === 0) {
    throw new Error('Notion page returned zero valid numbered_list_item game titles. Keeping existing games.json.');
  }

  writeGamesAtomically(outputPath, games);
  return games;
}

async function main() {
  try {
    const games = await syncNotionGames();
    console.log(`Synced ${games.length} games from Notion into src/_data/games.json.`);
  } catch (err) {
    const message = err && err.message ? err.message : 'Unknown error during Notion sync.';
    console.error(`Notion sync failed: ${message}`);
    console.error('Existing src/_data/games.json was preserved unchanged.');
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  extractPlainText,
  normalizeOverrideKey,
  loadTitleOverrides,
  resolveDisplayTitle,
  fetchAllChildren,
  buildGamesList,
  writeGamesAtomically,
  syncNotionGames,
};
