/* ============================================================
   SESSION 4 (ULTRA COMPACT) — js/leadform.js
   Jay Orog — Axythra AI Automation
============================================================ */

var LEADFORM_CONFIG = {
  triggerPhrases: [
    'get started','interested','contact','reach out',
    'book','pricing','quote','hire you','work with you',
  ],
  storageKey: 'axythra_leads',
};

/* Build compact inline form */
function buildFormHTML() {
  return `
    <div id="lead-form-wrapper">
      <p class="lf-heading">Let's connect! 👋</p>
      <form id="lead-form" novalidate>
        <div class="lf-field">
          <label>Name *</label>
          <input type="text" id="lf-name" placeholder="John Smith" required />
          <span class="lf-error" id="lf-name-error"></span>
        </div>
        <div class="lf-field">
          <label>Email *</label>
          <input type="email" id="lf-email" placeholder="hello@company.com" required />
          <span class="lf-error" id="lf-email-error"></span>
        </div>
        <div class="lf-field">
          <label>Service</label>
          <select id="lf-service">
            <option value="">Select...</option>
            <option value="workflow-automation">Workflow Automation</option>
            <option value="funnel">Funnel Workflow</option>
            <option value="website">Website / Landing Page</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
        <button type="submit" class="lf-btn-submit">Send →</button>
      </form>
      <div id="lf-success" style="display:none; color:#fff; padding:12px; text-align:center;">
        ✅ Got it! We'll reach out within 24 hours.
      </div>
    </div>
  `;
}

function injectLeadForm() {
  if (document.getElementById('lead-form-wrapper')) return;
  var c = document.createElement('div');
  c.id = 'lead-form-container';
  c.innerHTML = buildFormHTML();
  document.body.appendChild(c);
  setupFormSubmission();
  console.log('[leadform.js] Lead form injected ✓');
}

function validateForm() {
  var ok = true;
  document.querySelectorAll('.lf-error').forEach(function(e){ e.textContent=''; });
  if (!document.getElementById('lf-name').value.trim()) {
    document.getElementById('lf-name-error').textContent = 'Required';
    ok = false;
  }
  var email = document.getElementById('lf-email').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('lf-email-error').textContent = 'Valid email required';
    ok = false;
  }
  return ok;
}

function saveLead(data) {
  var leads = JSON.parse(localStorage.getItem(LEADFORM_CONFIG.storageKey) || '[]');
  data.timestamp = new Date().toISOString();
  leads.push(data);
  localStorage.setItem(LEADFORM_CONFIG.storageKey, JSON.stringify(leads));
  console.log('[leadform.js] Lead saved ✓', data);
}

function setupFormSubmission() {
  var form = document.getElementById('lead-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validateForm()) return;
    saveLead({
      name:    document.getElementById('lf-name').value.trim(),
      email:   document.getElementById('lf-email').value.trim(),
      service: document.getElementById('lf-service').value,
    });
    document.getElementById('lead-form').style.display = 'none';
    document.getElementById('lf-success').style.display = 'block';
    setTimeout(function() {
      var c = document.getElementById('lead-form-container');
      if (c) c.remove();
    }, 3000);
  });
}

function setupTriggerDetection() {
  var pollInterval = setInterval(function() {
    var chatWindow = document.querySelector('#chatbase-bubble-window');
    if (chatWindow) {
      clearInterval(pollInterval);
      console.log('[leadform.js] Trigger detection active ✓');
    }
  }, 1000);
}

/* View leads in console: viewLeads() */
window.viewLeads = function() {
  var leads = JSON.parse(localStorage.getItem(LEADFORM_CONFIG.storageKey) || '[]');
  if (!leads.length) { console.log('No leads yet.'); return; }
  console.table(leads);
};

document.addEventListener('DOMContentLoaded', function() {
  setupTriggerDetection();

  /* Trigger button on page */
  var btn = document.getElementById('trigger-lead-form');
  if (btn) btn.addEventListener('click', injectLeadForm);

  console.log('[leadform.js] Lead capture module loaded ✓');
});