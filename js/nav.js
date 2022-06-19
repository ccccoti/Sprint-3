// Bars Nav
const bars = document.querySelector('.bars');
const navLinks = document.querySelector('.nav-links');
const navBtns = document.querySelector('.nav-btns');

bars.addEventListener('click', () => {
  if (navLinks.classList.contains('links-active')) {
    bars.classList.remove('bars-active');
    navLinks.classList.remove('links-active');
    navBtns.classList.remove('btns-active');
    return;
  }

  bars.classList.add('bars-active');
  navLinks.classList.add('links-active');
  navBtns.classList.add('btns-active');
});
