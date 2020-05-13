console.log('Hola mundo')

const nav = document.querySelector('.header__nav')
const burgerButton = document.querySelector('.header__burger--img')
const burgerText = document.querySelector('.header__burger--text')
// console.log(burgerText)

burgerButton.addEventListener('click',hideShow)
// burgerText = addEventListener('click',hideShow)

function hideShow() {
  if(nav.classList.contains('is_activate')){
  nav.classList.remove('is_activate')
  }
  else{
  nav.classList.add('is_activate')
  }
}
