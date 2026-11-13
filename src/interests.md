---
layout: base.njk
title: Interests & Observation
templateEngineOverride: njk
drawings:
  - url: "/assets/images/Drawing2.png"
    src: "/assets/images/Drawing2.png"
    alt: "Detailed sketch composition"
    title: "Concept Sketch"
    medium: "Digital Drawing"
  - url: "/assets/images/sketch1.jpeg"
    src: "/assets/images/sketch1.jpeg"
    alt: "Pen sketchbook note"
    title: "Field Notes"
    medium: "Pen on Paper"
animations:
  - url: "/assets/images/main.0017.png"
    src: "/assets/images/main.0017.png"
    alt: "Main animation frame"
    title: "Animation Frame"
    medium: "2D Animation"
  - url: "/assets/images/scene%20composition1.jpg"
    src: "/assets/images/scene%20composition1.jpg"
    alt: "Scene composition"
    title: "Scene Composition"
    medium: "2D Animation"
  - url: "/assets/images/Character%20Design%201.jpg"
    src: "/assets/images/Character%20Design%201.jpg"
    alt: "Character design"
    title: "Character Design"
    medium: "2D Animation"
  - url: "/assets/images/environment.png"
    src: "/assets/images/environment.png"
    alt: "Environment frame"
    title: "Environment"
    medium: "2D Animation"
---
{% from "gallery.njk" import item %}

<div class="container section animate-entrance">
  <div class="case-study-header">
    <span class="annotation">Interests</span>
    <h1 class="display-font">Drawing & Animation</h1>
    <p style="font-size: 1.15rem; color: var(--color-ink-light); max-width: 600px;">
      Capturing ideas visually is a core part of my learning process. I enjoy exploring 2D animation, concept sketching, and digital storytelling.
    </p>
  </div>

  <h2 class="display-font" style="margin-top: var(--space-xl); border-bottom: 1px solid var(--color-line); padding-bottom: var(--space-xs);">Drawings & Sketches</h2>
  <div class="gallery-grid interests-gallery">
    {%- for art in drawings -%}
      {{ item(art.url, "View " + art.title, art.src, art.alt, art.title, art.medium) }}
    {%- endfor -%}
  </div>

  <h2 class="display-font" style="margin-top: var(--space-xl); border-bottom: 1px solid var(--color-line); padding-bottom: var(--space-xs);">Animation & Character Design</h2>
  <div class="gallery-grid interests-gallery">
    {%- for art in animations -%}
      {{ item(art.url, "View " + art.title, art.src, art.alt, art.title, art.medium) }}
    {%- endfor -%}
  </div>

  <div style="margin-top: var(--space-xl);">
    <h2 class="display-font" style="border-bottom: 1px solid var(--color-line); padding-bottom: var(--space-xs);">Digital-Security Education</h2>
    <div style="display: flex; flex-wrap: wrap; gap: var(--space-lg); align-items: center; margin-top: var(--space-md);">
      <img src="/assets/images/comptia-security-plus.png" alt="CompTIA Security+ Certified" style="width: 130px; height: auto; flex-shrink: 0;">
      <p style="margin-top: 0; flex: 1; min-width: 250px;">
        One of my goals is to make digital-security education more accessible to Kenyan communities, helping people recognise online risks and protect their accounts and devices.
      </p>
    </div>
  </div>
  
  <div style="margin-top: var(--space-xl);">
    <h2 class="display-font" style="border-bottom: 1px solid var(--color-line); padding-bottom: var(--space-xs);">Gaming Journal</h2>
    <div style="display: flex; flex-wrap: wrap; gap: var(--space-lg); align-items: center; margin-top: var(--space-md);">
      <p style="margin-top: 0; flex: 1; min-width: 250px;">
        Beyond drawing and technical labs, I enjoy exploring immersive video games. I maintain a ranked list of my favourite titles and moments, documented with high-resolution in-game photography.
      </p>
      <a href="/gaming/" class="btn btn-outline" style="flex-shrink: 0;">View Gaming Journal</a>
    </div>
  </div>
</div>
