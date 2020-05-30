
// JS del menu desplegable 

const nav = document.querySelector('.header__nav')
const burgerButton = document.querySelector('.header__burger')
const burgerText = document.querySelector('.header__burger--text')

burgerButton.addEventListener('click', hideShow)

function hideShow() {
  if (nav.classList.contains('is_activate')) {
    nav.classList.remove('is_activate')
    setTimeout(() => {
      nav.classList.remove('hide')
    }, 500)
  }
  else {
    nav.classList.add('hide')
    setTimeout(()=>{
      nav.classList.add('is_activate')
    },100)
  }
}