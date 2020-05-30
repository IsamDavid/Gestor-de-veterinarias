// JS del menu desplegable del veterinario
const nav = document.querySelector('.header__nav')
const burgerButton = document.querySelector('.header__burger')
const burgerText = document.querySelector('.header__burger--text')

burgerButton.addEventListener('click', hideShow)

function hideShow() {
  if (nav.classList.contains('is_activate')) {
    nav.classList.remove('is_activate')
  }
  else {
    nav.classList.add('is_activate')
  }
}