/* =========================================================
   GANADEX S.P.J.
   INICIO DE SESIÓN
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const formulario =
        document.getElementById("form-login");

    const mensaje =
        document.getElementById("mensaje-login");


    /* =====================================================
       COMPROBAR FORMULARIO
    ===================================================== */

    if (!formulario || !mensaje) {

        console.error(
            "No se encontró el formulario de inicio de sesión."
        );

        return;

    }


    /* =====================================================
       MOSTRAR MENSAJE
    ===================================================== */

    function mostrarMensaje(texto, tipo) {

        mensaje.textContent = texto;

        mensaje.className =
            "auth-mensaje " + tipo;

    }


    /* =====================================================
       LOGIN
    ===================================================== */

    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            /* =============================================
               OBTENER DATOS
            ============================================= */

            const correo =
                document
                    .getElementById("correo")
                    .value
                    .trim();

            const contrasena =
                document
                    .getElementById("contrasena")
                    .value;


            /* =============================================
               VALIDACIÓN
            ============================================= */

            if (!correo || !contrasena) {

                mostrarMensaje(
                    "Completa el correo y la contraseña.",
                    "error"
                );

                return;

            }


            /* =============================================
               BUSCAR USUARIO
            ============================================= */

            const usuarios =
                obtenerUsuarios();


            const usuario =
                usuarios.find(function (user) {

                    return (
                        user.correo.toLowerCase() ===
                        correo.toLowerCase()
                    );

                });


            /* =============================================
               USUARIO NO EXISTE
            ============================================= */

            if (!usuario) {

                mostrarMensaje(
                    "No existe una cuenta con ese correo.",
                    "error"
                );

                return;

            }


            /* =============================================
               COMPROBAR CONTRASEÑA
            ============================================= */

            if (usuario.contrasena !== contrasena) {

                mostrarMensaje(
                    "La contraseña es incorrecta.",
                    "error"
                );

                return;

            }


            /* =============================================
               CREAR SESIÓN
            ============================================= */

            const sesion = {

                id: usuario.id,

                nombre: usuario.nombre,

                correo: usuario.correo,

                telefono: usuario.telefono,

                municipio: usuario.municipio

            };


            localStorage.setItem(
                "ganadex_session",
                JSON.stringify(sesion)
            );


            /* =============================================
               ÉXITO
            ============================================= */

            mostrarMensaje(
                "Inicio de sesión correcto. Redirigiendo...",
                "exito"
            );


            /* =============================================
               REDIRECCIÓN
            ============================================= */

            setTimeout(function () {

                window.location.href =
                    "index.html";

            }, 1000);

        }
    );

});