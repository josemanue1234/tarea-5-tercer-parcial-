// Función para cargar los productos desde un archivo JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => cargarProductos(data))
    .catch(error => console.error('Error al cargar los datos:', error));

// Función para crear y mostrar las tarjetas de productos en la página
function cargarProductos(motos) {
    const productosDiv = document.getElementById("productos");
    productosDiv.innerHTML = ''; // Limpiar el contenedor antes de cargar los productos

    motos.forEach(moto => {
        const cardHTML = `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card product-card">
                    <img src="${moto.image}" class="card-img-top" alt="${moto.title}">
                    <div class="card-body">
                        <h5 class="card-title">${moto.title}</h5>
                        <p class="card-text">${moto.description}</p>
                        <p class="price">$${moto.cost.toFixed(2)}</p>
                        <button class="btn btn-buy" onclick="abrirModal('${moto.title}', ${moto.cost})">Comprar</button>
                    </div>
                </div>
            </div>
        `;
        productosDiv.innerHTML += cardHTML;
    });
}

// Función para abrir el modal de compra y mostrar los datos
function abrirModal(titulo, precio) {
    // Obtener el modal de compra y mostrarlo
    const modal = new bootstrap.Modal(document.getElementById('comprarModal'));
    modal.show();

    // Mostrar título y precio en el modal
    const modalTitle = document.querySelector('.modal-title');
    modalTitle.textContent = `Formulario de Compra - ${titulo}`;

    const modalPrice = document.querySelector('.modal-body p');
    modalPrice.textContent = `Precio: $${precio.toFixed(2)}`;
}

// Función para el formulario de compra
document.getElementById('formCompra').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;

    // Realizar alguna acción con los datos, como enviar al servidor o mostrar un mensaje de confirmación
    console.log(`Compra realizada por: ${nombre} | ${email} | ${direccion} | ${telefono}`);

    // Mostrar mensaje de éxito o realizar alguna acción adicional
    alert('Compra realizada con éxito. ¡Gracias por tu compra!');

    // Cerrar el modal después de la compra
    const modal = new bootstrap.Modal(document.getElementById('comprarModal'));
    modal.hide();

    // Limpiar el formulario
    document.getElementById('formCompra').reset();
});

// Función de búsqueda de productos
function buscarProductos() {
    const buscador = document.getElementById('buscador').value.toLowerCase();
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const resultados = data.filter(moto => moto.title.toLowerCase().includes(buscador));
            cargarProductos(resultados); // Recargar los productos filtrados
        })
        .catch(error => console.error('Error al buscar los productos:', error));
}
function actualizarPrecio() {
    let color = document.getElementById("color").value;
    let motor = parseInt(document.getElementById("motor").value);
    let llantas = document.getElementById("llantas").value;
    let extras = document.getElementById("extras").value;

    let precioColor = 0;
    let precioMotor = 0;
    let precioLlantas = 0;
    let precioExtras = 0;

    // Asignar precios según las opciones seleccionadas
    if (color === "rojo") precioColor = 50;
    if (motor === 500) precioMotor = 200;
    if (motor === 750) precioMotor = 300;
    if (motor === 1000) precioMotor = 400;
    if (motor === 1200) precioMotor = 500;
    if (motor === 1500) precioMotor = 600;
    
    if (llantas === "deportivas") precioLlantas = 150;
    if (llantas === "todo-terreno") precioLlantas = 200;
    if (llantas === "mudas") precioLlantas = 120;
    if (llantas === "off-road") precioLlantas = 180;

    if (extras === "proteccion") precioExtras = 100;
    if (extras === "accesorios") precioExtras = 150;
    if (extras === "asegurado") precioExtras = 120;
    if (extras === "gps") precioExtras = 80;
    if (extras === "suspension") precioExtras = 200;
    if (extras === "sonido") precioExtras = 100;
    if (extras === "iluminacion") precioExtras = 50;

    let precioTotal = precioBase + precioColor + precioMotor + precioLlantas + precioExtras;

    document.getElementById("total").value = `$${precioTotal.toFixed(2)}`;
}

function confirmarPersonalizacion(event) {
    event.preventDefault();

    // Obtener el precio total después de personalizar
    const totalPrecio = document.getElementById("total").value;
    
    // Asignar precio al formulario de compra
    document.getElementById("totalCompra").value = totalPrecio;

    // Mostrar el modal de compra
    const modal = new bootstrap.Modal(document.getElementById('comprarModal'));
    modal.show();

    // Cerrar el modal de personalización
    const modalPersonalizacion = bootstrap.Modal.getInstance(document.getElementById('personalizarModal'));
    modalPersonalizacion.hide();

    alert("¡Tu personalización ha sido confirmada! Ahora completa tus datos para finalizar la compra.");
}