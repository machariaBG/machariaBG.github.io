---
layout: base.njk
title: Scheduled Task Persistence & Volatile Memory Acquisition
description: Home lab DFIR case study investigating hidden Scheduled Task persistence (T1053.005) and live physical memory acquisition using WinPmem.
---

<div class="container section animate-entrance">
  <div class="case-study-header">
    <span class="annotation">Independent Home Lab</span>
    <h1 class="display-font">Scheduled Task Persistence &amp; Volatile Memory Acquisition</h1>
    <div class="lab-meta">
      <span class="lab-meta-item"><strong>Lab Status:</strong> Completed</span>
      <span class="lab-meta-item"><strong>Documentation:</strong> Published</span>
    </div>
    <div class="lab-tags">
      <span class="tag">MITRE T1053.005</span>
      <span class="tag">Windows 11 Pro</span>
      <span class="tag">WinPmem</span>
      <span class="tag">Scheduled Tasks</span>
      <span class="tag">Volatile Memory</span>
    </div>
  </div>

  <div class="cs-body">
  <p class="disclaimer-note">
    <em>Note: This is an independent home lab investigation and not a professional SOC or client incident-response experience.</em>
  </p>

  <h2 class="display-font mt-lg">Objective and Scope</h2>
  <p>To investigate unauthorized persistence mechanisms utilizing Windows Scheduled Tasks, and to successfully execute a live physical memory acquisition using WinPmem to preserve volatile artifacts before system remediation.</p>

  <h2 class="display-font mt-lg">Lab Environment</h2>
  <ul class="styled-list">
    <li>Windows 11 Pro</li>
    <li>WinPmem (Memory Acquisition)</li>
    <li>PowerShell &amp; Windows Task Scheduler</li>
  </ul>

  <h2 class="display-font mt-lg">What I Personally Did</h2>
  <ul class="styled-list">
    <li>Simulated an attacker by creating a scheduled task (<code>SystemTelemetryUpdate</code>) that executed a hidden PowerShell process upon user logon.</li>
    <li>Enumerated scheduled tasks via CLI (<code>schtasks /query /fo LIST /v</code>) to identify anomalous behaviors such as SYSTEM privilege execution and hidden window parameters.</li>
    <li>Initiated live response procedures prior to remediation to preserve volatile memory.</li>
    <li>Acquired a physical memory image successfully using the WinPmem utility.</li>
  </ul>

  <h2 class="display-font mt-lg">Observations and Supporting Evidence</h2>
  <p>The investigation demonstrated how attackers blend malicious activity with legitimate Windows administrative functions. The anomalous task executed a hidden PowerShell process (<code>powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 3600"</code>). By utilizing WinPmem immediately, I successfully captured the simulated memory-resident PowerShell execution, demonstrating how volatile evidence can be preserved for deep forensic analysis (e.g., using Volatility) before the machine was rebooted.</p>

  <h2 class="display-font mt-lg">Lessons Learned and Limitations</h2>
  <p>This exercise reinforced the critical forensic principle of order-of-volatility. Because restarting a compromised endpoint destroys volatile evidence, immediate memory acquisition is paramount. A limitation of this lab is that it focused on the acquisition phase rather than the deep memory analysis phase, which would require dedicated tools like Volatility 3 to parse the resulting memory dump.</p>

  <h2 class="display-font mt-lg">Verified Repository</h2>
  <p>
    <a href="https://github.com/machariaBG/DFIR-Case-02-Scheduled-Tasks-Memory" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">View GitHub Repository</a>
  </p>

  <nav class="case-nav" aria-label="Home lab navigation">
    <a href="/home-labs/" class="btn btn-outline btn-sm">&larr; All Home Labs</a>
    <a href="/home-labs/registry-run-key/" class="btn btn-outline btn-sm">&larr; Previous: Registry Run Key Persistence</a>
  </nav>
  </div>
</div>
