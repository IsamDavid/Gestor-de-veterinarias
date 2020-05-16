//Ocultar el carrito 

const carNav = document.querySelector('.car__nav')
const carButton = document.querySelector('.header__car--icon')


carButton.addEventListener('click', hideShowCar)

function hideShowCar() {
  if (carNav.classList.contains('is_activate-car')) {
    carNav.classList.remove('is_activate-car')
  }
  else {
    carNav.classList.add('is_activate-car')
  }
}

//Carrito productos

//variables
const car = document.querySelector('.header__car--icon')
const products = document.querySelector('.main')
const listProduct = document.querySelector('#car__list tbody')

console.log(car)
console.log(products)

//listeners
chargeEventListeners()

function chargeEventListeners(){
  //Dispara cuando presionamos "Añadir"
  products.addEventListener('click',buyProducts);
}


//funciones

//funci´n que añade producto al carrito 
function buyProducts(e) {
  e.preventDefault();
  //Delegation para agregar al carrito
  if (e.target.classList.contains('card__button')){
    const product = e.target.parentElement.parentElement;
    //Enviamos el curso seleccionado para tomar sus datos 
  readProduct(product)
  }
  
}

//Esta función lee el producto

function readProduct(product){
  const dataProduct = {
    img: product.querySelector('img').src,
    name: product.querySelector('h3').textContent,
    price: product.querySelector('.price').textContent,
    id: product.querySelector('input').getAttribute('id')
  }

  insertCar(dataProduct);
  console.log(dataProduct)
  
}

//Muestra el producto seleccionado en el carrito
function insertCar(product) {
  const row = document.createElement('tr')
  row.innerHTML = `
    <td class="navCar__img">
      <img src="${product.img}">
    </td>
    <td>${product.name}</td>  
    <td>${product.price}</td>  
    <td>
      <a href="#" class="borrar-curso" id="${product.id}">X </a> 
    </td>  
      `;
      listProduct.appendChild(row)
}