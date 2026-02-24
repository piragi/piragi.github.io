const base = document.body.dataset.base ?? '';

document.querySelector('body > header').innerHTML = `
  <h1><a href="${base}index.html">piragi</a></h1>
  <p class="tagline">thoughts, notes, and things</p>
  <nav>
    <a href="${base}index.html">posts</a>
    <a href="${base}about.html">about</a>
  </nav>
  <button id="theme-toggle"></button>
`;

document.querySelector('footer').innerHTML = `<p>piragi &mdash; 2026</p>`;

const btn = document.getElementById('theme-toggle');

btn.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  btn.textContent = next === 'light' ? '☾' : '☀';
});

btn.textContent = document.documentElement.getAttribute('data-theme') === 'light' ? '☾' : '☀';
