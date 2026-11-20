---
layout: base.njk
title: Active Directory Access Control & Identity Lifecycle Lab
description: Home lab case study practicing Active Directory IAM workflows, NTFS/SMB permissions, and account offboarding on Windows Server 2022 and Windows 11.
---

<div class="container section animate-entrance">
  <div class="case-study-header">
    <span class="annotation">Independent Home Lab</span>
    <h1 class="display-font">Active Directory Access Control &amp; Identity Lifecycle</h1>
    <div class="lab-meta">
      <span class="lab-meta-item"><strong>Lab Status:</strong> Completed</span>
      <span class="lab-meta-item"><strong>Documentation:</strong> Published</span>
    </div>
    <div class="lab-tags">
      <span class="tag">Windows Server 2022</span>
      <span class="tag">Windows 11</span>
      <span class="tag">Active Directory</span>
      <span class="tag">NTFS &amp; SMB</span>
      <span class="tag">IAM Offboarding</span>
    </div>
  </div>

  <div class="cs-body">
  <p class="disclaimer-note">
    <em>Note: This is an independent home lab investigation and not a professional SOC or client incident-response experience.</em>
  </p>

  <h2 class="display-font mt-lg">Objective and Scope</h2>
  <p>To practice and validate identity and access-management workflows, including permissions and offboarding processes, in a controlled, non-production environment.</p>

  <h2 class="display-font mt-lg">Lab Environment</h2>
  <ul class="styled-list">
    <li>Windows Server 2022 (Domain Controller)</li>
    <li>Windows 11 (Client Endpoint)</li>
  </ul>

  <h2 class="display-font mt-lg">What I Personally Did</h2>
  <ul class="styled-list">
    <li>Built and isolated the lab environment using Windows Server 2022 and Windows 11.</li>
    <li>Configured group-based NTFS and SMB permissions for simulated departmental shares.</li>
    <li>Tested permitted and denied access using standard, non-elevated user accounts.</li>
    <li>Simulated password resets and complete account offboarding.</li>
    <li>Documented account-disable and authentication tests.</li>
    <li>Published a lab journal and evidence index to the repository.</li>
  </ul>

  <h2 class="display-font mt-lg">Observations and Supporting Evidence</h2>
  <p>During the account offboarding simulations, I observed that while disabling an account prevents subsequent authentication attempts, it does <strong>not necessarily terminate existing authenticated sessions</strong> immediately. This highlights the importance of forced session termination during critical offboarding procedures.</p>

  <h2 class="display-font mt-lg">Lessons Learned and Limitations</h2>
  <p>This lab provided practical insight into the nuances of Windows authentication caching and session lifecycle. A limitation of this lab is its small scale; in a large enterprise environment, replication delays across multiple Domain Controllers would introduce additional offboarding complexity that was not simulated here.</p>

  <h2 class="display-font mt-lg">Verified Repository</h2>
  <p>
    <a href="https://github.com/machariaBG/active-directory-access-control-lab" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">View GitHub Repository</a>
  </p>

  <nav class="case-nav" aria-label="Home lab navigation">
    <a href="/home-labs/" class="btn btn-outline btn-sm">&larr; All Home Labs</a>
    <a href="/home-labs/registry-run-key/" class="btn btn-outline btn-sm">Next: Registry Run Key Persistence &rarr;</a>
  </nav>
  </div>
</div>
