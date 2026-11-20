---
layout: base.njk
title: Career History & CV
description: Printable curriculum vitae and PDF resume download for Bradon Gaathe Macharia — IT Support, Technical Operations, and CompTIA Security+.
templateEngineOverride: njk
---

<div class="container section animate-entrance">
  <div class="case-study-header">
    <span class="annotation">Career History</span>
    <h1 class="display-font">Experience &amp; Education</h1>
    <p class="lead-narrow">{{ career.summary }}</p>
    <div class="cv-actions">
      <a href="/assets/cv.pdf" download class="btn">Download Full PDF</a>
      <button type="button" class="btn btn-outline" data-print-page>Print CV</button>
    </div>
  </div>

  <div class="cs-body">
    <h2 class="display-font section-heading">Experience</h2>
    {%- for role in career.roles %}
    <div class="role-entry">
      <h3 class="role-title">{{ role.title }}</h3>
      <p class="annotation mb-sm">{{ role.organization }} &nbsp;|&nbsp; {{ role.period }}</p>

      {%- if role.groups %}
        {%- for group in role.groups %}
        <strong class="role-sublabel">{{ group.label }}:</strong>
        <ul class="role-list">
          {%- for bullet in group.items %}
          <li>{{ bullet }}</li>
          {%- endfor %}
        </ul>
        {%- endfor %}
      {%- elseif role.items %}
        <ul class="role-list">
          {%- for bullet in role.items %}
          <li>{{ bullet }}</li>
          {%- endfor %}
        </ul>
      {%- endif %}
    </div>
    {%- endfor %}

    <h2 class="display-font section-heading--spaced">Technical Skills</h2>
    <div class="skills-grid">
      {%- for group in career.skills %}
      <section class="skill-group">
        <h3 class="display-font">{{ group.category }}</h3>
        <ul class="styled-list">
          {%- for item in group.items %}
          <li>{{ item }}</li>
          {%- endfor %}
        </ul>
      </section>
      {%- endfor %}
    </div>

    <h2 class="display-font section-heading--spaced">Education &amp; Certification</h2>
    <ul class="credential-grid">
      {%- for cert in career.certifications %}
      <li class="credential-card">
        {%- if cert.badge %}
        <div class="credential-badge">
          <img src="{{ cert.badge }}" alt="{{ cert.badgeAlt }}" sizes="72px">
        </div>
        {%- endif %}
        <div>
          <strong class="credential-title">{{ cert.name }}</strong>
          <span class="credential-meta">{{ cert.detail }}</span>
        </div>
      </li>
      {%- endfor %}
      {%- for edu in career.education %}
      <li class="credential-card--stacked">
        <strong class="credential-title">{{ edu.degree }}</strong>
        <span class="credential-meta">{{ edu.institution }}</span>
        <span class="credential-meta">{{ edu.period }}</span>
      </li>
      {%- endfor %}
    </ul>

    <h2 class="display-font section-heading--spaced">Languages</h2>
    <ul class="languages-row">
      {%- for lang in career.languages %}
      <li>{{ lang }}</li>
      {%- endfor %}
    </ul>
  </div>
</div>
