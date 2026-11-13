---
layout: base.njk
title: Active Directory Access Control & Identity Lifecycle Lab
---

<div class="container section animate-entrance">
  <div class="case-study-header">
    <span class="annotation">Independent Home Lab</span>
    <h1 class="display-font">Active Directory Access Control & Identity Lifecycle</h1>
    <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-ink-light); margin-top: 1rem;">
      <span style="display:inline-block; margin-right: 1.5rem;"><strong style="color:var(--color-navy);">Lab Status:</strong> Completed</span>
      <span style="display:inline-block;"><strong style="color:var(--color-navy);">Documentation:</strong> Published</span>
    </div>
  </div>

  <div class="cs-body">
    <p style="padding: var(--space-sm); background: rgba(226, 135, 67, 0.1); border-left: 2px solid var(--color-amber); font-size: 0.9rem;">
      <em>Note: This is an independent home lab investigation and not a professional SOC or client incident-response experience.</em>
    </p>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Objective and Scope</h2>
    <p>To practice and validate identity and access-management workflows, including permissions and offboarding processes, in a controlled, non-production environment.</p>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Lab Environment</h2>
    <ul style="list-style-type: square; color: var(--color-ink-light); padding-left: 1.2rem;">
      <li>Windows Server 2022 (Domain Controller)</li>
      <li>Windows 11 (Client Endpoint)</li>
    </ul>

    <h2 class="display-font" style="margin-top: var(--space-lg);">What I Personally Did</h2>
    <ul style="list-style-type: square; color: var(--color-ink-light); padding-left: 1.2rem;">
      <li>Built and isolated the lab environment using Windows Server 2022 and Windows 11.</li>
      <li>Configured group-based NTFS and SMB permissions for simulated departmental shares.</li>
      <li>Tested permitted and denied access using standard, non-elevated user accounts.</li>
      <li>Simulated password resets and complete account offboarding.</li>
      <li>Documented account-disable and authentication tests.</li>
      <li>Published a lab journal and evidence index to the repository.</li>
    </ul>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Observations and Supporting Evidence</h2>
    <p>During the account offboarding simulations, I observed that while disabling an account prevents subsequent authentication attempts, it does <strong>not necessarily terminate existing authenticated sessions</strong> immediately. This highlights the importance of forced session termination during critical offboarding procedures.</p>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Lessons Learned and Limitations</h2>
    <p>This lab provided practical insight into the nuances of Windows authentication caching and session lifecycle. A limitation of this lab is its small scale; in a large enterprise environment, replication delays across multiple Domain Controllers would introduce additional offboarding complexity that was not simulated here.</p>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Verified Repository</h2>
    <p>
      <a href="https://github.com/machariaBG/active-directory-access-control-lab" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size: 0.85rem; padding: 0.5rem 1rem;">View GitHub Repository</a>
    </p>
  </div>
</div>
