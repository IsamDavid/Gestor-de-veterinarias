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
const emptyCar = document.querySelector('.vaciar-carrito')
let listIds = []

chargeEventListeners()

function chargeEventListeners(){
  //Dispara cuando presionamos "Añadir"
  products.addEventListener('click',buyProducts);
  //Borramos los productos desde el boton de la X
  listProduct.addEventListener('click',deleteProduct);
  //Vaciamos todo el carrito 
  emptyCar.addEventListener('click',emptyCarEvent);
}


//funciones

//función que añade producto al carrito 
function buyProducts(e) {
  e.preventDefault();
  //Delegation para agregar al carrito
  if (e.target.classList.contains('card__button')){
    const product = e.target.parentElement.parentElement;
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
function insertCar(product){  
  if(findSelectedAdd(product)){
    let row = document.getElementById(`${product.id}`)
    let current =(parseInt(row.querySelector('.cant').innerText));
    row.querySelector('.cant').innerText = current + 1;
  }else {
    listIds.push(product.id)
    const row = document.createElement('tr')
    //Le agregamos un id al elemento tr para que lo manejemos general
    row.setAttribute('id', product.id)
    row.innerHTML = `
      <td class="navCar__img">
        <img src="${product.img}">
      </td>
      <td>${product.name}</td>  
      <td>${product.price}</td> 
      <td class="cant">${1}</td>  
      <td>
        <a href="#" class="delete-product" id="${product.id}">X </a> 
      </td>  
        `;
        listProduct.appendChild(row)
        console.log(listIds);        
    }
}

//Buscar si existe el elemento en el carrito
function findSelectedAdd(product){
  let verify = 0;
  listIds.forEach(element => {
    if(product.id == element) return verify = 1;
  });
  return verify;
}

//elimina el producto del carrito en el dom, solo elimina 1 producto a la vez.
function deleteProduct(e){
  e.preventDefault();
  
  //Obtenemos la fila del elemento
  let rowCarProduct=e.target.parentElement.parentElement;
  currentCant = (parseInt(rowCarProduct.querySelector('.cant').innerText));
  if(currentCant>1){
  rowCarProduct.querySelector('.cant').innerText = currentCant - 1;
  }else{
    let idCurrent = e.target.getAttribute('id');
    removeListIds(idCurrent);
    e.target.parentElement.parentElement.remove();
  }
  
}
function removeListIds(id){
  //Si la cantidad es igual a 1 entonces hay que eliminar el producto de la lista
  if(listIds.length == 1){
    listIds.pop();
  }else{
    const arrayAux = listIds.filter(ids=>ids!=id);
    listIds = arrayAux;
  }
}
//Función para vaciar todo el carrito
function emptyCarEvent(e){
  while (listProduct.firstChild){
    listProduct.removeChild(listProduct.firstChild)
  }
  listIds = [];
  return false;
}