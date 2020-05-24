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
const car = document.querySelector('.car__nav')
const products = document.querySelector('.main')
const listProduct = document.querySelector('#car__list tbody')
// let globalProduct;

// let listIds = []

// console.log(car)
// console.log(products)

//listeners
chargeEventListeners()

function chargeEventListeners(){
  //Dispara cuando presionamos "Añadir"
  products.addEventListener('click',buyProducts);
  car.addEventListener('click',deleteProduct);
}


//funciones

//funci´n que añade producto al carrito 
function buyProducts(e) {
  e.preventDefault();
  //Delegation para agregar al carrito
  if (e.target.classList.contains('card__button')){
    const product = e.target.parentElement.parentElement;
    console.log(product);
    // debugger
    //Enviamos el curso seleccionado para tomar sus datos 
  readProduct(product)
  }
  
}

//Esta función lee el producto y guarda sus datos

function readProduct(product){
  const dataProduct = {
    img: product.querySelector('img').src,
    name: product.querySelector('h3').textContent,
    price: product.querySelector('.price').textContent,
    id: product.querySelector('input').getAttribute('id')
  }

  insertCar(dataProduct);
  // console.log(product.querySelector('input').getAttribute('id'))
}

//Muestra el producto seleccionado en el carrito
function insertCar(product) {
  // globalProduct = product
  // if(findSelectedAdd(product)){
  //   //Si ya hay un item igual dentro del carrito  
  //   // if(product.id == )
  //   // console.log(listProduct.target);
  //   actual = parseInt(document.getElementById(product.id).innerText) 
  //   // console.log(typeof(actual))
  //   document.getElementById(product.id).innerText = actual+1;


  // }else {
  // let amount = 1;
  // listIds.push(product.id)
  const row = document.createElement('tr')
  row.setAttribute('id', product.id)
  row.innerHTML = `
    <td id="${product.id}" class="navCar__img">
      <img src="${product.img}">
    </td>
    <td>${product.name}</td>  
    <td>${product.price}</td>  
    <td id="${product.id}">${1}</td>  
    <td>
      <a href="#" class="delete-product" id="${product.id}">X </a> 
    </td>  
      `;
      console.log(row);
      listProduct.appendChild(row)
      // debugger 
  // }
}


//Buscar si existe el elemento en el carrito
function findSelectedAdd(product){
  let verify = 0;
  listIds.forEach(element => {
    console.log(element);
    if(product.id == element) return verify = 1;
  });
  return verify;
}

//elimina el curso del carrito en el dom 
function deleteProduct(e){
  e.preventDefault();
  
  // console.log('Eliminado');
  let cant
  let idx
  
  // console.log(globalProduct);
  
  // idx = document.getElementById(globalProduct.id)
  // cant = parseInt(document.getElementById(globalProduct.id).innerText) 
  // if(cant==1){
    // const prueba= e.target.classList.contains('id')
    // console.log(prueba)
    const rowCar=e.target.parentElement.parentElement
    console.log(rowCar.querySelector('td').getAttribute('id'))
    console.log(rowCar.querySelector('td'))
    console.log(rowCar);
    // console.log(rowCar.querySelector('td'))
    // console.log(cant)
    // console.log(rowCar.querySelector('td #id').innerText);
    
    if(e.target.classList.contains('delete-product')){
      // e.target.parentElement.parentElement.remove();
      // removeListIds(id);
    // } 
  } 
}

//¿Qué necesito? 
//Necesito el id para sacarlo de la lista y la cantidad para restarle


function removeListIds(id){
  listIds.forEach(element => {
    if (id == element){
      listIds.splice(element,1)
    }
  });
  return verify;
}


