---
layout: base.njk
title: Registry Run Key Persistence & Process Masquerading
description: Home lab DFIR case study investigating Windows Registry Run key persistence (T1547.001), binary masquerading (T1036), and digital signature analysis.
---

<div class="container section animate-entrance">
  <div class="case-study-header">
    <span class="annotation">Independent Home Lab</span>
    <h1 class="display-font">Registry Run Key Persistence &amp; Process Masquerading</h1>
    <div class="lab-meta">
      <span class="lab-meta-item"><strong>Lab Status:</strong> Completed</span>
      <span class="lab-meta-item"><strong>Documentation:</strong> Published</span>
    </div>
    <div class="lab-tags">
      <span class="tag">MITRE T1547.001</span>
      <span class="tag">MITRE T1036</span>
      <span class="tag">Windows Registry</span>
      <span class="tag">PowerShell</span>
      <span class="tag">Signature Analysis</span>
    </div>
  </div>

  <div class="cs-body">
  <p class="disclaimer-note">
    <em>Note: This is an independent home lab investigation and not a professional SOC or client incident-response experience.</em>
  </p>

  <h2 class="display-font mt-lg">Objective and Scope</h2>
  <p>To investigate and document how adversaries achieve persistence using Windows Registry Run keys, and to analyze process masquerading techniques where malicious executables disguise themselves as legitimate system binaries.</p>

  <h2 class="display-font mt-lg">Lab Environment</h2>
  <ul class="styled-list">
    <li>Windows Environment (VMware)</li>
    <li>PowerShell</li>
  </ul>

  <h2 class="display-font mt-lg">What I Personally Did</h2>
  <ul class="styled-list">
    <li>Configured an isolated Windows virtual machine.</li>
    <li>Used PowerShell to copy a payload and establish persistence via the <code>HKCU\Software\Microsoft\Windows\CurrentVersion\Run</code> registry key.</li>
    <li>Executed a masquerading attack by renaming the payload to mimic a legitimate binary (<code>calc.exe</code>).</li>
    <li>Investigated the anomalous binary by analyzing its digital signature and file details.</li>
    <li>Verified the successful execution and persistence of the payload upon system reboot.</li>
  </ul>

  <h2 class="display-font mt-lg">Observations and Supporting Evidence</h2>
  <p>The investigation demonstrated that relying solely on process names (e.g., <code>calc.exe</code>) is insufficient for threat hunting. The examined binary displayed a legitimate Microsoft signature, illustrating that attackers often copy, rename, and misuse legitimate signed software (Living-off-the-Land) to blend in. Therefore, a valid signature alone does not rule out malicious intent, and must be combined with behavioral and path analysis.</p>

  <figure class="case-figure">
    <span class="visual-label">Fig. A — Payload Persistence via Registry</span>
    <a href="/assets/images/E08_CreateRunKey.png" class="gallery-item case-figure-link" aria-label="Enlarge Fig. A — Payload Persistence via Registry">
      <img src="/assets/images/E08_CreateRunKey.png" alt="PowerShell commands copying calc.exe to AppData and creating an HKCU Run key" sizes="(max-width: 768px) 100vw, 800px">
    </a>
  </figure>

  <div class="case-figure-grid">
  <figure class="case-figure case-figure--compact">
    <span class="visual-label">Fig. B — Signature Verification</span>
    <a href="/assets/images/E05C_CalcSignature.png" class="gallery-item case-figure-link" aria-label="Enlarge Fig. B — Signature Verification of Masqueraded Binary">
      <img src="/assets/images/E05C_CalcSignature.png" alt="Windows File Properties Digital Signatures tab showing Microsoft Windows catalogue signature" sizes="(max-width: 768px) 100vw, 275px">
    </a>
  </figure>
  <figure class="case-figure case-figure--compact">
    <span class="visual-label">Fig. C — Persistence Verified</span>
    <a href="/assets/images/E09_PersistenceVerified.png" class="gallery-item case-figure-link" aria-label="Enlarge Fig. C — Persistence Verified After Reboot">
      <img src="/assets/images/E09_PersistenceVerified.png" alt="Calculator window launching automatically after reboot confirming Run key persistence" sizes="(max-width: 768px) 100vw, 222px">
    </a>
  </figure>
  </div>

  <h2 class="display-font mt-lg">Lessons Learned and Limitations</h2>
  <p>This lab reinforced the necessity of defense-in-depth and behavioral analysis. A limitation of this isolated exercise is that it did not simulate enterprise EDR (Endpoint Detection and Response) telemetry, which would likely flag the anomalous registry modification immediately.</p>

  <h2 class="display-font mt-lg">Verified Repository</h2>
  <p>
    <a href="https://github.com/machariaBG/DFIR-Case-01-Registry-Persistence" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">View GitHub Repository</a>
  </p>

  <nav class="case-nav" aria-label="Home lab navigation">
    <a href="/home-labs/" class="btn btn-outline btn-sm">&larr; All Home Labs</a>
    <a href="/home-labs/winpmem/" class="btn btn-outline btn-sm">Next: Scheduled Task &amp; Memory Acquisition &rarr;</a>
  </nav>
  </div>
</div>
