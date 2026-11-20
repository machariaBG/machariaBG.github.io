---
layout: base.njk
title: Experience
description: Professional experience, technical skills, education, and CompTIA Security+ certification of Bradon Gaathe Macharia.
templateEngineOverride: njk
---

<div class="container section animate-entrance">
  <div class="case-study-header">
    <span class="annotation">Professional Experience</span>
    <h1 class="display-font">Roles &amp; Foundations</h1>
    <p class="lead-narrow">{{ career.summary }}</p>
    <div class="cv-actions">
      <a href="/assets/cv.pdf" download class="btn">Download Full CV (PDF)</a>
      <button type="button" class="btn btn-outline" data-print-page>Print Page</button>
    </div>
  </div>

  <div class="cs-body">
    <h2 class="display-font section-heading">Work Experience</h2>
    {%- for role in career.roles %}
    <div class="role-entry">
      <h3 class="display-font role-title--lg">{{ role.title }}</h3>
      <p class="annotation mb-md">{{ role.organization }} &nbsp;|&nbsp; {{ role.period }}</p>

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
          <span class="annotation mb-0">{{ cert.detail }}</span>
        </div>
      </li>
      {%- endfor %}
      {%- for edu in career.education %}
      <li class="credential-card--stacked">
        <strong class="credential-title">{{ edu.degree }}</strong>
        <span class="annotation mb-xs">{{ edu.institution }}</span>
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
