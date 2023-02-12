const productos = []
fetch('/js/stock.json')
.then((resp) => resp.json())
.then((data) => {
    const contenedor = document.getElementById('producto-contenedor')
    for (let i = 0; i < data.length; i++) {
        productos[i] = data[i];
    }
    data.forEach(producto => {
        const div = document.createElement('div')
        div.className = 'card col-md-4'
        div.style='width: 18rem'
        div.innerHTML += `
        <img src="${producto.img}" class="card-img img-fluid" alt="...">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Id: ${producto.id}</p>
          <p class="card-text">Categoria: ${producto.categoria}</p>
          <p class="card-text">Color: ${producto.color}</p>
          <p class="card-text">talles disponibles: ${producto.talle}</p>
          <p class="card-precio">$ ${producto.precio}</p>
          <p class="card-text">Disponibles: ${producto.cantidad}</p>
          <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${producto.id} class="material-icons agregar btn hotpink">Agregar al carrito</i></a>
        </div>
      </div>
        `
        contenedor.appendChild(div)
    })
})