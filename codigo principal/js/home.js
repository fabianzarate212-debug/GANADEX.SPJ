/* =========================================================
   GANADEX S.P.J.
   BUSCADOR DE LA PÁGINA PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchForm =
        document.getElementById("home-search");

    const searchInput =
        document.getElementById("home-search-input");


    if (!searchForm || !searchInput) {
        return;
    }


    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const busqueda =
            searchInput.value.trim();


        /*
         * Si no escribió nada, simplemente
         * llevamos al usuario a Explorar.
         */

        if (!busqueda) {

            window.location.href =
                "explorar.html";

            return;

        }


        /*
         * Enviamos la búsqueda mediante
         * la URL.
         */

        window.location.href =
            `explorar.html?busqueda=${encodeURIComponent(busqueda)}`;

    });

});