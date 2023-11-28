/**ESTE MODULO SE ENCARGA DE RENDERIZAR LA PANTALLA DE LOGIN Y DE REGISTRO SEGUN CORRESPONDA */
import { usuariosServices } from "../../../servicios/usuarios-servicios.js";

/**1- Se debe asignar a la siguiente constante todo el código correspondiente al componente de login (/asset/modulos/login.html)  */
const htmlLogin =
    `
    <div id="contenedorLogin" class="contenedorLogin">
        <div class="cajaLogin">
            <p id='registrarse'>Registrarse</p>
            <p id='iniciarSesion'>Iniciar Sesion</p>
            <form class="formLogin">
                <div class="input-group">
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre" name="nombre" required>
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" id="apellido" placeholder="Apellido" name="apellido" required>
                </div>
                
                <div class="input-group">
                    <input type="text" class="form-control" id="pais" placeholder="País" name="pais" required>
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" id="ciudad" placeholder="Ciudad" name="ciudad" required>
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" id="direccion" placeholder="Dirección" name="direccion" required>
                </div>
                <div class="input-group">
                    <input type="tel" class="form-control" id="telefono" placeholder="Número de Teléfono" name="telefono" required>
                </div>

                <div class="input-group">
                    <input type="email" class="form-control" id="loginEmail" placeholder="Email" name="loginEmail" autocomplete="on" required>
                </div>
                <div class="input-group">
                    <input type="password" class="form-control" id="loginPassword" placeholder="Password" name="loginPassword" required>
                </div>
                <div class="input-group">
                    <input type="password" class="form-control" id="reLoginPassword" placeholder="Repetir Password" name="reLoginPassword" required>
                </div>
                <div class="row">
                    <div class="col-4">
                        <button type="submit" id="registrar" class="btnAmarillo">Iniciar Sesion</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    `;

/*2-Se deben definir 4 variables globales al módulo, una para el formulario html, y otras tres para los inputs de email, contraseña y 
*   repetir contraseña
*/
var formulario;
var inputNombre;
var inputApellido;
var inputEmail;
var inputPassword;
var inputRepetirPass;
var inputPais;
var inputCiudad;
var inputDireccion;
var inputTelefono;
var txtRegistrarse;
var txtIniciarSesion;


export async function login() {
    // 3- Esta función se encarga de llamar a la función crearFormulario y de enlazar el evento submit del formulario de login
    // tomar el formulario, capturar el submir para cancelarlo
    formulario = document.querySelector("formLogin");

    crearFormulario(false);

    formulario.addEventListener("submit", function (event) {

        ingresar(event);
    });

}

export async function register() {
    /** 4- Esta función se encarga de llamar a la función crearFormulario y de enlazar el evento submit del formulario de registro.
     *     Esta función es similar a la de login, pero en el llamado a la función crearFormulario lo hace pasando el valor true al 
     *     al parámetro registro que espera función mencionada.
     *     Por último enlaza el evento submit del formulario a la función registrarUsuario.
    * 
   */
    crearFormulario(true);
    formulario.addEventListener("submit", registrarUsuario);
}



