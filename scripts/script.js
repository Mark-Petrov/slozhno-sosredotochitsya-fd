(function initTheme() {
  const theme = localStorage.getItem('theme');
  if (theme && theme !== 'auto') {
    setTheme(theme);
  } else {
    setAutoTheme();
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = getCurrentTheme();
  const themeButtons = [
    ...document.querySelectorAll('.header__theme-menu-button'),
  ];
  setActiveButton(themeButtons, currentTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosenTheme = [...button.classList]
        .find((cn) => cn.includes('_type_'))
        .split('_type_')[1];
      if (chosenTheme === 'auto') {
        setAutoTheme();
        localStorage.setItem('theme', 'auto');
      } else {
        setTheme(chosenTheme);
        localStorage.setItem('theme', chosenTheme);
      }
      setActiveButton(themeButtons, chosenTheme);
    });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'auto') {
      setAutoTheme();
    }
  });
});

function setTheme(theme) {
  document.documentElement.className = '';
  document.documentElement.classList.add(`theme-${theme}`);
}

function setAutoTheme() {
  document.documentElement.className = '';
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('theme-dark');
  } else {
    document.documentElement.classList.add('theme-light');
  }
}

function setActiveButton(buttonsArray, theme) {
  buttonsArray.forEach((button) => {
    button.classList.remove('header__theme-menu-button_active');
    button.removeAttribute('disabled');
  });
  let target;
  if (theme === 'auto') {
    target = buttonsArray.find((button) =>
      button.classList.contains('header__theme-menu-button_type_auto')
    );
  } else if (theme === 'dark' || theme === 'neon') {
    target = buttonsArray.find((button) =>
      button.classList.contains('header__theme-menu-button_type_dark')
    );
  } else if (theme === 'light' || theme === 'day') {
    target = buttonsArray.find((button) =>
      button.classList.contains('header__theme-menu-button_type_light')
    );
  }
  if (!target) {
    target = buttonsArray.find((button) =>
      button.classList.contains('header__theme-menu-button_type_auto')
    );
  }
  if (target) {
    target.classList.add('header__theme-menu-button_active');
    target.setAttribute('disabled', true);
  }
}

function getCurrentTheme() {
  const theme = localStorage.getItem('theme');
  if (!theme || theme === 'auto') {
    return 'auto';
  }
  return theme;
}
