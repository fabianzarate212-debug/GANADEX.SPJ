/* =========================================================
   GANADEX S.P.J.
   SISTEMA DE AUTENTICACIÓN
   PROTOTIPO CON LOCALSTORAGE

   IMPORTANTE:
   Este sistema es solamente para desarrollo y pruebas.
   NO representa seguridad real para producción.
========================================================= */


/* =========================================================
   CLAVES DE LOCALSTORAGE
========================================================= */

const AUTH_USERS_KEY = "ganadex_users";
const AUTH_SESSION_KEY = "ganadex_session";


/* =========================================================
   OBTENER USUARIOS
========================================================= */

function obtenerUsuarios() {

    const usuariosGuardados =
        localStorage.getItem(AUTH_USERS_KEY);

    if (!usuariosGuardados) {

        return [];

    }

    try {

        return JSON.parse(usuariosGuardados);

    } catch (error) {

        console.error(
            "Error al leer los usuarios:",
            error
        );

        return [];

    }

}


/* =========================================================
   GUARDAR USUARIOS
========================================================= */

function guardarUsuarios(usuarios) {

    localStorage.setItem(
        AUTH_USERS_KEY,
        JSON.stringify(usuarios)
    );

}


/* =========================================================
   COMPROBAR SI UN CORREO YA ESTÁ REGISTRADO
========================================================= */

function correoYaRegistrado(correo) {

    const usuarios = obtenerUsuarios();

    return usuarios.some(function (usuario) {

        return usuario.correo.toLowerCase() ===
            correo.toLowerCase();

    });

}


/* =========================================================
   REGISTRAR USUARIO
========================================================= */

function registrarUsuario(datos) {

    const usuarios = obtenerUsuarios();

    const nuevoUsuario = {

        id: "USR-" + Date.now(),

        nombre: datos.nombre,

        correo: datos.correo,

        telefono: datos.telefono,

        municipio: datos.municipio,

        contrasena: datos.contrasena,

        fechaRegistro: new Date().toISOString()

    };


    usuarios.push(nuevoUsuario);

    guardarUsuarios(usuarios);


    /* =============================================
       CREAR SESIÓN AUTOMÁTICAMENTE
    ============================================= */

    const sesion = {

        id: nuevoUsuario.id,

        nombre: nuevoUsuario.nombre,

        correo: nuevoUsuario.correo,

        telefono: nuevoUsuario.telefono,

        municipio: nuevoUsuario.municipio

    };


    localStorage.setItem(
        AUTH_SESSION_KEY,
        JSON.stringify(sesion)
    );


    return nuevoUsuario;

}


/* =========================================================
   OBTENER SESIÓN ACTUAL
========================================================= */

function obtenerSesion() {

    const sesionGuardada =
        localStorage.getItem(AUTH_SESSION_KEY);

    if (!sesionGuardada) {

        return null;

    }

    try {

        return JSON.parse(sesionGuardada);

    } catch (error) {

        console.error(
            "Error al leer la sesión:",
            error
        );

        return null;

    }

}


/* =========================================================
   COMPROBAR AUTENTICACIÓN
========================================================= */

function usuarioAutenticado() {

    return obtenerSesion() !== null;

}


/* =========================================================
   CERRAR SESIÓN
========================================================= */

function cerrarSesion() {

    localStorage.removeItem(
        AUTH_SESSION_KEY
    );

}


/* =========================================================
   OBTENER USUARIO ACTUAL
========================================================= */

function obtenerUsuarioActual() {

    const sesion = obtenerSesion();

    if (!sesion) {

        return null;

    }

    const usuarios = obtenerUsuarios();

    return usuarios.find(function (usuario) {

        return usuario.id === sesion.id;

    }) || null;

}


/* =========================================================
   PROTEGER PÁGINA
========================================================= */

function protegerPagina() {

    if (!usuarioAutenticado()) {

        window.location.href = "login.html";

        return false;

    }

    return true;

}