/* =========================================================
   GANADEX S.P.J.
   PERFIL DEL USUARIO
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       COMPROBAR SESIÓN
    ===================================================== */

    const sesion = obtenerSesion();


    if (!sesion) {

        window.location.href = "login.html";

        return;

    }


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const nombre =
        document.getElementById("dato-nombre");

    const correo =
        document.getElementById("dato-correo");

    const telefono =
        document.getElementById("dato-telefono");

    const municipio =
        document.getElementById("dato-municipio");

    const titulo =
        document.getElementById("perfil-nombre");

    const avatar =
        document.getElementById("perfil-avatar");


    /* =====================================================
       MOSTRAR DATOS
    ===================================================== */

    nombre.textContent =
        sesion.nombre || "No registrado";

    correo.textContent =
        sesion.correo || "No registrado";

    telefono.textContent =
        sesion.telefono || "No registrado";

    municipio.textContent =
        sesion.municipio || "No registrado";


    /* =====================================================
       NOMBRE DEL PERFIL
    ===================================================== */

    titulo.textContent =
        sesion.nombre;


    /* =====================================================
       AVATAR
    ===================================================== */

    if (sesion.nombre) {

        avatar.textContent =
            sesion.nombre
                .charAt(0)
                .toUpperCase();

    }


    /* =====================================================
       CERRAR SESIÓN
    ===================================================== */

    const cerrarSesionPrincipal =
        document.getElementById("cerrar-sesion");

    const cerrarSesionHeader =
        document.getElementById("cerrar-sesion-header");


    function salir() {

        cerrarSesion();

        window.location.href = "index.html";

    }


    if (cerrarSesionPrincipal) {

        cerrarSesionPrincipal.addEventListener(
            "click",
            salir
        );

    }


    if (cerrarSesionHeader) {

        cerrarSesionHeader.addEventListener(
            "click",
            salir
        );

    }

});