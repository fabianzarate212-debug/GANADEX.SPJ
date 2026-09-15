/*
 * GANADEX S.P.J. — Lógica de la página de detalle de bovino
 * Lee el parámetro "id" de la URL (ej: detalle-bovino.html?id=BV-0001)
 * y llena la página con los datos correspondientes desde bovinos.js
 */

function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

function obtenerIdDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function cargarDetalleBovino() {

    const id = obtenerIdDesdeURL();

    const bovino = bovinos.find(function (b) {
        return b.id === id;
    });

    const botonChat =
        document.getElementById("btn-chat-vendedor");


    /* =====================================================
       BOVINO NO ENCONTRADO
    ===================================================== */

    if (!bovino) {

        document.querySelector(".detalle-info h1").textContent =
            "Bovino no encontrado";

        document.querySelector(".detalle-info h2").textContent =
            "";

        document.querySelector(".estado").textContent =
            "No disponible";

        document.querySelector(".ubicacion").textContent =
            "Verifica el enlace o vuelve al catálogo.";

        if (botonChat) {
            botonChat.href = "chat.html";
        }

        return;
    }


    /* =====================================================
       INFORMACIÓN PRINCIPAL
    ===================================================== */

    document.title =
        bovino.raza + " - GANADEX S.P.J.";

    document.querySelector(".estado").textContent =
        bovino.estado;

    document.querySelector(".detalle-info h1").textContent =
        bovino.raza;

    document.querySelector(".detalle-info h2").textContent =
        formatearPrecio(bovino.precio);

    document.querySelector(".ubicacion").textContent =
        "📍 " + bovino.ubicacion;


    /* =====================================================
       DATOS DEL BOVINO
    ===================================================== */

    const datos =
        document.querySelectorAll(".dato strong");

    datos[0].textContent =
        bovino.peso + " kg";

    datos[1].textContent =
        bovino.edad + " meses";

    datos[2].textContent =
        bovino.sexo;

    datos[3].textContent =
        bovino.id;


    /* =====================================================
       IMAGEN
    ===================================================== */

    const imagen =
        document.querySelector(".imagen-principal img");

    imagen.src =
        bovino.imagen;

    imagen.alt =
        bovino.raza;


    /* =====================================================
       CHAT DEL VENDEDOR
       
       El enlace utiliza el ID del bovino
       que se está mostrando.
    ===================================================== */

    if (botonChat) {

        botonChat.href =
            `chat.html?id=${bovino.id}`;

    }

}


/* =========================================================
   INICIAR CUANDO CARGUE LA PÁGINA
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    cargarDetalleBovino
);