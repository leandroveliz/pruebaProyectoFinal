const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito2');
const procesarCompraBtn = document.getElementById('procesar-compra');

cargarEventos();

function cargarEventos(){
    document.addEventListener('DOMContentLoaded', compra.leerStorageCompra());
    carrito.addEventListener('click', (e)=>{compra.eliminarProducto(e)});
    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click',procesarCompra);
}

function procesarCompra(e){
    e.preventDefault();
    if(compra.obtenerProductosStorage().length === 0){
        Swal.fire({
            type:'error',
            title: 'Opps...',
            text: 'No hay productos, elija algun producto ',
            icon: 'warning',
            timer:1500,
            showConfirmButton:false,
        
        }).then(function(){
            window.location = "/index.html";
        });
    }
}