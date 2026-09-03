document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const storageKey = 'smartLauncherLanguage';
  const currentLang = document.documentElement.lang.startsWith('zh') ? 'zh-Hans' : 'en';
  const page = document.documentElement.dataset.page === 'legal' ? 'legal' : 'home';

  document.querySelectorAll('[data-set-lang]').forEach((link) => {
    link.addEventListener('click', () => {
      try {
        localStorage.setItem(storageKey, link.dataset.setLang);
      } catch (_) {
        // Language switching still works through the normal link when storage is unavailable.
      }
    });
  });

  let preferredLang = null;
  try {
    preferredLang = localStorage.getItem(storageKey);
  } catch (_) {
    preferredLang = null;
  }

  if (!preferredLang) {
    const browserLang = (navigator.language || '').toLowerCase();
    preferredLang = browserLang.startsWith('zh') ? 'zh-Hans' : 'en';
  }

  if (preferredLang === currentLang) return;

  const targetFile = preferredLang === 'zh-Hans'
    ? (page === 'legal' ? 'legal-zh.html' : 'index-zh.html')
    : (page === 'legal' ? 'legal.html' : 'index.html');

  const target = new URL(targetFile, window.location.href);
  target.hash = window.location.hash;
  window.location.replace(target.href);
});
