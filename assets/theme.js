// Applies the saved light or dark theme (system preference by default) before the page paints
(function () {
  let t = null;
  try { t = localStorage.getItem('jb-theme'); } catch (e) {}
  if (t !== 'dark' && t !== 'light') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = t;

  // Keeps every theme button's label in step with the active theme
  function paint() {
    const dark = document.documentElement.dataset.theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(b => b.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode'));
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('[data-theme-toggle]')) return;
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('jb-theme', next); } catch (err) {}
    paint();
  });
  new MutationObserver(paint).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', paint);
})();
