// Applies the saved light or dark theme (system preference by default) before the page paints
(function () {
  let t = null;
  try { t = localStorage.getItem('jb-theme'); } catch (e) {}
  if (t !== 'dark' && t !== 'light') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = t;
})();
