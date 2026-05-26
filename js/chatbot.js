/* SESSION 3 FINAL — js/chatbot.js — Jay Orog — Axythra */

var CHATBOT_SETTINGS = {
  notifDelay: 8000,
  hideDefaultChatbaseButton: true,
};

function createLauncher() {
  var btn = document.createElement('button');
  btn.id = 'chat-launcher';
  btn.setAttribute('aria-label', 'Open chat assistant');
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.254 2 11.5c0 2.07.643 3.994 1.744 5.576L2.293 20.707A1 1 0 003.5 22.1l3.824-1.14A10.12 10.12 0 0012 21c5.523 0 10-4.254 10-9.5S17.523 2 12 2z"/></svg><span class="notif-dot"></span>';
  document.body.appendChild(btn);
  return btn;
}

function setupToggle(btn) {
  btn.addEventListener('click', function() {
    var cb = document.querySelector('#chatbase-bubble-button');
    if (cb) cb.click();
    btn.classList.remove('has-notif');
  });
}

function setupNotifDot(btn) {
  if (CHATBOT_SETTINGS.notifDelay <= 0) return;
  setTimeout(function() {
    btn.classList.add('has-notif');
  }, CHATBOT_SETTINGS.notifDelay);
}

function hideDefaultChatbaseButton() {
  if (!CHATBOT_SETTINGS.hideDefaultChatbaseButton) return;
  var style = document.createElement('style');
  style.textContent = '#chatbase-bubble-button { display: none !important; }';
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
  var launcher = createLauncher();
  setupToggle(launcher);
  setupNotifDot(launcher);
  hideDefaultChatbaseButton();
  console.log('[chatbot.js] Chat launcher initialised ✓');
});