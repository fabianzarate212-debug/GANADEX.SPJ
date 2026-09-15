/* =========================================================
   GANADEX S.P.J.
   PUBLICACIÓN DE BOVINOS
========================================================= */


/* =========================================================
   CLAVE DE PUBLICACIONES
========================================================= */

const PUBLICACIONES_KEY =
    "ganadex_publicaciones";


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           COMPROBAR SESIÓN
        ================================================= */

        const sesion = obtenerSesion();


        if (!sesion) {

            window.location.href =
                "login.html";

            return;

        }


        /* =================================================
           ELEMENTOS
        ================================================= */

        const formulario =
            document.getElementById(
                "form-publicar"
            );

        const mensaje =
            document.getElementById(
                "mensaje-publicar"
            );

        const imagen =
            document.getElementById(
                "imagen"
            );

        const preview =
            document.getElementById(
                "preview-imagen"
            );


        /* =================================================
           MOSTRAR MENSAJE
        ================================================= */

        function mostrarMensaje(
            texto,
            tipo
        ) {

            mensaje.textContent =
                texto;

            mensaje.className =
                "publish-message " + tipo;

        }


        /* =================================================
           VISTA PREVIA DE IMAGEN
        ================================================= */

        if (imagen) {

            imagen.addEventListener(
                "change",
                function () {

                    const archivo =
                        imagen.files[0];


                    if (!archivo) {

                        preview.innerHTML =
                            "<span>Vista previa</span>";

                        return;

                    }


                    if (
                        !archivo.type
                            .startsWith("image/")
                    ) {

                        preview.innerHTML =
                            "<span>Archivo no válido</span>";

                        imagen.value = "";

                        return;

                    }


                    const lector =
                        new FileReader();


                    lector.onload =
                        function (evento) {

                            preview.innerHTML = `

                                <img
                                    src="${evento.target.result}"
                                    alt="Vista previa del bovino"
                                >

                            `;

                        };


                    lector.readAsDataURL(
                        archivo
                    );

                }
            );

        }


        /* =================================================
           ENVÍO DEL FORMULARIO
        ================================================= */

        formulario.addEventListener(
            "submit",
            function (evento) {

                evento.preventDefault();


                /* =========================================
                   OBTENER DATOS
                ========================================== */

                const raza =
                    document
                        .getElementById("raza")
                        .value;

                const sexo =
                    document
                        .getElementById("sexo")
                        .value;

                const edad =
                    document
                        .getElementById("edad")
                        .value;

                const peso =
                    document
                        .getElementById("peso")
                        .value;

                const municipio =
                    document
                        .getElementById("municipio")
                        .value;

                const precio =
                    document
                        .getElementById("precio")
                        .value;

                const descripcion =
                    document
                        .getElementById("descripcion")
                        .value
                        .trim();


                /* =========================================
                   VALIDACIÓN
                ========================================== */

                if (
                    !raza ||
                    !sexo ||
                    !edad ||
                    !peso ||
                    !municipio ||
                    !precio
                ) {

                    mostrarMensaje(
                        "Completa todos los campos obligatorios.",
                        "error"
                    );

                    return;

                }


                if (
                    Number(edad) <= 0 ||
                    Number(peso) <= 0 ||
                    Number(precio) <= 0
                ) {

                    mostrarMensaje(
                        "Edad, peso y precio deben ser mayores que cero.",
                        "error"
                    );

                    return;

                }


                /* =========================================
                   OBTENER PUBLICACIONES
                ========================================== */

                let publicaciones = [];


                const guardadas =
                    localStorage.getItem(
                        PUBLICACIONES_KEY
                    );


                if (guardadas) {

                    try {

                        publicaciones =
                            JSON.parse(
                                guardadas
                            );

                    } catch (error) {

                        publicaciones = [];

                    }

                }


                /* =========================================
                   GENERAR ID
                ========================================== */

                const nuevoId =
                    "PUB-" +
                    String(
                        publicaciones.length + 1
                    ).padStart(4, "0");


                /* =========================================
                   IMAGEN
                ========================================== */

                let imagenBase64 = "";


                const archivo =
                    imagen.files[0];


                /*
                   La imagen se almacena temporalmente
                   como Base64 para el prototipo.
                */

                const guardarPublicacion =
                    function () {


                        const nuevaPublicacion = {

                            id: nuevoId,

                            vendedorId:
                                sesion.id,

                            vendedor:
                                sesion.nombre,

                            correoVendedor:
                                sesion.correo,

                            raza:
                                raza,

                            sexo:
                                sexo,

                            edad:
                                Number(edad),

                            peso:
                                Number(peso),

                            municipio:
                                municipio,

                            precio:
                                Number(precio),

                            descripcion:
                                descripcion,

                            imagen:
                                imagenBase64,

                            estado:
                                "Disponible",

                            fecha:
                                new Date()
                                    .toISOString()

                        };


                        publicaciones.push(
                            nuevaPublicacion
                        );


                        localStorage.setItem(
                            PUBLICACIONES_KEY,
                            JSON.stringify(
                                publicaciones
                            )
                        );


                        mostrarMensaje(
                            "Bovino publicado correctamente.",
                            "exito"
                        );


                        formulario.reset();


                        preview.innerHTML =
                            "<span>Vista previa</span>";


                        /*
                           Después de publicar,
                           regresamos a explorar.
                        */

                        setTimeout(
                            function () {

                                window.location.href =
                                    "explorar.html";

                            },
                            1200
                        );

                    };


                /* =========================================
                   LEER IMAGEN
                ========================================== */

                if (archivo) {

                    const lector =
                        new FileReader();


                    lector.onload =
                        function (evento) {

                            imagenBase64 =
                                evento.target.result;

                            guardarPublicacion();

                        };


                    lector.readAsDataURL(
                        archivo
                    );

                } else {

                    guardarPublicacion();

                }

            }
        );

    }
);