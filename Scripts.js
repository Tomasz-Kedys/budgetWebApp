// scripts/nav.js
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navigation = document.getElementById('navigation');
  const overlay = document.getElementById('overlay');

  if (!menuToggle || !navigation || !overlay) return;

  const iconMenu = '../assets/Ham.svg';
  const iconClose = '../assets/close.svg';

  function checkScreenWidth() {
    if (window.innerWidth <= 900) {
      menuToggle.style.display = 'block';
    } else {
      menuToggle.style.display = 'none';
      navigation.classList.remove('active');
      overlay.classList.remove('active');
      menuToggle.src = iconMenu;
    }
  }

  window.addEventListener('load', checkScreenWidth);
  window.addEventListener('resize', checkScreenWidth);

  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('active');
    overlay.classList.toggle('active', isOpen);
    menuToggle.src = isOpen ? iconClose : iconMenu;
  });

  overlay.addEventListener('click', () => {
    navigation.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.src = iconMenu;
  });
});
