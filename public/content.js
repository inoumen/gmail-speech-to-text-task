// content.js
function createFloatingMicButton() {
    if (document.getElementById('voice-overlay-btn')) return;
  
    const btn = document.createElement('div');
    btn.id = 'voice-overlay-btn';
    btn.style.position = 'fixed';
    btn.style.bottom = '48px';
    btn.style.right = '48px';
    btn.style.width = '48px';
    btn.style.height = '48px';
    btn.style.background = '#1976d2';
    btn.style.color = '#fff';
    btn.style.borderRadius = '50%';
    btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
    btn.style.display = 'flex';
    btn.style.justifyContent = 'center';
    btn.style.alignItems = 'center';
    btn.style.cursor = 'pointer';
    btn.style.zIndex = '9999';
  
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zM17.3 11c0 3.07-2.5 5.57-5.58 5.57S6.1 14.07 6.1 11H4c0 4.08 3.05 7.44 7 7.93V22h2v-3.07c3.95-.49 7-3.85 7-7.93h-2.7z"/></svg>';
  
    document.body.appendChild(btn);
  
    btn.addEventListener('click', () => {
      alert('Voice dictation triggered! (You can link this to your real logic)');
    });
  }
  
  chrome.storage.sync.get(['overlayEnabled'], (res) => {
    if (res.overlayEnabled && window.location.hostname.includes('mail.google.com')) {
      createFloatingMicButton();
    }
  });
  