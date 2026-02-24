// === MENU & OVERLAY ===
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navigation = document.getElementById('navigation');
  const overlay = document.getElementById('overlay');
  const themeToggle = document.getElementById('themeToggle');

  if (!menuToggle || !navigation || !overlay) return;

  const icons = {
    light: {
      menu: '../assets/Ham.svg',
      close: '../assets/Close.svg'
    },
    dark: {
      menu: '../assets/InvHam.svg',
      close: '../assets/InvClose.svg'
    }
  };

  // sprawdź, czy dark mode był zapisany
  let darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️ Tryb jasny';
    menuToggle.src = icons.dark.menu;
  } else {
    menuToggle.src = icons.light.menu;
  }

  // reaguj na rozmiar ekranu
  function checkScreenWidth() {
    if (window.innerWidth <= 900) {
      menuToggle.style.display = 'block';
    } else {
      menuToggle.style.display = 'none';
      navigation.classList.remove('active');
      overlay.classList.remove('active');
      menuToggle.src = darkMode ? icons.dark.menu : icons.light.menu;
    }
  }

  window.addEventListener('load', checkScreenWidth);
  window.addEventListener('resize', checkScreenWidth);

  // otwieranie menu
  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('active');
    overlay.classList.toggle('active', isOpen);

    const iconSet = darkMode ? icons.dark : icons.light;
    menuToggle.src = isOpen ? iconSet.close : iconSet.menu;
  });

  // kliknięcie overlay
  overlay.addEventListener('click', () => {
    navigation.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.src = darkMode ? icons.dark.menu : icons.light.menu;
  });

  // === DARK MODE ===
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      darkMode = !darkMode;
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', darkMode);
      themeToggle.textContent = darkMode ? '☀️ Tryb jasny' : '🌙 Tryb ciemny';

      // zmiana ikony hamburgera zgodnie z motywem
      const isOpen = navigation.classList.contains('active');
      const iconSet = darkMode ? icons.dark : icons.light;
      menuToggle.src = isOpen ? iconSet.close : iconSet.menu;
    });
  }
}); 