/**ESTE COMPONENTE SE ENCARGA DE MOSTRAR EL DETALLE DE UN PRODUCTO */
import { productosServices } from "../../../servicios/productos-servicios.js";
import { ventasServices } from "../../../servicios/ventas-servicios.js";
import { getUsuarioAutenticado } from "../login/login.js";


export async function vistaProducto() {
    // 1 - Capturar y blanquear los elementos html
    const carrusel = document.querySelector('.carrusel');
    const seccionProducto = document.querySelector('.seccionProducto');
    const seccionLogin = document.querySelector('.seccionLogin');
    carrusel.innerHTML = '';
    seccionProducto.innerHTML = '';
    seccionLogin.innerHTML = '';

    // 2 - Capturar el elemento .vistaProducto
    const vistaProductoElement = document.querySelector('.vistaProducto');

    // 3 - Leer el idProducto de la URL
    const idProducto = leerParametro();

    // 4 - Leer los datos del producto identificado por idProducto
    const producto = await leerDatosProducto(idProducto);

    // 5 - Llamar a la función htmlVistaProducto
    const vistaProductoHtml = htmlVistaProducto(producto.id, producto.nombre, producto.descripcion, producto.precio);

    // 6 - Asignar el resultado al elemento .vistaProducto
    vistaProductoElement.innerHTML = vistaProductoHtml;

    // 7 - Enlazar el evento click del botón btnComprar a la función registrarCompra
    const btnComprar = document.querySelector('.btnComprar');
    btnComprar.addEventListener('click', registrarCompra);
}


function htmlVistaProducto(id, nombre, descripcion, precio, imagen) {
    /**1- ESTA FUNCION RECIBE COMO PARAMETRO los siguiente datos id, nombre, descripcion, precio e imagen del producto */
    /**2- A ESTOS PARAMETROS LOS CONCATENA DENTRO DEL CODIGO CORRESPONDIENTE AL COMPONENTE vistaProducto ( ASSETS/MODULOS/vistaProducto.html)*/
    /**3- POR ULTIMO DEVUELVE LA CADENA RESULTANTE. */
    /**4- SE RECUERDA QUE PARA PODER HACER LA INTERPOLACION DE CADENAS ${NOMBRE_VARIABLE} EL TEXTO DEBE ESTAR ENTRE LAS COMILLAS ` `. 
     *  
     *  ejemplo
     *   let titulo = 'Señora';  
     *   let cadena = `Hola, ${titulo} Claudia  en que podemos ayudarla`;
     *   
    */

    let cad =
        `
            <div class="imagen">
                <img src="${imagen}" alt="producto">
            </div>
            <div class="texto">
                <p id="nameProducto" data-idProducto=${id}>${nombre}</p>

                <p id="descripcionProducto">${descripcion}</p>

                <p id="precioProducto">${precio}</p>

                <div class="form-group">
                    <label for="cantidadProducto">Cantidad</label>
                    <input type="number" step="1" min ="1" value="1" id="cantidadProducto">
                </div>

                <a id="btnComprar" >Comprar</a>
            </div>
        `;
    return cad;
}

function leerParametro() {
    // Captura el idProducto de la dirección URL enviada por la página que llama
    const words = new URLSearchParams(window.location.search);
    let cad = words.get("idProducto");
    if (!cad) return null;
    return cad.trim();
}



function registrarCompra() {
    // 1 - Procesar el evento click del botón btnComprar
    // 2 - Recuperar el objeto session utilizando la función getUsuarioAutenticado del módulo login.js
    const session = getUsuarioAutenticado();

    // 3 - Verificar si el usuario ha iniciado sesión
    if (!session.autenticado) {
        // Emitir una alerta si el usuario no ha iniciado sesión
        alert("Antes de realizar una compra, debes iniciar sesión.");
        return; // Salir de la ejecución de la función
    }

    // 4 - Continuar la ejecución si el usuario ha iniciado sesión
    // 5 - Almacenar los datos necesarios para registrar la venta
    const idUsuario = session.idUsuario;
    const emailUsuario = session.emailUsuario;
    const idProducto = document.querySelector('.btnComprar').dataset.idproducto; // ver aca la diferencia
    const nameProducto = document.getElementById('nameProducto').value;
    const cantidad = document.getElementById('cantidadProducto').value;
    const fecha = new Date().toISOString();

    // 8 - Llamar a la función ventasServices.crear para registrar la venta
    ventasServices.crear(idUsuario, emailUsuario, idProducto, nameProducto, cantidad, fecha);

    // 9 - Redireccionar a la página "tienda.html"
    location.replace("tienda.html");

    // 10 - Emitir una alerta para indicar que la compra ha finalizado
    alert("Compra finalizada.");
}

