/*
 * =========================================================
 * GANADEX S.P.J.
 * FILTROS Y BÚSQUEDA EN EXPLORAR BOVINOS
 * =========================================================
 *
 * Filtra las tarjetas .cow-card usando:
 *
 * data-raza
 * data-municipio
 * data-precio
 * data-nombre
 * data-id
 *
 * También recibe búsquedas desde index.html mediante:
 *
 * explorar.html?busqueda=Brahman
 *
 * Todo el filtrado ocurre en el navegador.
 * =========================================================
 */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTOS DEL HTML
    ===================================================== */

    const inputBusqueda =
        document.getElementById("search-input");


    const filtroRaza =
        document.getElementById("filter-raza");


    const filtroMunicipio =
        document.getElementById("filter-municipio");


    const filtroPrecio =
        document.getElementById("filter-precio");


    const btnFiltrar =
        document.getElementById("btn-filtrar");


    const btnLimpiar =
        document.getElementById("btn-limpiar");


    const contadorResultados =
        document.getElementById("resultados");


    const botonBuscar =
        document.querySelector(".explore-search button");


    const tarjetas =
        document.querySelectorAll(".cow-card");



    /* =====================================================
       COMPROBAR ELEMENTOS
    ===================================================== */

    if (!inputBusqueda) {

        console.error(
            "GANADEX: No se encontró #search-input"
        );

        return;

    }


    if (!filtroRaza) {

        console.error(
            "GANADEX: No se encontró #filter-raza"
        );

        return;

    }


    if (!filtroMunicipio) {

        console.error(
            "GANADEX: No se encontró #filter-municipio"
        );

        return;

    }


    if (!filtroPrecio) {

        console.error(
            "GANADEX: No se encontró #filter-precio"
        );

        return;

    }



    /* =====================================================
       APLICAR FILTROS
    ===================================================== */

    function aplicarFiltros() {


        /* -------------------------------------------------
           TEXTO DE BÚSQUEDA
        ------------------------------------------------- */

        const texto =
            inputBusqueda.value
                .trim()
                .toLowerCase();


        /* -------------------------------------------------
           FILTROS SELECCIONADOS
        ------------------------------------------------- */

        const raza =
            filtroRaza.value
                .trim()
                .toLowerCase();


        const municipio =
            filtroMunicipio.value
                .trim()
                .toLowerCase();


        const precioMaximo =
            filtroPrecio.value
                ? parseInt(
                    filtroPrecio.value,
                    10
                )
                : null;



        /* -------------------------------------------------
           CONTADOR
        ------------------------------------------------- */

        let visibles = 0;



        /* =================================================
           RECORRER TODAS LAS TARJETAS
        ================================================= */

        tarjetas.forEach(function (tarjeta) {


            /* -------------------------------------------------
               DATOS DE LA TARJETA
            ------------------------------------------------- */

            const nombreTarjeta =
                (
                    tarjeta.dataset.nombre || ""
                ).toLowerCase();


            const razaTarjeta =
                (
                    tarjeta.dataset.raza || ""
                ).toLowerCase();


            const municipioTarjeta =
                (
                    tarjeta.dataset.municipio || ""
                ).toLowerCase();


            const idTarjeta =
                (
                    tarjeta.dataset.id || ""
                ).toLowerCase();


            const precioTarjeta =
                parseInt(
                    tarjeta.dataset.precio,
                    10
                );



            /* -------------------------------------------------
               COMENZAMOS SUPONIENDO QUE COINCIDE
            ------------------------------------------------- */

            let coincide = true;



            /* =================================================
               BÚSQUEDA GENERAL
               
               Busca en:
               
               - Nombre
               - Raza
               - Municipio
               - Código del bovino
            ================================================= */

            if (texto) {


                const coincideTexto =

                    nombreTarjeta.includes(texto) ||

                    razaTarjeta.includes(texto) ||

                    municipioTarjeta.includes(texto) ||

                    idTarjeta.includes(texto);


                if (!coincideTexto) {

                    coincide = false;

                }

            }



            /* =================================================
               FILTRO POR RAZA
            ================================================= */

            if (
                raza &&
                raza !== "todas" &&
                razaTarjeta !== raza
            ) {

                coincide = false;

            }



            /* =================================================
               FILTRO POR MUNICIPIO
            ================================================= */

            if (
                municipio &&
                municipio !== "todos" &&
                municipioTarjeta !== municipio
            ) {

                coincide = false;

            }



            /* =================================================
               FILTRO POR PRECIO
            ================================================= */

            if (
                precioMaximo !== null &&
                !isNaN(precioTarjeta) &&
                precioTarjeta > precioMaximo
            ) {

                coincide = false;

            }



            /* =================================================
               MOSTRAR / OCULTAR TARJETA
            ================================================= */

            if (coincide) {

                tarjeta.style.display = "";

                visibles++;

            } else {

                tarjeta.style.display = "none";

            }

        });



        /* =================================================
           ACTUALIZAR CONTADOR
        ================================================= */

        if (contadorResultados) {

            contadorResultados.textContent =
                visibles;

        }



        /* =================================================
           MENSAJE CUANDO NO HAY RESULTADOS
        ================================================= */

        mostrarMensajeSinResultados(
            visibles
        );

    }



    /* =====================================================
       MENSAJE SIN RESULTADOS
    ===================================================== */

    function mostrarMensajeSinResultados(
        cantidad
    ) {


        const contenedor =
            document.querySelector(".featured-grid");


        if (!contenedor) {

            return;

        }


        let mensaje =
            document.getElementById(
                "sin-resultados"
            );


        if (cantidad === 0) {


            if (!mensaje) {


                mensaje =
                    document.createElement("div");


                mensaje.id =
                    "sin-resultados";


                mensaje.className =
                    "sin-resultados";


                mensaje.innerHTML = `

                    <div class="sin-resultados-icon">
                        🐄
                    </div>

                    <h3>
                        No encontramos bovinos
                    </h3>

                    <p>
                        Intenta cambiar la búsqueda
                        o modificar los filtros.
                    </p>

                `;


                contenedor.appendChild(
                    mensaje
                );

            }


            mensaje.style.display =
                "block";


        } else {


            if (mensaje) {

                mensaje.style.display =
                    "none";

            }

        }

    }



    /* =====================================================
       LIMPIAR FILTROS
    ===================================================== */

    function limpiarFiltros() {


        inputBusqueda.value =
            "";


        filtroRaza.value =
            "";


        filtroMunicipio.value =
            "";


        filtroPrecio.value =
            "";


        /* Aplicar nuevamente */

        aplicarFiltros();

    }



    /* =====================================================
       BOTÓN APLICAR FILTROS
    ===================================================== */

    if (btnFiltrar) {

        btnFiltrar.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                aplicarFiltros();

            }
        );

    }



    /* =====================================================
       BOTÓN LIMPIAR
    ===================================================== */

    if (btnLimpiar) {

        btnLimpiar.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                limpiarFiltros();

            }
        );

    }



    /* =====================================================
       BOTÓN BUSCAR
    ===================================================== */

    if (botonBuscar) {

        botonBuscar.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();

                aplicarFiltros();

            }
        );

    }



    /* =====================================================
       ENTER EN EL BUSCADOR
    ===================================================== */

    inputBusqueda.addEventListener(
        "keyup",
        function (evento) {

            if (
                evento.key === "Enter"
            ) {

                evento.preventDefault();

                aplicarFiltros();

            }

        }
    );



    /* =====================================================
       RECIBIR BÚSQUEDA DESDE INDEX.HTML
       
       Ejemplo:
       
       explorar.html?busqueda=Brahman
    ===================================================== */

    const parametrosURL =
        new URLSearchParams(
            window.location.search
        );


    const busquedaURL =
        parametrosURL.get(
            "busqueda"
        );



    if (busquedaURL) {


        /*
         * Colocar la búsqueda
         * dentro del input.
         */

        inputBusqueda.value =
            busquedaURL;



        /*
         * Aplicar automáticamente
         * los resultados.
         */

        aplicarFiltros();

    }



    /* =====================================================
       CARGA INICIAL
       
       Si no viene una búsqueda desde Inicio,
       mostramos todos los bovinos.
    ===================================================== */

    if (!busquedaURL) {

        aplicarFiltros();

    }

});