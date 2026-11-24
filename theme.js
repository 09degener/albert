const themeButton = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

function updateTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#141413' : '#f8f7f4';
}

let storedTheme;
try { storedTheme = localStorage.getItem('albert-theme'); } catch (error) {}
updateTheme(storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : (systemTheme.matches ? 'dark' : 'light'));

themeButton.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  updateTheme(nextTheme);
  try { localStorage.setItem('albert-theme', nextTheme); } catch (error) {}
});

systemTheme.addEventListener('change', (event) => {
  let preference;
  try { preference = localStorage.getItem('albert-theme'); } catch (error) {}
  if (preference !== 'light' && preference !== 'dark') updateTheme(event.matches ? 'dark' : 'light');
});
