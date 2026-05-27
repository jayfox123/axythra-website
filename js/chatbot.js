/* SESSION 3 FINAL — js/chatbot.js — Jay Orog — Axythra */

var CHATBOT_SETTINGS = {
  notifDelay: 8000,
  hideDefaultChatbaseButton: true,
};

function createLauncher() {
  var btn = document.createElement('button');
  btn.id = 'chat-launcher';
  btn.setAttribute('aria-label', 'Open chat assistant');
  btn.innerHTML = `
  <img 
    src="chatbot-icon.svg" 
    alt="Chat with Axythra AI"
    style="width:28px; height:28px; filter: brightness(0) invert(1);"/>
  <span class="notif-dot" aria-hidden="true"></span>`;
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