function crearFormulario(registrar) {
    /**
     * 1- Esta función deberá capturar el elemento cuya clase es .carrusel y le asignará en su interior un blanco para eliminar su contenido previo.
     * querySelector() asignar al innerHtml un vacio
     * 2- Deberá realizar lo mismo para la clase .seccionProductos y .vistaProducto.
     * 3- Luego deberá capturar la .seccionLogin para asignarle el contenido html del componente login, el cual se encuentra previamente 
     *    cargado en la constante htmlLogin.
     * 4- Deberá capturar los id correspondientes a loginEmail, loginPassword y reLoginPassword para asignarlos a las variable definidas
     *    inputEmail, inputPassword e inputRepetirPass.
     * 5- En el caso que el parámetro registrar sea falso deberá eliminar el contenido del elemento id reLoginPassword.
     * 6- Para el caso que el parámetro registrar sea verdadero deberá cambiar el valor de la propiedad css dysplay a block. De esta forma
     *    el input reLoginPassword se mostrará en pantalla. 
     * outerHtml vacio
     * 7- Por último se deberá capturar el formulario indentificado con la clase .formLogin y asignarlo a la variable global formulario.
     */

    document.querySelector(".carrusel").innerHTML = "";
    document.querySelector(".seccionProductos").innerHTML = "";
    document.querySelector(".vistaProducto").innerHTML = "";
    document.querySelector(".seccionLogin").innerHTML = htmlLogin;

    inputNombre = document.getElementById('nombre');
    inputApellido = document.getElementById('apellido');
    inputEmail = document.getElementById('loginEmail');
    inputPassword = document.getElementById('loginPassword');
    inputRepetirPass = document.getElementById('reLoginPassword');
    inputPais = document.getElementById('pais');
    inputCiudad = document.getElementById('ciudad');
    inputDireccion = document.getElementById('direccion');
    inputTelefono = document.getElementById('telefono');
    txtRegistrarse = document.getElementById('registrarse');
    txtIniciarSesion = document.getElementById('iniciarSesion');
    var contenedor = document.getElementById("contenedorLogin");

    if (!registrar) {
        inputRepetirPass.remove();
        inputApellido.remove();
        inputNombre.remove();
        txtRegistrarse.remove();
        inputPais.remove();
        inputCiudad.remove();
        inputDireccion.remove();
        inputTelefono.remove();
        
    } else {
        const btnRegistrar = document.getElementById('registrar');
        inputRepetirPass.style.display = 'block';
        txtIniciarSesion.remove();
        btnRegistrar.innerText = 'Registrarse';
        contenedor.setAttribute("style", "height: 100%; margin-top:20px")

    }

    formulario = document.querySelector('.formLogin');
}
    

async function ingresar(e) {
    /**
     * 1- Esta función tiene como objetivo controlar que el texto en inputEmail e inputPassword se corresponda con alguna cuenta almacenada
     *    en el REST-API.
     * 2- Para ello en primera instancia deberá cancelar el comportamiento por defecto del envento recibido . Para ello deberá
     *    tomar el parámetro evento ( e ) y ejecutar el método preventDefault().
     * 3- Luego se deberá llamar la función llamada usuarioExiste. La misma devuelve un valor falso si el usuario no existe y el id del 
     *    usuario en el caso que la cuenta sea válida.
     * 4- Através de una estructura de desición se deberá, en el caso de que el usuario sea válido :
     *     a- Llamar a la función setUsuarioAutenticado (usuariosServices) pasandole como parámetro el valor true y el id del usuario. De esta forma dicha 
     *        función guardará estos datos en el sessionStorage del navegado, para poder ser consultados en el momento de la compra.
     *     b- Llamar a la función mostrarUsuario, pasandole como parámetro el texto del email de la cuenta.  
     * 5- En el caso de que el usuario no sea válido se deberá mostrar una alerta con el texto 'Email o contraseña incorrecto, intenta nuevamente'.
     */

    e.preventDefault()

    inputEmail = document.getElementById('loginEmail').value;
    inputPassword = document.getElementById('loginPassword').value;

   
    const idUsuario = await usuarioExiste(inputEmail, inputPassword);

    if (idUsuario) {
        setUsuarioAutenticado(true, idUsuario);
        mostrarUsuario(inputEmail);

        window.location.href = "#";
    } else {
        alert('Email o contraseña incorrecto, intenta nuevamente');
    }


}

