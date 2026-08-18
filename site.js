(() => {
  const root = document.documentElement;
  const storageKey = 'theme';
  const themeColors = {
    dark: '#080817',
    light: '#f5efdf',
  };
  const colorScheme = window.matchMedia('(prefers-color-scheme: light)');

  root.classList.add('js');

  const readSavedTheme = () => {
    try {
      const savedTheme = localStorage.getItem(storageKey);
      return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : null;
    } catch {
      return null;
    }
  };

  const preferredTheme = () => {
    const savedTheme = readSavedTheme();
    if (savedTheme) return savedTheme;
    return colorScheme.matches ? 'light' : 'dark';
  };

  const updateThemeControl = (theme) => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;

    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const label = `Use ${nextTheme} theme`;
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
  };

  const applyTheme = (theme, save = false) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    themeColor?.setAttribute('content', themeColors[theme]);
    updateThemeControl(theme);

    if (save) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // The visual toggle still works if storage is unavailable.
      }
    }
  };

  applyTheme(preferredTheme());

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(root.dataset.theme);

    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme, true);
    });

    const postBody = document.querySelector('.post-body');
    if (postBody && typeof window.renderMathInElement === 'function') {
      window.renderMathInElement(postBody, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false },
        ],
        throwOnError: false,
      });
    }

    colorScheme.addEventListener('change', (event) => {
      if (!readSavedTheme()) applyTheme(event.matches ? 'light' : 'dark');
    });
  });
})();
