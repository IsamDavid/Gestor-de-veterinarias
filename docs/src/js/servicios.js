const services = document.querySelector('.main')

services.addEventListener('click', cita);


function cita() {
}


function cita(e) {
  // e.preventDefault();
  //Delegation para agregar al carrito
  if (e.target.classList.contains('card__button')) {
  document.location.href = "../../vistas/cliente/carritoCliente.html"
  }
}