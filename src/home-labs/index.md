---
layout: base.njk
title: Home Labs
---

<div class="container section animate-entrance">
  <div class="case-study-header">
    <span class="annotation">Independent Home Labs</span>
    <h1 class="display-font">Lab Environments</h1>
    <p style="font-size: 1.15rem; color: var(--color-ink-light); max-width: 600px;">
      This section documents independent learning projects and lab environments. These are educational exercises and not production deployments or client engagements.
    </p>
    <div style="margin-top: 1rem;">
      <span class="visual-label" style="position: relative; top: 0; right: 0;">Separate from employment</span>
    </div>
  </div>

  <div class="cs-body">
    <div class="project-visual" style="margin-bottom: var(--space-md); padding: var(--space-md); text-align: left;">
      <h3 class="display-font">Active Directory Access Control & Identity Lifecycle</h3>
      <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-ink-light); margin-bottom: 1rem; border-bottom: 1px solid var(--color-line); padding-bottom: 0.5rem;">
        <span style="display:inline-block; margin-right: 1.5rem;"><strong style="color:var(--color-navy);">Lab Status:</strong> Completed</span>
        <span style="display:inline-block;"><strong style="color:var(--color-navy);">Documentation:</strong> Published</span>
      </div>
      <p style="margin-bottom: 0.5rem;"><strong>Investigation:</strong> Identity and access-management workflows, group-based permissions, and account offboarding.</p>
      <p style="margin-bottom: 0.5rem;"><strong>Environment:</strong> Windows Server 2022, Windows 11</p>
      <p style="margin-bottom: 1rem;"><strong>Outcome:</strong> Disabling an account prevents subsequent authentication but does not necessarily terminate existing authenticated sessions immediately.</p>
      <a href="/home-labs/active-directory/" class="btn btn-outline" style="font-size: 0.8rem; padding: 0.5rem 1rem;">View case study</a>
    </div>

    <div class="project-visual" style="margin-bottom: var(--space-md); padding: var(--space-md); text-align: left;">
      <h3 class="display-font">Registry Run Key Persistence & Process Masquerading</h3>
      <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-ink-light); margin-bottom: 1rem; border-bottom: 1px solid var(--color-line); padding-bottom: 0.5rem;">
        <span style="display:inline-block; margin-right: 1.5rem;"><strong style="color:var(--color-navy);">Lab Status:</strong> Completed</span>
        <span style="display:inline-block;"><strong style="color:var(--color-navy);">Documentation:</strong> Published</span>
      </div>
      <p style="margin-bottom: 0.5rem;"><strong>Investigation:</strong> Persistence mechanisms and masquerading techniques in the Windows Registry.</p>
      <p style="margin-bottom: 0.5rem;"><strong>Environment:</strong> Windows Environment</p>
      <p style="margin-bottom: 1rem;"><strong>Outcome:</strong> Relying on process names is insufficient; signature verification is critical to detect masquerading.</p>
      <a href="/home-labs/registry-run-key/" class="btn btn-outline" style="font-size: 0.8rem; padding: 0.5rem 1rem;">View case study</a>
    </div>

    <div class="project-visual" style="margin-bottom: var(--space-md); padding: var(--space-md); text-align: left;">
      <h3 class="display-font">Memory Acquisition & Root Cause Analysis</h3>
      <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-ink-light); margin-bottom: 1rem; border-bottom: 1px solid var(--color-line); padding-bottom: 0.5rem;">
        <span style="display:inline-block; margin-right: 1.5rem;"><strong style="color:var(--color-navy);">Lab Status:</strong> Completed</span>
        <span style="display:inline-block;"><strong style="color:var(--color-navy);">Documentation:</strong> Published</span>
      </div>
      <p style="margin-bottom: 0.5rem;"><strong>Investigation:</strong> Memory acquisition and scheduled task persistence analysis to identify system vulnerabilities.</p>
      <p style="margin-bottom: 0.5rem;"><strong>Environment:</strong> WinPmem, Sysinternals Suite, Digital Forensics Tools</p>
      <p style="margin-bottom: 1rem;"><strong>Outcome:</strong> Extracting volatile memory prior to remediation is essential to preserve evidence of simulated memory-resident activity (e.g., hidden PowerShell execution) for subsequent analysis.</p>
      <a href="/home-labs/winpmem/" class="btn btn-outline" style="font-size: 0.8rem; padding: 0.5rem 1rem;">View case study</a>
    </div>
  </div>
</div>
