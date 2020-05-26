//Ocultar el carrito 

const carNav = document.querySelector('.car__nav')
const carButton = document.querySelector('.header__car--icon')

console.log(localStorage.length);


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
// let cont=0;
let listIds = []
let listIdsLS = []

chargeEventListeners()

function chargeEventListeners(){
  //Dispara cuando presionamos "Añadir"
  products.addEventListener('click',buyProducts);
  //Borramos los productos desde el boton de la X
  listProduct.addEventListener('click',deleteProduct);
  //Vaciamos todo el carrito 
  // emptyCar.addEventListener('click',emptyCarEvent);
  emptyCar.addEventListener('click',emptyCarLS);

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
    console.log('Encontro un item dentro del storage');
    
    let row = document.getElementById(`${product.id}`)
    let current =(parseInt(row.querySelector('.cant').innerText));
    row.querySelector('.cant').innerText = current + 1;
  }else {
    console.log(listIdsLS);
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
    // cont+=1;
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
  // cont-=1;
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
function emptyCarEvent(state){
  console.log('El estado es ' + state);
  if(state){
    while (listProduct.firstChild){
      listProduct.removeChild(listProduct.firstChild)
    }
    listIds = [];
    //vaciar  Local Storage
    return false;
  }
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
  if (localStorage.length>0){
  listIds = JSON.parse(localStorage.getItem('ids'))
  listIdsLS = JSON.parse(localStorage.getItem('ids'))
}
  let idsLS = JSON.parse(localStorage.getItem('ids'))
  console.log('idsLS = '+ idsLS);
  console.log('ListaIds = '+ listIds);
  console.log('ListaIdsLS = '+ listIdsLS);
  
  const product2 = {
    id: 0
  }
  // console.log(idsLS);    
  for(let i=0;i<idsLS.length;++i){
    product2.id = idsLS[i];
    
  // productsLS = getProductLocalStorage();
  productsLS = getProductLocalStorage(product2);
  // listIdsLS = getProductLocalStorage(product2);
  // listIds = getProductLocalStorage(product2);

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
  //Devuelve el objeto pero del id que le decimos que queremos
  productsLS = getProductLocalStorage(product2)
  //Si la cantidad del producto es Mayor que 1 entonces solo va a restar y guardar el LS
  if(productsLS[0].cantProduct>1){
    productsLS[0].cantProduct-=1;
    localStorage.setItem(`products ${productId}`, JSON.stringify(productsLS))
  }else{
    //La cantidad del producto es 1 por lo que tenemos dos casos posibles
    //Que tengamos más de 1 item en el carrito o que solo tengamos 1 item
    //Si es 1 solo item entonces borramos la lista de IDs del LS
    if (listIdsLS.length===1){
      //Que solo tiene un item en la lista de ids
      localStorage.removeItem(`products ${productId}`)
      localStorage.removeItem('ids')
      console.log('Solo hay un item en el carrito');
      
      // delete listIdsLS;
      // delete listIds; 

    }else{

      const arrayAux2 = listIdsLS.filter(id => id != productId);
      listIdsLS = arrayAux2;
      localStorage.removeItem(`products ${productId}`)
      localStorage.setItem('ids', JSON.stringify(arrayAux2))
      delete arrayAux2 ;
    }
  }
}

function emptyCarLS(){  
  swal({
    title: "¿Estás seguro?",
    text: "Una vez eliminado, tendras que volver a elegir los productos!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal("Los productos en su carrito han sido eliminados :( ", {
          icon: "success",
        });
        // console.log('Se presiono el botón vaciar carrito');
        listIdsLS.length = 0;
        listIds.length = 0;
        localStorage.clear();
        emptyCarEvent(true);
      } else {
        swal("Tus productos siguen en el carrito :) ");
      }
    });
}