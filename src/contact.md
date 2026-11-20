---
layout: base.njk
title: Contact
description: Contact Bradon Gaathe Macharia regarding IT support, service desk, technical operations, and cybersecurity opportunities.
templateEngineOverride: njk
---

<div class="container section animate-entrance">
  <div class="cs-body">
    <span class="annotation">06. Contact</span>
    <h1 class="display-font mt-sm mb-lg">Get in Touch.</h1>
      
    <p class="lead mb-md">
      I am open to discussing roles in IT support, service desk, technical operations, and cybersecurity.
    </p>

    <div class="callout-teal">
      <h2 class="display-font callout-heading">Details</h2>
      <ul class="plain-list">
        <li>
          <strong>Email:</strong>
          <span class="contact-email-row">
            <a href="mailto:{{ site.email }}">{{ site.email }}</a>
            <button type="button" class="btn btn-outline btn-sm" data-copy-email="{{ site.email }}">Copy email</button>
            <span id="copy-status" class="copy-feedback" aria-live="polite"></span>
          </span>
        </li>
        <li><strong>Location:</strong> {{ site.location }}</li>
      </ul>
    </div>

    <div class="callout-amber">
      <h2 class="display-font callout-heading">Online</h2>
      <ul class="plain-list">
        <li><strong>GitHub:</strong> <a href="{{ site.github }}" target="_blank" rel="noopener noreferrer">github.com/machariaBG</a></li>
        <li><strong>LinkedIn:</strong> <a href="{{ site.linkedin }}" target="_blank" rel="noopener noreferrer">linkedin.com/in/macharia-brandon-1077971b8</a></li>
      </ul>
    </div>
    
    <div class="mt-xl">
      <a href="/assets/cv.pdf" download class="btn">Download Full CV (PDF)</a>
    </div>
  </div>
</div>
