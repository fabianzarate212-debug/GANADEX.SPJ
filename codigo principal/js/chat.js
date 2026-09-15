/* =========================================================
   GANADEX S.P.J.
   SISTEMA DE CHAT
========================================================= */


/* =========================================================
   CONVERSACIONES INICIALES
========================================================= */

const conversacionesIniciales = [

    {
        id: "chat-001",
        nombre: "Juan Rodríguez",
        inicial: "J",
        estado: "En línea",
        raza: "Brahman",
        precio: "$6.800.000",
        bovinoId: "BV-0001",
        ultimoMensaje: "¿Todavía está disponible?",
        hora: "09:20",

        mensajes: [
            {
                tipo: "received",
                texto: "Hola, estoy interesado en el Brahman.",
                hora: "09:15"
            },
            {
                tipo: "sent",
                texto: "Hola Juan. Sí, todavía está disponible.",
                hora: "09:18"
            },
            {
                tipo: "received",
                texto: "¿Todavía está disponible?",
                hora: "09:20"
            }
        ]
    },


    {
        id: "chat-002",
        nombre: "Carlos Méndez",
        inicial: "C",
        estado: "Activo recientemente",
        raza: "Angus",
        precio: "$7.200.000",
        bovinoId: "BV-0002",
        ultimoMensaje: "Me interesa conocer más detalles.",
        hora: "Ayer",

        mensajes: [
            {
                tipo: "received",
                texto: "Buenas, vi el Angus publicado.",
                hora: "Ayer"
            },
            {
                tipo: "sent",
                texto: "Buenas. Claro, ¿qué información necesitas?",
                hora: "Ayer"
            },
            {
                tipo: "received",
                texto: "Me interesa conocer más detalles.",
                hora: "Ayer"
            }
        ]
    },


    {
        id: "chat-003",
        nombre: "Andrés Gómez",
        inicial: "A",
        estado: "Activo recientemente",
        raza: "Gyr",
        precio: "$6.500.000",
        bovinoId: "BV-0003",
        ultimoMensaje: "¿En qué municipio se encuentra?",
        hora: "Lun",

        mensajes: [
            {
                tipo: "received",
                texto: "Hola, estoy interesado en el Gyr.",
                hora: "Lun"
            },
            {
                tipo: "sent",
                texto: "Hola Andrés, con gusto te doy información.",
                hora: "Lun"
            },
            {
                tipo: "received",
                texto: "¿En qué municipio se encuentra?",
                hora: "Lun"
            }
        ]
    },


    {
        id: "chat-004",
        nombre: "Pedro Vargas",
        inicial: "P",
        estado: "Activo recientemente",
        raza: "Brangus",
        precio: "$7.000.000",
        bovinoId: "BV-0004",
        ultimoMensaje: "Gracias por la información.",
        hora: "Dom",

        mensajes: [
            {
                tipo: "received",
                texto: "Buenas tardes.",
                hora: "Dom"
            },
            {
                tipo: "sent",
                texto: "Buenas tardes, Pedro.",
                hora: "Dom"
            },
            {
                tipo: "received",
                texto: "Gracias por la información.",
                hora: "Dom"
            }
        ]
    },


    {
        id: "chat-005",
        nombre: "Miguel Torres",
        inicial: "M",
        estado: "Activo recientemente",
        raza: "Normando",
        precio: "$6.900.000",
        bovinoId: "BV-0005",
        ultimoMensaje: "Quisiera saber más sobre el animal.",
        hora: "Mar",

        mensajes: [
            {
                tipo: "received",
                texto: "Hola, vi el Normando publicado.",
                hora: "Mar"
            },
            {
                tipo: "received",
                texto: "Quisiera saber más sobre el animal.",
                hora: "Mar"
            }
        ]
    },


    {
        id: "chat-006",
        nombre: "Luis Martínez",
        inicial: "L",
        estado: "Activo recientemente",
        raza: "Simental",
        precio: "$7.400.000",
        bovinoId: "BV-0006",
        ultimoMensaje: "¿Podemos hablar sobre el precio?",
        hora: "Lun",

        mensajes: [
            {
                tipo: "received",
                texto: "Buenas, estoy interesado en el Simental.",
                hora: "Lun"
            },
            {
                tipo: "received",
                texto: "¿Podemos hablar sobre el precio?",
                hora: "Lun"
            }
        ]
    }

];



