const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

function normalizeGameTitle(value) {
  return String(value || "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["webp", "auto"],
    widths: [400, 800, 1200, "auto"],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "(max-width: 768px) 100vw, 800px",
    },
  });

  eleventyConfig.addFilter("sortScreenshotsByGames", (screenshotsList, gamesList) => {
    if (!Array.isArray(screenshotsList)) return [];
    const rankByTitle = new Map();
    if (Array.isArray(gamesList)) {
      for (const game of gamesList) {
        if (game && typeof game.title === "string" && typeof game.rank === "number") {
          rankByTitle.set(normalizeGameTitle(game.title), game.rank);
        }
      }
    }
    return [...screenshotsList].sort((a, b) => {
      const rankA = rankByTitle.get(normalizeGameTitle(a?.title)) ?? a?.rank ?? Number.MAX_SAFE_INTEGER;
      const rankB = rankByTitle.get(normalizeGameTitle(b?.title)) ?? b?.rank ?? Number.MAX_SAFE_INTEGER;
      return rankA - rankB;
    });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
    if (Number.isNaN(d.getTime())) {
      return new Date().toISOString().slice(0, 10);
    }
    return d.toISOString().slice(0, 10);
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
