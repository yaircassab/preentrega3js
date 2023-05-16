// Array de productos
var productos = [
    { nombre: "Render Interior", precio: 210, descripcion: "Renderizado en Vray", imagen: "https://estudibasic.es/wp-content/uploads/2022/08/estudibasic-renders-3d-para-diseno-de-interiores-04.jpg" },
    { nombre: "Render Exterior", precio: 250, descripcion: "Renderizado en Lumion", imagen: "https://pbs.twimg.com/media/FSpWEXaXEAEHxE5.jpg" },
    { nombre: "Modelo 3d", precio: 750, descripcion: "Modelado en *Skp", imagen: "https://www.arquimaster.com.ar/web/wp-content/uploads/2020/03/curso_sketchup_domestika_slide.jpg" },
    { nombre: "Modelo BIM", precio: 2000, descripcion: "Modelado en *Rvt", imagen: "https://www.arquimaster.com.ar/web/wp-content/uploads/2020/08/curso_modelado_d_revit_domestika.jpg" },
    // Agrega más productos aquí...
];

// Objeto para almacenar los productos en el carrito con su cantidad
var carrito = {};

// Función para generar las filas de la tabla
function generarFilasDeTabla() {
    var tableBody = document.getElementById("productTableBody");

    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];

        var row = document.createElement("tr");
        row.innerHTML = "<td><img class='product-image' src='" + producto.imagen + "'/></td>" +
            "<td>" + producto.nombre + "</td>" +
            "<td>" + producto.precio + "</td>" +
            "<td>" + producto.descripcion + "</td>" +
            "<td><button onclick='agregarAlCarrito(" + i + ")' class='btn btn-primary'>Agregar al carrito</button></td>";

        tableBody.appendChild(row);
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(index) {
    var producto = productos[index];

    if (carrito[producto.nombre]) {
        carrito[producto.nombre].cantidad++;
    } else {
        carrito[producto.nombre] = {
            producto: producto,
            cantidad: 1
        };
    }

    guardarCarrito();
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(nombreProducto) {
    delete carrito[nombreProducto];
    guardarCarrito();
    actualizarCarrito();
}

// Función para guardar el carrito en el almacenamiento local
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para cargar el carrito desde el almacenamiento local
function cargarCarrito() {
    var carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Función para limpiar el carrito del almacenamiento local
function limpiarCarrito() {
    localStorage.removeItem("carrito");
    carrito = {};
    actualizarCarrito();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    var carritoTableBody = document.getElementById("carritoTableBody");
    var contadorCarrito = document.getElementById("contadorCarrito");
    var totalCarrito = 0;

    // Limpia el contenido previo del carrito
    carritoTableBody.innerHTML = "";

    // Genera las filas de la tabla del carrito
    for (var nombreProducto in carrito) {
        var item = carrito[nombreProducto];
        var producto = item.producto;
        var cantidad = item.cantidad;
        var subtotal = producto.precio * cantidad;

        var row = document.createElement("tr");
        row.innerHTML = "<td>" + producto.nombre + "</td>" +
            "<td>" + producto.precio + "</td>" +
            "<td>" + cantidad + "</td>" +
            "<td>" + subtotal + "</td>" +
            "<td><button onclick='eliminarDelCarrito(\"" + producto.nombre + "\")' class='btn btn-danger'>Eliminar</button></td>";


        carritoTableBody.appendChild(row);
        totalCarrito += subtotal;
    }

    // Actualiza el contador de elementos en el carrito y la suma de precios
    contadorCarrito.textContent = Object.keys(carrito).length;
    document.getElementById("totalCarrito").textContent = totalCarrito;
}

// Función para filtrar productos
function filtrarProductos() {
    var filtro = document.getElementById("filtroInput").value.toLowerCase();
    var filas = document.getElementById("productTableBody").getElementsByTagName("tr");

    for (var i = 0; i < filas.length; i++) {
        var nombreProducto = filas[i].getElementsByTagName("td")[1].textContent.toLowerCase();



        if (nombreProducto.includes(filtro)) {
            filas[i].style.display = "";
        } else {
            filas[i].style.display = "none";
        }
    }
}

// Ejecuta la función para generar las filas de la tabla y cargar el carrito al cargar la página
window.onload = function () {
    generarFilasDeTabla();
    cargarCarrito();

    var filtroInput = document.getElementById("filtroInput");
    filtroInput.addEventListener("keyup", filtrarProductos);
};