/* =========================================================
   CARGAR CONVERSACIONES
========================================================= */

function cargarConversaciones() {

    const guardadas =
        localStorage.getItem("ganadex_chats");


    if (guardadas) {

        try {

            const conversacionesGuardadas =
                JSON.parse(guardadas);


            /*
             * Actualizamos las conversaciones existentes
             * sin borrar los mensajes guardados.
             */

            conversacionesIniciales.forEach(function (base) {

                const existe =
                    conversacionesGuardadas.find(function (chat) {

                        return chat.bovinoId === base.bovinoId;

                    });


                if (!existe) {

                    conversacionesGuardadas.push(base);

                }

            });


            localStorage.setItem(
                "ganadex_chats",
                JSON.stringify(conversacionesGuardadas)
            );


            return conversacionesGuardadas;

        } catch (error) {

            console.error(
                "Error cargando conversaciones:",
                error
            );

        }

    }


    localStorage.setItem(
        "ganadex_chats",
        JSON.stringify(conversacionesIniciales)
    );


    return conversacionesIniciales;

}



let conversaciones =
    cargarConversaciones();



let conversacionActual = null;



/* =========================================================
   OBTENER ID DEL BOVINO DESDE LA URL
========================================================= */

const parametros =
    new URLSearchParams(
        window.location.search
    );


const bovinoId =
    parametros.get("id");



/* =========================================================
   ELEMENTOS DEL DOM
========================================================= */

const conversationList =
    document.getElementById(
        "conversation-list"
    );


const searchInput =
    document.getElementById(
        "search-conversations"
    );


const chatEmpty =
    document.getElementById(
        "chat-empty"
    );


const activeChat =
    document.getElementById(
        "active-chat"
    );


const messagesContainer =
    document.getElementById(
        "messages"
    );


const messageForm =
    document.getElementById(
        "message-form"
    );


const messageInput =
    document.getElementById(
        "message-input"
    );



/* =========================================================
   MOSTRAR CONVERSACIONES
========================================================= */

function mostrarConversaciones(
    lista = conversaciones
) {

    conversationList.innerHTML = "";


    if (lista.length === 0) {

        conversationList.innerHTML = `

            <div class="no-conversations">

                No se encontraron conversaciones.

            </div>

        `;

        return;

    }


    lista.forEach(function (chat) {

        const item =
            document.createElement("div");


        item.className =
            "conversation-item";


        if (
            conversacionActual &&
            conversacionActual.id === chat.id
        ) {

            item.classList.add("active");

        }


        item.dataset.id =
            chat.id;


        item.innerHTML = `

            <div class="conversation-avatar">

                ${chat.inicial}

            </div>


            <div class="conversation-info">

                <div class="conversation-top">

                    <span class="conversation-name">

                        ${chat.nombre}

                    </span>


                    <span class="conversation-time">

                        ${chat.hora}

                    </span>

                </div>


                <p class="conversation-preview">

                    ${chat.ultimoMensaje}

                </p>

            </div>

        `;


        item.addEventListener(
            "click",
            function () {

                abrirConversacion(
                    chat.id
                );

            }
        );


        conversationList.appendChild(item);

    });

}



/* =========================================================
   ABRIR CONVERSACIÓN
========================================================= */

function abrirConversacion(id) {

    const chat =
        conversaciones.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!chat) {

        return;

    }


    conversacionActual =
        chat;


    /*
     * Ocultar pantalla inicial
     */

    chatEmpty.style.display =
        "none";


    /*
     * Mostrar chat
     */

    activeChat.classList.add(
        "show"
    );


    /*
     * Información del vendedor
     */

    document.getElementById(
        "chat-avatar"
    ).textContent =
        chat.inicial;


    document.getElementById(
        "chat-user-name"
    ).textContent =
        chat.nombre;


    document.getElementById(
        "chat-user-status"
    ).textContent =
        chat.estado;


    /*
     * Información del bovino
     */

    document.getElementById(
        "chat-cattle-breed"
    ).textContent =
        chat.raza;


    document.getElementById(
        "chat-cattle-price"
    ).textContent =
        chat.precio;


    document.getElementById(
        "chat-cattle-link"
    ).href =
        `detalle-bovino.html?id=${chat.bovinoId}`;


    /*
     * Mostrar mensajes
     */

    mostrarMensajes(
        chat
    );


    /*
     * Actualizar lista

     */

    mostrarConversaciones();


    /*
     * Enfocar caja de texto

     */

    if (messageInput) {

        messageInput.focus();

    }

}



