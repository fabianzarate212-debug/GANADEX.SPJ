/*
 * =========================================================
 * GANADEX S.P.J.
 * REGISTRO DE USUARIOS
 * =========================================================
 *
 * Depende de:
 * js/auth.js
 *
 * auth.js debe cargarse antes que este archivo.
 * =========================================================
 */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTOS DEL DOM
    ===================================================== */

    const formulario =
        document.getElementById("form-registro");

    const mensaje =
        document.getElementById("mensaje-registro");


    /* =====================================================
       COMPROBAR ELEMENTOS
    ===================================================== */

    if (!formulario || !mensaje) {

        console.error(
            "No se encontraron los elementos del formulario de registro."
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
       ENVÍO DEL FORMULARIO
    ===================================================== */

    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            /* =============================================
               OBTENER DATOS
            ============================================= */

            const nombre =
                document.getElementById("nombre")
                    .value
                    .trim();

            const correo =
                document.getElementById("correo")
                    .value
                    .trim();

            const telefono =
                document.getElementById("telefono")
                    .value
                    .trim();

            const municipio =
                document.getElementById("municipio")
                    .value;

            const contrasena =
                document.getElementById("contrasena")
                    .value;

            const confirmar =
                document.getElementById("confirmar")
                    .value;


            /* =============================================
               CAMPOS VACÍOS
            ============================================= */

            if (
                !nombre ||
                !correo ||
                !telefono ||
                !municipio ||
                !contrasena ||
                !confirmar
            ) {

                mostrarMensaje(
                    "Completa todos los campos.",
                    "error"
                );

                return;

            }


            /* =============================================
               CONTRASEÑA
            ============================================= */

            if (contrasena.length < 6) {

                mostrarMensaje(
                    "La contraseña debe tener al menos 6 caracteres.",
                    "error"
                );

                return;

            }


            /* =============================================
               CONFIRMAR CONTRASEÑA
            ============================================= */

            if (contrasena !== confirmar) {

                mostrarMensaje(
                    "Las contraseñas no coinciden.",
                    "error"
                );

                return;

            }


            /* =============================================
               CORREO DUPLICADO
            ============================================= */

            if (correoYaRegistrado(correo)) {

                mostrarMensaje(
                    "Ese correo ya está registrado. Intenta iniciar sesión.",
                    "error"
                );

                return;

            }


            /* =============================================
               REGISTRAR USUARIO
            ============================================= */

            registrarUsuario({

                nombre: nombre,

                correo: correo,

                telefono: telefono,

                municipio: municipio,

                contrasena: contrasena

            });


            /* =============================================
               MENSAJE DE ÉXITO
            ============================================= */

            mostrarMensaje(
                "Cuenta creada correctamente. Redirigiendo...",
                "exito"
            );


            /* =============================================
               REDIRECCIÓN
            ============================================= */

            setTimeout(function () {

                window.location.href =
                    "perfil.html";

            }, 1000);


        }
    );

});