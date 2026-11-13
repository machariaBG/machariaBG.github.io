---
layout: base.njk
title: Bradon Gaathe Macharia | Professional Portfolio
description: IT Support & Technical Operations | Digital Forensics & Cybersecurity | CompTIA Security+
templateEngineOverride: njk
---

<div class="container animate-entrance">
  <section class="hero grid">
    <div class="hero-content">
      <span class="annotation">01. Identity & Direction</span>
      <h1 style="margin-bottom: var(--space-xs);">Bradon Gaathe Macharia.</h1>
      <p class="hero-intro" style="margin-bottom: var(--space-sm);"><strong>IT Support & Technical Operations <span style="color: var(--color-teal);">&middot; Digital Forensics & Cybersecurity</span></strong></p>
      <p class="hero-intro" style="margin-top: 0;">I enjoy understanding how things work—and making technology easier for people to use. My approach combines methodical troubleshooting from gaming operations with continuous hands-on exploration in cybersecurity labs.</p>
      <div class="hero-actions">
        <a href="#selected-work" class="btn">Explore my work</a>
        <a href="/contact/" class="btn btn-outline">Contact me</a>
      </div>
    </div>
    <div class="hero-graphic">
      <div class="video-wrapper">
        <video id="hero-video" autoplay loop muted playsinline class="video-frame" aria-label="Animated greeting">
          <source src="/assets/images/heeyy.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <button id="video-toggle" class="video-controls" aria-label="Pause animation">
          <!-- Pause icon SVG -->
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        </button>
        <div class="handwritten-annotation">heeyy 👋</div>
      </div>
    </div>
  </section>
</div>

<section class="foundation-strip">
  <div class="container">
    <span class="annotation" style="color: var(--color-teal);">02. Professional Foundation</span>
    <h2>Experience & Education</h2>
    <div class="foundation-items">
      <div>
        <div class="f-item-meta">12 June 2023 - 27 April 2026</div>
        <div class="f-item-title">Game Operator</div>
        <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem;">Q8 Tech, Kuwait. Hardware troubleshooting, equipment maintenance, and customer assistance.</p>
      </div>
      <div>
        <div class="f-item-meta">Kenyatta University</div>
        <div class="f-item-title">BSc Forensic Science</div>
        <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem;">Analytical foundation for structured problem solving.</p>
      </div>
      <div>
        <div class="f-item-meta">Passed 28 August 2026</div>
        <div class="f-item-title">CompTIA Security+</div>
        <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem;">SY0-701 certification validating core security and troubleshooting principles.</p>
      </div>
    </div>
  </div>
</section>

<div class="container" id="selected-work" style="padding-top: var(--space-xl);">
  <span class="annotation">03. Selected Work</span>
  <h2>Application Projects</h2>

  <!-- Project 1 -->
  <article class="project-showcase">
    <div class="project-content">
      <h3 class="display-font">Mtaa Rooms</h3>
      <div class="project-meta">Status: Prototype / AI-Assisted Development</div>
      <p><strong>The Problem:</strong> Rental discovery focused on ordinary room seekers navigating scattered local listings.</p>
      <p><strong>My Contribution:</strong> Product direction, user requirements, and rigorous logic validation.</p>
      <a href="/apps/mtaa-rooms/" class="btn btn-outline" style="margin-top: 1rem;">Read Case Study</a>
    </div>
    <div class="project-visual">
      <span class="visual-label">Fig. A - App Interface</span>
      <img src="/assets/images/mtaa-rooms.png" alt="Mtaa Rooms interface" style="width: 100%; height: auto; display: block;">
    </div>
  </article>

  <!-- Project 2 (Alt Layout) -->
  <article class="project-showcase alt">
    <div class="project-content">
      <h3 class="display-font">Opportunity Radar</h3>
      <div class="project-meta">Status: Prototype / AI-Assisted Development</div>
      <p><strong>The Problem:</strong> Manual evaluation of job descriptions against a specific professional profile is subjective and slow.</p>
      <p><strong>My Contribution:</strong> Evaluation rubric design, requirement specification, and handoff architecture.</p>
      <a href="/apps/opportunity-radar/" class="btn btn-outline" style="margin-top: 1rem;">Read Case Study</a>
    </div>
    <div class="project-visual">
      <span class="visual-label">Fig. B - App Interface</span>
      <img src="/assets/images/opportunity-radar.png" alt="Opportunity Radar interface" style="width: 100%; height: auto; display: block;">
    </div>
  </article>

  <!-- Project 3 -->
  <article class="project-showcase">
    <div class="project-content">
      <h3 class="display-font">FitCV</h3>
      <div class="project-meta">Status: Prototype / AI-Assisted Development</div>
      <p><strong>The Problem:</strong> Repetitive CV tailoring requires independent automation without losing human oversight.</p>
      <p><strong>My Contribution:</strong> Workflow design, structural requirements, and integration validation.</p>
      <a href="/apps/fitcv/" class="btn btn-outline" style="margin-top: 1rem;">Read Case Study</a>
    </div>
    <div class="project-visual">
      <span class="visual-label">Fig. C - App Interface</span>
      <img src="/assets/images/fit-cv.png" alt="FitCV interface" style="width: 100%; height: auto; display: block;">
    </div>
  </article>
</div>

<div class="container section">
  <span class="annotation">04. Field Notes</span>
  <h2>Independent Home Labs</h2>
  <p style="margin-bottom: var(--space-lg); color: var(--color-ink-light);"><strong>Note:</strong> Separate from employment. These are educational exercises.</p>
  
  <div class="field-notes-grid">
    <div class="note-card completed">
      <h3>Active Directory Access Control</h3>
      <p>Isolated lab (Server 2022 / Win 11) to practice identity workflows, NTFS permissions, and offboarding simulations.</p>
      <a href="/home-labs/active-directory/">View case study &rarr;</a>
    </div>
    <div class="note-card">
      <h3>Registry Run Key Persistence</h3>
      <p>Investigation into process masquerading and persistence mechanisms.</p>
      <a href="/home-labs/registry-run-key/">View case study &rarr;</a>
    </div>
    <div class="note-card">
      <h3>Volatile Memory Acquisition</h3>
        <p>Scheduled task persistence analysis using WinPmem.</p>
        <a href="/home-labs/winpmem/">View case study &rarr;</a>
    </div>
  </div>
</div>

<div class="container section">
  <span class="annotation">05. Sketches</span>
  <div class="sketchbook-section">
    <div class="sketchbook-content">
      <h2 class="display-font">Interests & Observation</h2>
      <p>I enjoy drawing and exploring how technology can help people. One of my long-term goals is to make digital-security education more accessible to Kenyan communities.</p>
      <div class="gallery-grid" style="margin-top: var(--space-md);">
        <a href="/assets/images/Drawing2.png" class="gallery-item" aria-label="View Concept Sketch">
          <img src="/assets/images/Drawing2.png" alt="Detailed sketch composition">
          <div class="gallery-caption">
            <span class="gallery-title">Concept Sketch</span>
            <span class="gallery-medium">Digital Drawing</span>
          </div>
        </a>
        <a href="/assets/images/sketch1.jpeg" class="gallery-item" aria-label="View Field Notes">
          <img src="/assets/images/sketch1.jpeg" alt="Pen sketchbook note">
          <div class="gallery-caption">
            <span class="gallery-title">Field Notes</span>
            <span class="gallery-medium">Pen on Paper</span>
          </div>
        </a>
      </div>
      <a href="/interests/" class="btn btn-outline" style="margin-top: 1rem;">View Full Gallery</a>
    </div>
  </div>
</div>
