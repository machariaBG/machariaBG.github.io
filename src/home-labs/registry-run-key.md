---
layout: base.njk
title: Registry Run Key Persistence & Process Masquerading
---

<div class="container section animate-entrance">
  <div class="case-study-header">
    <span class="annotation">Independent Home Lab</span>
    <h1 class="display-font">Registry Run Key Persistence & Process Masquerading</h1>
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
    <p>To investigate and document how adversaries achieve persistence using Windows Registry Run keys, and to analyze process masquerading techniques where malicious executables disguise themselves as legitimate system binaries.</p>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Lab Environment</h2>
    <ul style="list-style-type: square; color: var(--color-ink-light); padding-left: 1.2rem;">
      <li>Windows Environment (VMware)</li>
      <li>PowerShell</li>
    </ul>

    <h2 class="display-font" style="margin-top: var(--space-lg);">What I Personally Did</h2>
    <ul style="list-style-type: square; color: var(--color-ink-light); padding-left: 1.2rem;">
      <li>Configured an isolated Windows virtual machine.</li>
      <li>Used PowerShell to copy a payload and establish persistence via the <code>HKCU\Software\Microsoft\Windows\CurrentVersion\Run</code> registry key.</li>
      <li>Executed a masquerading attack by renaming the payload to mimic a legitimate binary (<code>calc.exe</code>).</li>
      <li>Investigated the anomalous binary by analyzing its digital signature and file details.</li>
      <li>Verified the successful execution and persistence of the payload upon system reboot.</li>
    </ul>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Observations and Supporting Evidence</h2>
    <p>The investigation demonstrated that relying solely on process names (e.g., <code>calc.exe</code>) is insufficient for threat hunting. The examined binary displayed a legitimate Microsoft signature, illustrating that attackers often copy, rename, and misuse legitimate signed software (Living-off-the-Land) to blend in. Therefore, a valid signature alone does not rule out malicious intent, and must be combined with behavioral and path analysis.</p>
    
    <div style="margin-top: var(--space-md);">
      <img src="/assets/images/E08_CreateRunKey.png" alt="Creating the Registry Run Key" style="width: 100%; height: auto; display: block; border: 1px solid var(--color-line); margin-bottom: 0.5rem;">
      <span class="visual-label">Fig. A - Payload Persistence via Registry</span>
    </div>

    <div style="margin-top: var(--space-md);">
      <img src="/assets/images/E05C_CalcSignature.png" alt="Analyzing the digital signature" style="width: 100%; height: auto; display: block; border: 1px solid var(--color-line); margin-bottom: 0.5rem;">
      <span class="visual-label">Fig. B - Signature Verification of Masqueraded Binary</span>
    </div>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Lessons Learned and Limitations</h2>
    <p>This lab reinforced the necessity of defense-in-depth and behavioral analysis. A limitation of this isolated exercise is that it did not simulate enterprise EDR (Endpoint Detection and Response) telemetry, which would likely flag the anomalous registry modification immediately.</p>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Verified Repository</h2>
    <p>
      <a href="https://github.com/machariaBG/DFIR-Case-01-Registry-Persistence" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size: 0.85rem; padding: 0.5rem 1rem;">View GitHub Repository</a>
    </p>
  </div>
</div>