/* =========================================================
   MOSTRAR MENSAJES
========================================================= */

function mostrarMensajes(chat) {

    messagesContainer.innerHTML = "";


    if (
        !chat.mensajes ||
        chat.mensajes.length === 0
    ) {

        messagesContainer.innerHTML = `

            <div class="no-messages">

                Esta es una conversación nueva.

                <br>

                Escribe un mensaje para comenzar.

            </div>

        `;

        return;

    }


    chat.mensajes.forEach(
        function (mensaje) {

            const message =
                document.createElement("div");


            message.className =
                `message ${mensaje.tipo}`;


            message.innerHTML = `

                <div class="message-bubble">

                    ${mensaje.texto}

                    <span class="message-time">

                        ${mensaje.hora}

                    </span>

                </div>

            `;


            messagesContainer.appendChild(
                message
            );

        }
    );


    /*
     * Bajar automáticamente
     * hasta el último mensaje.
     */

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;

}



/* =========================================================
   ENVIAR MENSAJE
========================================================= */

if (messageForm) {

    messageForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*
             * No hay conversación seleccionada
             */

            if (!conversacionActual) {

                return;

            }


            /*
             * Obtener texto
             */

            const texto =
                messageInput.value.trim();


            if (!texto) {

                return;

            }


            /*
             * Hora actual
             */

            const ahora =
                new Date();


            const hora =
                ahora.toLocaleTimeString(
                    "es-CO",
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );


            /*
             * Crear mensaje
             */

            const nuevoMensaje = {

                tipo: "sent",

                texto: texto,

                hora: hora

            };


            /*
             * Agregar mensaje
             */

            conversacionActual.mensajes.push(
                nuevoMensaje
            );


            /*
             * Actualizar último mensaje

             */

            conversacionActual.ultimoMensaje =
                texto;


            conversacionActual.hora =
                hora;


            /*
             * Guardar

             */

            guardarConversaciones();


            /*
             * Actualizar pantalla

             */

            mostrarMensajes(
                conversacionActual
            );


            mostrarConversaciones();


            /*
             * Limpiar input

             */

            messageInput.value = "";


            messageInput.focus();

        }
    );

}



/* =========================================================
   GUARDAR CONVERSACIONES
========================================================= */

function guardarConversaciones() {

    localStorage.setItem(
        "ganadex_chats",
        JSON.stringify(
            conversaciones
        )
    );

}



/* =========================================================
   BUSCAR CONVERSACIONES
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const texto =
                searchInput.value
                    .trim()
                    .toLowerCase();


            if (!texto) {

                mostrarConversaciones();

                return;

            }


            const resultados =
                conversaciones.filter(
                    function (chat) {

                        return (

                            chat.nombre
                                .toLowerCase()
                                .includes(texto)

                            ||

                            chat.raza
                                .toLowerCase()
                                .includes(texto)

                            ||

                            chat.ultimoMensaje
                                .toLowerCase()
                                .includes(texto)

                        );

                    }
                );


            mostrarConversaciones(
                resultados
            );

        }
    );

}



/* =========================================================
   INICIAR CHAT
========================================================= */

mostrarConversaciones();



/* =========================================================
   ABRIR AUTOMÁTICAMENTE DESDE UN BOVINO
========================================================= */

if (bovinoId) {

    let chatEncontrado =
        conversaciones.find(
            function (chat) {

                return (
                    chat.bovinoId === bovinoId
                );

            }
        );


    /*
     * Si existe la conversación,
     * la abrimos.
     */

    if (chatEncontrado) {

        abrirConversacion(
            chatEncontrado.id
        );

    }

}