---
layout: base.njk
title: Scheduled Task Persistence & Volatile Memory Acquisition
---

<div class="container section animate-entrance">
  <div class="case-study-header">
    <span class="annotation">Independent Home Lab</span>
    <h1 class="display-font">Scheduled Task Persistence & Volatile Memory Acquisition</h1>
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
    <p>To investigate unauthorized persistence mechanisms utilizing Windows Scheduled Tasks, and to successfully execute a live physical memory acquisition using WinPmem to preserve volatile artifacts before system remediation.</p>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Lab Environment</h2>
    <ul style="list-style-type: square; color: var(--color-ink-light); padding-left: 1.2rem;">
      <li>Windows 11 Pro</li>
      <li>WinPmem (Memory Acquisition)</li>
      <li>PowerShell & Windows Task Scheduler</li>
    </ul>

    <h2 class="display-font" style="margin-top: var(--space-lg);">What I Personally Did</h2>
    <ul style="list-style-type: square; color: var(--color-ink-light); padding-left: 1.2rem;">
      <li>Simulated an attacker by creating a scheduled task (<code>SystemTelemetryUpdate</code>) that executed a hidden PowerShell process upon user logon.</li>
      <li>Enumerated scheduled tasks via CLI (<code>schtasks /query /fo LIST /v</code>) to identify anomalous behaviors such as SYSTEM privilege execution and hidden window parameters.</li>
      <li>Initiated live response procedures prior to remediation to preserve volatile memory.</li>
      <li>Acquired a physical memory image successfully using the WinPmem utility.</li>
    </ul>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Observations and Supporting Evidence</h2>
    <p>The investigation demonstrated how attackers blend malicious activity with legitimate Windows administrative functions. The anomalous task executed a hidden PowerShell process (<code>powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 3600"</code>). By utilizing WinPmem immediately, I successfully captured the simulated memory-resident PowerShell execution, demonstrating how volatile evidence can be preserved for deep forensic analysis (e.g., using Volatility) before the machine was rebooted.</p>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Lessons Learned and Limitations</h2>
    <p>This exercise reinforced the critical forensic principle of order-of-volatility. Because restarting a compromised endpoint destroys volatile evidence, immediate memory acquisition is paramount. A limitation of this lab is that it focused on the acquisition phase rather than the deep memory analysis phase, which would require dedicated tools like Volatility 3 to parse the resulting memory dump.</p>

    <h2 class="display-font" style="margin-top: var(--space-lg);">Verified Repository</h2>
    <p>
      <a href="https://github.com/machariaBG/DFIR-Case-02-Scheduled-Tasks-Memory" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size: 0.85rem; padding: 0.5rem 1rem;">View GitHub Repository</a>
    </p>
  </div>
</div>
