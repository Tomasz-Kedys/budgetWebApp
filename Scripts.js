// === MENU & OVERLAY ===
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navigation = document.getElementById('navigation');
  const overlay = document.getElementById('overlay');
  const themeToggle = document.getElementById('themeToggle');

  if (!menuToggle || !navigation || !overlay) return;

  // Ikony menu i zamknięcia
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

  // Sprawdź, czy dark mode był zapisany w localStorage
  let darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️ Tryb jasny';
    menuToggle.src = icons.dark.menu;
  } else {
    menuToggle.src = icons.light.menu;
  }

  // Dostosowanie widoku do szerokości ekranu
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

  // Otwieranie / zamykanie menu
  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('active');
    overlay.classList.toggle('active', isOpen);

    const iconSet = darkMode ? icons.dark : icons.light;
    menuToggle.src = isOpen ? iconSet.close : iconSet.menu;
  });

  // Kliknięcie w overlay
  overlay.addEventListener('click', () => {
    navigation.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.src = darkMode ? icons.dark.menu : icons.light.menu;
  });

  // === DARK MODE TOGGLE ===
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      darkMode = !darkMode;
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', darkMode);
      themeToggle.textContent = darkMode ? '☀️ Tryb jasny' : '🌙 Tryb ciemny';

      const isOpen = navigation.classList.contains('active');
      const iconSet = darkMode ? icons.dark : icons.light;
      menuToggle.src = isOpen ? iconSet.close : iconSet.menu;
    });
  }

  // === KALENDARZ DROPDOWN ===
  const dateBtn = document.getElementById('dateBtn');
  const calendarDropdown = document.getElementById('calendarDropdown');
  const calendarGrid = document.getElementById('calendarGrid');
  const calendarMonth = document.getElementById('calendarMonth');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');

  let currentDate = new Date();
  let startDate = null;
  let endDate = null;

  // Pokaz/ukryj kalendarz
  if (dateBtn && calendarDropdown) {
    dateBtn.addEventListener('click', () => {
      calendarDropdown.classList.toggle('active');
      renderCalendar(currentDate);
    });
  }

  // Renderowanie kalendarza
  function renderCalendar(date) {
    calendarGrid.innerHTML = '';

    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    calendarMonth.textContent = `${firstDay.toLocaleString('pl-PL', { month: 'long' })} ${year}`;

    // Puste pola przed początkiem miesiąca
    const startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    for (let i = 0; i < startOffset; i++) {
      const emptyCell = document.createElement('div');
      calendarGrid.appendChild(emptyCell);
    }

    // Dni miesiąca
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dayCell = document.createElement('div');
      dayCell.textContent = day;
      dayCell.classList.add('calendar-day');

      const thisDate = new Date(year, month, day);

      // Zakres dat
      if (startDate && sameDay(thisDate, startDate)) dayCell.classList.add('selected');
      if (endDate && sameDay(thisDate, endDate)) dayCell.classList.add('selected');
      if (startDate && endDate && thisDate > startDate && thisDate < endDate)
        dayCell.classList.add('in-range');

      dayCell.addEventListener('click', () => selectDate(thisDate));
      calendarGrid.appendChild(dayCell);
    }
  }

  function sameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&

      d1.getDate() === d2.getDate()
    );
  }

  function selectDate(date) {
    if (!startDate || (startDate && endDate)) {
      startDate = date;
      endDate = null;
    } else if (date < startDate) {
      endDate = startDate;
      startDate = date;
    } else {
      endDate = date;
    }
    renderCalendar(currentDate);
  }

  // Zmiana miesiąca
  if (prevMonthBtn && nextMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });
    nextMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });
  }
});

  /* =====================================================
  EDYCJA DANYCH UŻYTKOWNIKA
  ===================================================== */

  let editType = "";

  function openPopup(type){

    const popup = document.getElementById("editPopup");
    const title = document.getElementById("popupTitle");
    const input = document.getElementById("popupInput");

    if(!popup) return;

    editType = type;

    if(type === "name"){
      title.textContent = "Zmień imię i nazwisko";
      input.type = "text";
      input.placeholder = "Wpisz nowe imię i nazwisko";
    }

    if(type === "email"){
      title.textContent = "Zmień e-mail";
      input.type = "email";
      input.placeholder = "Wpisz nowy e-mail";
    }

    if(type === "password"){
      title.textContent = "Zmień hasło";
      input.type = "password";
      input.placeholder = "Wpisz nowe hasło";
    }

    input.value = "";
    popup.classList.add("active");
  }

  function closePopup(){
    const popup = document.getElementById("editPopup");
    popup.classList.remove("active");
  }

  function saveData(){

    const input = document.getElementById("popupInput").value;

    if(editType === "name"){
      document.getElementById("userName").textContent = input;
    }

    if(editType === "email"){
      document.getElementById("userEmail").textContent = input;
    }

    if(editType === "password"){
      alert("Hasło zmienione (demo)");
    }

    closePopup();
  }