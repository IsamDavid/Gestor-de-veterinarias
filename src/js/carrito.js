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
let listIdsLS = []

chargeEventListeners()

function chargeEventListeners(){
  //Dispara cuando presionamos "Añadir"
  products.addEventListener('click',buyProducts);
  //Borramos los productos desde el boton de la X
  listProduct.addEventListener('click',deleteProduct);
  //Vaciamos todo el carrito 
  emptyCar.addEventListener('click',emptyCarEvent);

  //Al cargar la página, mostrar LocalStorage
  document.addEventListener("DOMContentLoaded",readLocalStorage);
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
    id: product.querySelector('input').getAttribute('id'),
    cantProduct: 1
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
    listIdsLS.push(product.id)
    localStorage.setItem('ids', JSON.stringify(listIdsLS));

    const row = document.createElement('tr')
    //Le agregamos un id al elemento tr para que lo manejemos general
    row.setAttribute('id', product.id)
    row.innerHTML = `
      <td class="navCar__img">
        <img src="${product.img}">
      </td>
      <td>${product.name}</td>  
      <td>${product.price}</td> 
      <td class="cant">${product.cantProduct}</td>  
      <td>
        <a href="#" class="delete-product" id="${product.id}">X </a> 
      </td>  
        `;
        listProduct.appendChild(row)
        // console.log(listIds);        
    }
    saveProductLocalStorage(product);
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
  let productId,
      rowCarProduct;
  //Obtenemos la fila del elemento
  rowCarProduct=e.target.parentElement.parentElement;
  productId = rowCarProduct.querySelector('a').getAttribute('id');
  // console.log(productId);
  
  currentCant = (parseInt(rowCarProduct.querySelector('.cant').innerText));
  if(currentCant>1){
  rowCarProduct.querySelector('.cant').innerText = currentCant - 1;
  deleteProductLocalStorage(productId)

  }else{
    let idCurrent = e.target.getAttribute('id');
    removeListIds(idCurrent);
    e.target.parentElement.parentElement.remove();
    deleteProductLocalStorage(productId)
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
  //vaciar  Local Storage
  emptyCarLS()
  return false;
}

//Guardar datos en localStorage
function saveProductLocalStorage(product){
  let products;
  //Toma el valor de un array con datos de LS o vacio
  products = getProductLocalStorage(product);
  
  //Buscamos dentro de la lista que nos regresa la función de getProductLocalStorage
  //Si es que ya tiene dentro un item con el mismo id para ya no repetir el template
  
  const state = products.some(item=>{
    return item.id == product.id; 
  })
  console.log(state);
  if(state){
    products[0].cantProduct+=1;
    localStorage.setItem(`products ${product.id}`,JSON.stringify(products));
  }else{
    products.push(product);
    localStorage.setItem(`products ${product.id}`,JSON.stringify(products));
  }
}


function getProductLocalStorage(product) {
  let productsLS;   
  if(localStorage.getItem(`products ${product.id}`)){
    productsLS = JSON.parse(localStorage.getItem(`products ${product.id}`))
  }else{
    productsLS = [];
  }
  return productsLS;
}


function readLocalStorage(){
  let productsLS;
  idsLS = JSON.parse(localStorage.getItem('ids'))
  const product2 = {
    id: 0
  }
  // console.log(idsLS);    
  for(let i=0;i<idsLS.length;++i){
    product2.id = idsLS[i];
    
  // productsLS = getProductLocalStorage();
  productsLS = getProductLocalStorage(product2);

  productsLS.forEach(product => {
    // localStorage.getItem()
    const row = document.createElement('tr')
    //Le agregamos un id al elemento tr para que lo manejemos general
    row.setAttribute('id', product.id)
    row.innerHTML = `
        <td class="navCar__img">
          <img src="${product.img}">
        </td>
        <td>${product.name}</td>  
        <td>${product.price}</td> 
        <td class="cant">${product.cantProduct}</td>  
        <td>
          <a href="#" class="delete-product" id="${product.id}">X </a> 
        </td>  
          `;
    listProduct.appendChild(row)    
  });
//Termina el for
}
}

function deleteProductLocalStorage(productId){
  // productsLS = JSON.parse(localStorage.getItem(`productId`))
  let productsLS;
  const product2 = {
    id: 0,
  }
  product2.id = productId;
  productsLS = getProductLocalStorage(product2)
  if(productsLS[0].cantProduct>1){
    productsLS[0].cantProduct-=1;
  }else{
    if (listIdsLS.length==1){
      //Que solo tiene un item en la lista
      localStorage.removeItem(`products ${productId}`)
      localStorage.removeItem('ids')
    } else if (listIdsLS.length>1){
      localStorage.setItem(`products ${productId}`, JSON.stringify(productsLS));
      const arrayAux2 = listIdsLS.filter(id => id != productId);
      listIdsLS = arrayAux2;
      console.log(arrayAux2);
      console.log(listIdsLS);
      localStorage.setItem('ids', JSON.stringify(listIdsLS))
    }
  }
}

function emptyCarLS(){  
  localStorage.clear();
}