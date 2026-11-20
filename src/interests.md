---
layout: base.njk
title: Interests & Observation
description: Drawings, 2D animation frames, digital-security education goals, and gaming photography by Bradon Gaathe Macharia.
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
  - url: "/assets/images/scene-composition-1.jpg"
    src: "/assets/images/scene-composition-1.jpg"
    alt: "Scene composition"
    title: "Scene Composition"
    medium: "2D Animation"
  - url: "/assets/images/character-design-1.jpg"
    src: "/assets/images/character-design-1.jpg"
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
    <h1 class="display-font">Drawing &amp; Animation</h1>
    <p class="lead-narrow">
      Capturing ideas visually is a core part of my learning process. I enjoy exploring 2D animation, concept sketching, and digital storytelling.
    </p>
  </div>

  <h2 class="display-font section-heading--spaced">Drawings &amp; Sketches</h2>
  <div class="gallery-grid interests-gallery">
    {%- for art in drawings -%}
      {{ item(art.url, "View " + art.title, art.src, art.alt, art.title, art.medium) }}
    {%- endfor -%}
  </div>

  <h2 class="display-font section-heading--spaced">Animation &amp; Character Design</h2>
  <div class="gallery-grid interests-gallery">
    {%- for art in animations -%}
      {{ item(art.url, "View " + art.title, art.src, art.alt, art.title, art.medium) }}
    {%- endfor -%}
  </div>

  <div class="mt-xl">
    <h2 class="display-font section-heading">Digital-Security Education</h2>
    <div class="feature-row">
      <div class="feature-badge">
        <img src="/assets/images/comptia-security-plus.png" alt="CompTIA Security+ Certified" sizes="130px">
      </div>
      <p class="feature-copy">
        One of my goals is to make digital-security education more accessible to Kenyan communities, helping people recognise online risks and protect their accounts and devices.
      </p>
    </div>
  </div>
  
  <div class="mt-xl">
    <h2 class="display-font section-heading">Gaming Journal</h2>
    <div class="feature-row">
      <p class="feature-copy">
        Beyond drawing and technical labs, I enjoy exploring immersive video games. I maintain a ranked list of my favourite titles and moments, documented with high-resolution in-game photography.
      </p>
      <a href="/gaming/" class="btn btn-outline">View Gaming Journal</a>
    </div>
  </div>
</div>
