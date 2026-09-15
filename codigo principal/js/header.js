/* =========================================================
   GANADEX S.P.J.
   HEADER DINÁMICO
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const userActions = document.querySelector(".user-actions");

    if (!userActions) {
        return;
    }


    /* =====================================================
       COMPROBAR SESIÓN
    ===================================================== */

    const sesion = obtenerSesion();


    /* =====================================================
       SIN SESIÓN
    ===================================================== */

    if (!sesion) {

        userActions.innerHTML = `

            <a href="login.html" class="login">
                Iniciar Sesión
            </a>

            <a href="registro.html" class="register">
                Registrarse
            </a>

        `;

    } else {


        /* =====================================================
           CON SESIÓN
        ===================================================== */

        userActions.innerHTML = `

            <div class="user-menu">

                <a href="perfil.html" class="user-profile">

                    <span class="user-icon">
                        ${sesion.nombre.charAt(0).toUpperCase()}
                    </span>

                    <span class="user-name">
                        ${sesion.nombre}
                    </span>

                </a>

                <button
                    type="button"
                    class="logout"
                    id="logout-button">

                    Cerrar sesión

                </button>

            </div>

        `;


        /* =====================================================
           BOTÓN CERRAR SESIÓN
        ===================================================== */

        const logoutButton =
            document.getElementById("logout-button");

        if (logoutButton) {

            logoutButton.addEventListener("click", function () {

                cerrarSesion();

                window.location.href = "index.html";

            });

        }

    }


    /* =====================================================
       MENÚ MÓVIL (HAMBURGUESA)
    ===================================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const navWrapper =
        document.getElementById("nav-wrapper");

    if (menuToggle && navWrapper) {

        menuToggle.addEventListener("click", function () {

            const abierto =
                navWrapper.classList.toggle("open");

            menuToggle.classList.toggle("open", abierto);

            menuToggle.setAttribute(
                "aria-expanded",
                abierto ? "true" : "false"
            );

        });


        /* Cerrar el menú al hacer clic en un link */

        navWrapper.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navWrapper.classList.remove("open");

                menuToggle.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });


        /* Cerrar el menú al hacer clic fuera de él */

        document.addEventListener("click", function (evento) {

            const dentroDelMenu =
                navWrapper.contains(evento.target);

            const esBotonToggle =
                menuToggle.contains(evento.target);

            if (
                !dentroDelMenu &&
                !esBotonToggle &&
                navWrapper.classList.contains("open")
            ) {

                navWrapper.classList.remove("open");

                menuToggle.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    }

});


/* =========================================================
   ALTURA DINÁMICA DEL HEADER

   El header puede cambiar de tamaño según el ancho de
   pantalla o si el usuario está logueado. Este cálculo
   mantiene "--header-height" siempre sincronizado, para
   que el contenido de la página nunca quede tapado.
========================================================= */

function actualizarAlturaHeader() {

    const header =
        document.querySelector(".header");

    if (header) {

        document.documentElement.style.setProperty(
            "--header-height",
            header.offsetHeight + "px"
        );

    }

}

window.addEventListener("load", actualizarAlturaHeader);
window.addEventListener("resize", actualizarAlturaHeader);