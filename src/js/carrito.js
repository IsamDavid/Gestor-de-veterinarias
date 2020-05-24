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
let cant = 1;
let listIds = []
// let globalProduct;


// console.log(car)
// console.log(products)

//listeners
chargeEventListeners()

function chargeEventListeners(){
  //Dispara cuando presionamos "Añadir"
  products.addEventListener('click',buyProducts);
  listProduct.addEventListener('click',deleteProduct);
}


//funciones

//funci´n que añade producto al carrito 
function buyProducts(e) {
  e.preventDefault();
  //Delegation para agregar al carrito
  if (e.target.classList.contains('card__button')){
    const product = e.target.parentElement.parentElement;
    // console.log(product);
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
        // console.log(row);
        listProduct.appendChild(row)
        console.log(listIds);        
    }
}


//Buscar si existe el elemento en el carrito
function findSelectedAdd(product){
  let verify = 0;
  listIds.forEach(element => {
    console.log(`Lista de Encontrados: ${element}`);
    if(product.id == element) return verify = 1;
  });
  return verify;
}

//elimina el curso del carrito en el dom 
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
    //Si la cantidad es igual a 1 entonces hay que eliminar el producto de la lista
  }
  
}
function removeListIds(id){
  if(listIds.length == 1){
    listIds.pop();
  }else{
    const arrayAux = listIds.filter(ids=>ids!=id);
    listIds = arrayAux;
    console.log(listIds);
    // for(let i=0; i< listIds.length; ++i){
    //   console.log(`Lista de eliminados: ${listIds[i]}`);
    //   if (id == listIds[i]){
    //     aux=listIds[listIds.length-1]
    //     listIds[listIds.length - 1]= listIds[i];
    //     listIds[aux];
    //     listIds.pop();
    //     // listIds.remove(listIds[i]);
    //     return;
    //   }
    // }
  }
}


  // console.log('Eliminado');
  // let cant
  // let idx
  
  // console.log(globalProduct);
  
  // idx = document.getElementById(globalProduct.id)
  // cant = parseInt(document.getElementById(globalProduct.id).innerText) 
  // if(cant==1){
    // const prueba= e.target.classList.contains('id')
    // console.log(prueba)
    
    
    // const rowCar=e.target.parentElement.parentElement
    // console.log(rowCar.querySelector('td').getAttribute('id'))
    // console.log(rowCar.querySelector('td'))
    // console.log(rowCar);
    
    
    // console.log(rowCar.querySelector('td'))
    // console.log(cant)
    // console.log(rowCar.querySelector('td #id').innerText);
    
  //   if(e.target.classList.contains('delete-product')){
  //     // 
  //     // 
  //   // } 
  // } 

