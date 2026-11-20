---
layout: base.njk
title: Home Labs
description: Independent cybersecurity and IT systems home labs covering Active Directory IAM, Registry Run key persistence, and WinPmem memory acquisition.
---

<div class="container section animate-entrance">
  <div class="case-study-header">
    <span class="annotation">Independent Home Labs</span>
    <h1 class="display-font">Lab Environments</h1>
    <p class="lead-narrow">
      This section documents independent learning projects and lab environments. These are educational exercises and not production deployments or client engagements.
    </p>
    <div class="mt-sm">
      <span class="visual-label visual-label--inline">Separate from employment</span>
    </div>
  </div>

  <div class="cs-body">
  <article class="lab-card">
    <h2 class="display-font">Active Directory Access Control &amp; Identity Lifecycle</h2>
    <div class="lab-card-meta">
      <span class="lab-meta-item"><strong>Lab Status:</strong> Completed</span>
      <span class="lab-meta-item"><strong>Documentation:</strong> Published</span>
    </div>
    <p class="mb-xs"><strong>Investigation:</strong> Identity and access-management workflows, group-based permissions, and account offboarding.</p>
    <p class="mb-xs"><strong>Environment:</strong> Windows Server 2022, Windows 11</p>
    <p class="mb-sm"><strong>Outcome:</strong> Disabling an account prevents subsequent authentication but does not necessarily terminate existing authenticated sessions immediately.</p>
    <a href="/home-labs/active-directory/" class="btn btn-outline btn-sm">View case study</a>
  </article>

  <article class="lab-card">
    <h2 class="display-font">Registry Run Key Persistence &amp; Process Masquerading</h2>
    <div class="lab-card-meta">
      <span class="lab-meta-item"><strong>Lab Status:</strong> Completed</span>
      <span class="lab-meta-item"><strong>Documentation:</strong> Published</span>
    </div>
    <p class="mb-xs"><strong>Investigation:</strong> Persistence mechanisms and masquerading techniques in the Windows Registry.</p>
    <p class="mb-xs"><strong>Environment:</strong> Windows Environment (VMware)</p>
    <p class="mb-sm"><strong>Outcome:</strong> Relying on process names is insufficient; signature verification is critical to detect masquerading.</p>
    <a href="/home-labs/registry-run-key/" class="btn btn-outline btn-sm">View case study</a>
  </article>

  <article class="lab-card">
    <h2 class="display-font">Scheduled Task Persistence &amp; Volatile Memory Acquisition</h2>
    <div class="lab-card-meta">
      <span class="lab-meta-item"><strong>Lab Status:</strong> Completed</span>
      <span class="lab-meta-item"><strong>Documentation:</strong> Published</span>
    </div>
    <p class="mb-xs"><strong>Investigation:</strong> Memory acquisition and scheduled task persistence analysis to identify system vulnerabilities.</p>
    <p class="mb-xs"><strong>Environment:</strong> Windows 11 Pro, WinPmem, Sysinternals Suite</p>
    <p class="mb-sm"><strong>Outcome:</strong> Extracting volatile memory prior to remediation is essential to preserve evidence of simulated memory-resident activity (e.g., hidden PowerShell execution) for subsequent analysis.</p>
    <a href="/home-labs/winpmem/" class="btn btn-outline btn-sm">View case study</a>
  </article>
  </div>
</div>
