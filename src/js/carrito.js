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

let listIds = []

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
  // console.log(dataProduct)
  
}

//Muestra el producto seleccionado en el carrito
function insertCar(product) {
  if(findSelected(product)){
    //Si ya hay un item igual dentro del carrito  
    // if(product.id == )
    // console.log(listProduct.target);
    actual = parseInt(document.getElementById(product.id).innerText) 
    console.log(typeof(actual))
  document.getElementById(product.id).innerText = actual+1;


  }else {
  // let amount = 1;
  listIds.push(product.id)
  const row = document.createElement('tr')
  row.innerHTML = `
    <td class="navCar__img">
      <img src="${product.img}">
    </td>
    <td>${product.name}</td>  
    <td>${product.price}</td>  
    <td id="${product.id}">${1}</td>  
    <td>
      <a href="#" class="borrar-curso" id="${product.id}">X </a> 
    </td>  
      `;
      listProduct.appendChild(row)
  }
}

//Buscar primero la etiqueta que tenga ese id y que su valor sea == a ell valor de product.id
//Esto nos dara el td de la lista del carrito que tiene este id. Despues solo guardamos esa ruta y la modificamos con su amount 



//Buscar si existe el elemento en el carrito
function findSelected(product){
  let verify = 0;
  listIds.forEach(element => {
    if(product.id == element) return verify = 1;
  });
  return verify;
}

// function searchProductList(){

// }




  // if(verify){
  //   // console.log('Se encontro el id dentro del array');
  //   // console.log(listIds.indexOf(product.id))
  //   return 
    
  // }else{
  //   
  //   // console.log('No se encontro ningun id y ya se agrego');
  //   return 0
    