async function registrarUsuario(e) {
    /**
     * 1- Esta función tiene como objetivo controlar que el texto en inputPassword sea exactamente igual al texto ingresado en
     *    inputRepetirPass y luego registrar la cuenta en el REST-API.
     * 2- Para ello en primera instancia deberá cancelar el comportamiento por defecto del envento recibido . Para ello deberá
     *    tomar el parámetro evento ( e ) y ejecutar el método preventDefault().
     * 3- Luego se comparará con una estructura de decisión si los textos ingresados en los controles mencionados son exactamente iguales.
     * 4- En caso afirmativo utilizando usuariosServices mediante el método crear, dará de alta el nuevo usuario.
     * 5- Deberá mostrar una alerta con la leyenda "Email registrado" y cambiará el valor del objeto window.location.href a "#login", para que
     *    se muestre la pantalla de login. 
     * 5- En caso negativo o falso mostrará una alerta indicando que las contraseñas ingresadas no son iguales.  
     */

    e.preventDefault();

    if (inputPassword.value === inputRepetirPass.value) {
        try {
            await usuariosServices.crear(inputApellido.value, inputNombre.value, inputEmail.value, inputPassword.value,undefined,inputPais.value,inputCiudad.value,inputDireccion.value,inputTelefono.value); // Suponiendo que usuariosServices tiene un método llamado 'crear' para registrar usuarios
            alert('USUARIO REGISTRADO');
            window.location.href = '#login';
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    } else {
        alert('Las contraseñas ingresadas no son iguales');
    }

}
async function usuarioExiste() {
    /**
     * 1- El objetivo de esta función es consultar la lista de usuarios con la función usuariosServices.listar() y mediante
     *    un bucle comparar el email y la contraseña ingresado por el usuario en inputEmail e inputPassword con los previamente
     *    almacenados dentro del API-REST sobre el recuros usuarios.
     * 2- Si el email y la contraseña son válidos devuelve el id de usuario.
     * 3- Si el email y la contraseña no son válido devuelve falso.    
     */

    let existeUsuario
    let usuarioId
    let usuarioActivo
    let usuarioFoto

    await usuariosServices.listar("all")
        .then(respuesta => {
            for (let i = 0; i < respuesta.length; i++) {
                if (respuesta[i].correo === inputEmail && respuesta[i].password === inputPassword) {
                    usuarioId = respuesta[i].id;
                    usuarioActivo = respuesta[i].nombre + ' ' + respuesta[i].apellido;
                    usuarioFoto = respuesta[i].avatar;
                    return existeUsuario = true;
                }
            }
        })
        .catch(error => console.log(error));

    if (!existeUsuario) {
        mostrarMensaje('Email o contraseña incorrecto, intenta nuevamente');
    } else {
        document.querySelector(".seccionLogin").innerHTML = ""

        sessionStorage.setItem('usuarioId', usuarioId);
        sessionStorage.setItem('usuarioActivo', usuarioActivo);
        sessionStorage.setItem('usuarioFoto', usuarioFoto);

        return usuarioId
    }
}

export function mostrarUsuario(email) {
    /**
     * 1- Esta función deberá capturar del dom la clase .btnLogin y asignarle el texto existente en el parámetro email.
     * 2- Deberá capturar del dom la clase .btnRegister y asignarle el texto "Logout" y a este elemento asignarle el valor
     *    "#logout" sobre el atributo href.
     **/

    const btnLogin = document.querySelector('.btnLogin');
    if (btnLogin) {
        btnLogin.textContent = email; 
    }

    const btnRegister = document.querySelector('.btnRegister');
    if (btnRegister) {
        btnRegister.textContent = 'Logout';
        btnRegister.setAttribute('href', '#logout'); 
    }
}

function mostrarMensaje(msj) {
    alert(msj);
}

export function setUsuarioAutenticado(booleano, idUsuario) {
    /**
     * 1- Esta función deberá registar en el sessionStorage tres valores: autenticado, idUsuario y email.
     * 2- Los valores de los mismos serán tomados de los dos parámetros recibidos y el email será tomado desde la variable
     *    inputEmail.
     */

    let email = ""
    if (inputEmail)
        email = inputEmail
    if (idUsuario == -1) {
        let botonLogin = document.querySelector(".btnLogin");
        let botonLogout = document.querySelector(".btnRegister");
        botonLogin.textContent = "Login";
        botonLogout.textContent = "Registrar";
        botonLogout.setAttribute("href", "#login");
    }
    sessionStorage.setItem('autenticado', booleano)
    sessionStorage.setItem('idUsuario', idUsuario)
    sessionStorage.setItem('email', email)


}
export function getUsuarioAutenticado() {
    /**
     * 1- Esta función debera leer los valores almacenados en el sessionStorage y construir un objeto con los valores
     * autenticado, idUsuario y email.
     * 2- Luego los devolverá como resultado.
     */

    var session = new Object()
    session.autenticado = sessionStorage.getItem('autenticado') === "true"
    session.idUsuario = sessionStorage.getItem('idUsuario')
    session.email = sessionStorage.getItem('email')
    return session
}

