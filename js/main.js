class Carrito{  
//Añadir producto al Carrito
    comprarProducto(e){
            e.preventDefault();
            if(e.target.classList.contains('agregar-carrito')){
                const producto = e.target.parentElement.parentElement;
                this.leerDatosProducto(producto);
                
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Agregaste el producto al Carrito',
                    showConfirmButton: false,
                    timer: 800
                })
                
            }
    }
    leerDatosProducto(producto){
            const infoProducto = {
                imagen: producto.querySelector('img').src,
                nombre: producto.querySelector('h5').textContent,
                precio: producto.querySelector('.precio span').textContent,
                id: producto.querySelector('a').getAttribute('data-id'),
                cantidad:1
                //cantidad: producto.querySelector('input').value
                
            }

            let productosLS;
            productosLS = this.obtenerProductosStorage();
            productosLS.forEach(function(productoLS){
                if(productoLS.id === infoProducto.id){
                    productosLS = productoLS.id;
                    
                    
                    }
                    
                });
                if(productosLS === infoProducto.id){
                    console.log('producto ya agregado')
                    
                    
                }else{
                this.insertarCarrito(infoProducto);}
    } 
                       
    insertarCarrito(producto){
        
        const row = document.createElement('tr');
        
            
            row.innerHTML = `
            <td>
            <img class="imgDom" src="${producto.imagen}" width=100 >
            </td>
            <td>
                ${producto.nombre}
            </td>
            <td>
                ${producto.precio}
            </td>
            <td>
                ${producto.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-producto" style="font-size:10px" data-id="${producto.id}">X<a>
            </td>
            `;
        
        listaProductos.appendChild(row);
        this.guardarStorage(producto);
        
    }

    guardarStorage(producto) {
        let productos;
        productos = this.obtenerProductosStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }
    
    obtenerProductosStorage(){
        let productoLS;
        if(localStorage.getItem('productos')=== null){
            productoLS=[];
        }else{
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            
            producto = e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID= producto.querySelector('a').getAttribute('data-id');
        }
        
        this.eliminarProductoStorage(productoID);
        //this.calcularTotal();
        
    }
    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarStorage();
        return false;
        
    }
    eliminarProductoStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosStorage();
        productosLS.forEach(function(productoLS,index){
            if(productoLS.id === productoID){
                productosLS.splice(index,1);
            }
        });
        localStorage.setItem('productos',JSON.stringify(productosLS));
    }
    
    leerStorage(){
        let productosLS;
        productosLS = this.obtenerProductosStorage();
        productosLS.forEach(function(producto){
            
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
            <img class="imgDom" src="${producto.imagen}" width=100 >
            </td>
            <td>
                ${producto.nombre}
            </td>
            <td>
                ${producto.precio}
            </td>
            <td>
                ${producto.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-producto btn btn-danger" style="font-size:10px" data-id="${producto.id}">X<a>
            </td>
            `;
            listaProductos.appendChild(row);

        });
    }

    leerStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
            <img class="imgDom" src="${producto.imagen}" width=100 >
            </td>
            <td>
                ${producto.nombre}
            </td>
            <td>
                ${producto.precio}
            </td>
            <td>
               <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
            </td>
            <td>
                ${producto.precio * producto.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-producto btn btn-danger" style="font-size:10px" data-id="${producto.id}">X<a>
            </td>
            `;
            console.log(producto.precio)  
            listaCompra.appendChild(row);
            

        });
              
    }
    vaciarStorage(){
        localStorage.clear();
    }

    procesarPedido(e){
        e.preventDefault();
        if(this.obtenerProductosStorage().length === 0)
        {
            Swal.fire({
                type:'error',
                title: 'Opps...',
                text: 'El carrito esta vacio, agregar algun producto ',
                icon: 'warning',
                timer:1500,
                showConfirmButton:false,
            
            })
        }else{
            location.href = "/views/carrito2.html"
        }
        
    }
    calcularTotal(){
        let productoLS;
        let total = 0,subtotal = 0, iva = 0;
        productoLS = this.obtenerProductosStorage();
        for(let i=0; i < productoLS.length;i++){
            let element = Number(productoLS[i].precio * productoLS[i].cantidad);
            total=total+element;
        }
        iva = parseFloat(total*0.21).toFixed(2);
        subtotal = parseFloat(total-iva).toFixed(2);
        document.getElementById('subtotal').innerHTML = "$" + subtotal;
        document.getElementById('iva').innerHTML = "$" + iva;
        document.getElementById('total').innerHTML = "$" + total.toFixed(2);

        
    }
}

function haldeclick(){
Swal.fire({
    title: 'Upps!',
    text: 'Quieres vaciar el Carrito?',
    icon: 'warning',
    showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'

})


}


