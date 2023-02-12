let carrito = []

const productoContenedor = document.getElementById('producto-contenedor')
//evento que agrega el producto al carrito al hacer "click" y crea el toast de producto agregado al carrito
productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoRepetido(e.target.id)
        Toastify({
            text: "Producto agregado al carrito",
            className: "info",
            style: {
              background: "linear-gradient(to right, #f767af, #fca6d1)",
            }
          }).showToast();
        }
})
//funcion para validar si el producto ya habia sido agregado al carrito
const validarProductoRepetido = (productoId) => {
    const productoRepetido = carrito.find(producto => producto.id == productoId)

    if (!productoRepetido) {
        const producto = productos.find(producto => producto.id == productoId)
        carrito.push(producto)
        pintarProductoCarrito(producto)
        actualizarTotalesCarrito(carrito)
    } else {
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`)
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`
        actualizarTotalesCarrito(carrito)
    }
};
//funcion que "dibuja" los productos en el carrito
const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById('carrito-contenedor')
    const div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: ${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div)
};
//funcion que suma los productos y su precio
const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const totalCompra = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    pintarTotalesCarrito(totalCantidad, totalCompra)
    guardarCarritoStorage(carrito)
};
//funcion que dibuja la suma de productos y precio en el carrito
const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito')
    const precioTotal = document.getElementById('precioTotal')

    contadorCarrito.innerText = totalCantidad
    precioTotal.innerText = totalCompra
};
//funcion que "dibuja" el carrito
const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor')

    contenedor.innerHTML = ''

    carrito.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: ${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
        `
        contenedor.appendChild(div)
    });
};
//funcion para eliminar los productos del carrito
const eliminarProductosCarrito = (productoId) => {
    const productoIndex = carrito.findIndex(producto => producto.id == productoId)
    carrito.splice(productoIndex, 1)
    pintarCarrito(carrito)
    actualizarTotalesCarrito(carrito)
};
//funcion para guardar el carrito en el local storage
const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
};
//funcion para obtener el carrito desde el local storage
const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
    return carritoStorage
};

//funcion para cargar el carrito
const cargarCarrito = () => {
    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage()
        pintarCarrito(carrito)
        actualizarTotalesCarrito(carrito)
    }
};

cargarCarrito()

//evento compra realizada con exito sweet alert, vacia el carrito del local storage y recarga la pagina 
const btnFin= document.getElementById("finalizarBTN");
btnFin.addEventListener('click', () => {
    swal({
        title: "¡¡Compra realizada con éxito!!",
        icon: "success",
      });
      localStorage.clear();
      setTimeout(()=>{
          document.location.reload();
      },2500);
}
)
