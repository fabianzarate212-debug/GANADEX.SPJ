# CAMBIOS.md — GANADEX S.P.J.

Registro de cambios del proyecto. Se actualiza al final de cada sesión de 
trabajo, no a mitad de camino. Colaboradores: Fabián, Claude, ChatGPT.

---

## Sesión — Auditoría y corrección de errores (pre-responsive)
Autor: Claude

### Contexto
Antes de iniciar el trabajo de diseño responsive, se hizo una auditoría 
completa de HTML, CSS y JS del proyecto. Se encontraron 13 problemas 
(4 críticos, 2 altos, 6 medios, 2 bajos). Se acordó corregirlos en fases 
antes de tocar responsive.

### FASE 1 — Correcciones críticas
- `js/detalle.js`: el botón "Chatear con el vendedor" apuntaba siempre a 
  BV-0001 porque la lógica que fijaba el `href` estaba fuera de la función 
  `cargarDetalleBovino()`, usando una variable (`bovino`) fuera de alcance. 
  Se movió la lógica dentro de la función, usando el id real del bovino 
  cargado. Se agregó manejo para el caso "bovino no encontrado".
- `index.html`: los botones "Explorar Bovinos" y "Publicar Ganado" del hero 
  usaban rutas inexistentes (`paginas/explorar.html`, `paginas/publicar.html`). 
  Corregidas a `explorar.html` y `publicar.html`.
- `index.html`: los mismos botones usaban clases `btn-primary`/`btn-secondary` 
  que no existían en ningún CSS (el CSS tenía `.hero-primary`/`.hero-secondary`, 
  sin usar). Se renombraron los selectores en `hero.css` a `.btn-primary`/
  `.btn-secondary` y se agregó estado hover a ambos.
- `js/bovinos.js`: se eliminó un carácter `2` suelto al inicio del archivo 
  (residuo de copiado/pegado).

### Bugs adicionales encontrados y corregidos durante la Fase 1
- `index.html`: al editar `.hero-buttons` se generó temporalmente un `</div>` 
  de más que cerraba `.hero-container` antes de tiempo, sacando `.hero-image` 
  del grid. Corregido reconstruyendo el bloque completo del hero.
- `index.html`: los chips "Brahman", "Angus", "Gyr" del hero eran `<span>` sin 
  función. Se convirtieron en `<a>` que enlazan a 
  `explorar.html?busqueda=<raza>` (mismo patrón que ya usa la barra de 
  búsqueda). Se actualizó `hero.css` (`.quick-filters span` → 
  `.quick-filters a`, con hover).

### FASE 2 — Estructura HTML
Se corrigieron etiquetas `<nav class="navbar">` duplicadas o mal cerradas 
(prerrequisito para el menú hamburguesa responsive) en:
- `index.html` (nav anidado — se abría dos veces)
- `login.html` (`</nav>` de cierre duplicado)
- `detalle-bovino.html` (`</nav>` de cierre duplicado)
- `explorar.html` (`</nav>` de cierre duplicado)

Durante la corrección de `index.html` se detectó y arregló además un botón 
"Publicar Ganado" con la etiqueta de apertura `<a` faltante (quedaban los 
atributos sueltos como texto visible en pantalla).

### FASE 3 — Inconsistencias (en curso)
- `hero.css`: la regla `.hero-content h1{color:#fff}` no aplicaba nunca 
  porque el HTML usa `<h2>`, no `<h1>`, para ese texto. El verde visible 
  era herencia accidental de `--color-primary-dark` (estilo global de 
  títulos). Se corrigió el selector a `.hero-content h2` y se fijó el color 
  explícitamente en `var(--color-primary-dark)`, manteniendo el mismo 
  resultado visual pero de forma intencional.
- `registro.css`: `.auth-box` no tenía `margin:0 auto`, por lo que la 
  tarjeta de registro quedaba pegada al borde izquierdo en vez de centrada 
  (a diferencia de `.auth-card` en `auth.css`, usado por login/perfil, que 
  sí centraba). Se agregó `margin:0 auto` para que las tres páginas de 
  autenticación (login, registro, perfil) tengan el mismo comportamiento 
  de centrado.
- `variables.css`: se agregó la variable `--font-display: 'Fraunces', serif;`, 
  que faltaba. `registro.css` ya la usaba para el título "Crear cuenta" y 
  `registro.html` ya cargaba la fuente desde Google Fonts, pero sin la 
  variable declarada la regla era inválida y se ignoraba (el título usaba 
  Arial por defecto).
- `css/login.css`: identificado como código muerto — duplica 1:1 las 
  reglas de `auth.css` pero ningún HTML lo enlaza. **Pendiente**: Fabián 
  debe eliminar el archivo de su copia del proyecto.

### Pendiente para continuar
- Fase 3: punto 9 (revisión visual completa login/registro/perfil), 
  punto 11 (agregar badge "Disponible"/"Vendido" faltante en tarjetas de 
  `explorar.html`).
- Fase 4: limpieza de comentarios/selectores duplicados en `chat.css` y 
  `catalog.css`.
- Fase 5: responsive (header, hero, catálogo, explorar, detalle, 
  autenticación, chat, publicar, footer).

### Decisiones de diseño confirmadas
- No se rediseña el frontend existente — el trabajo de responsive adapta 
  el diseño actual a distintas pantallas,

  ---

## Sesión — Cierre de Fase 3, Fase 4 (limpieza) e inicio de Fase 5 (responsive)
Autor: Claude

### Cierre FASE 3 — Inconsistencias
- `explorar.html`: agregados los badges de estado "Disponible" faltantes en 
  las tarjetas de Angus, Gyr, Simental y Normando (antes solo Brahman lo 
  tenía). La tarjeta de Angus ya había sido editada manualmente; se 
  normalizó su indentación.
- `catalog.css`: agregada la clase `.sold` (fondo `var(--color-danger)`, 
  rojo) para diferenciar visualmente el estado "Vendido" del estado 
  "Disponible" (`.available`, verde). Antes ambos estados usaban el mismo 
  color verde, lo cual podía confundir a un comprador.
- `index.html` y `explorar.html`: la tarjeta de Brangus (único bovino 
  vendido) actualizada de `class="status available"` a 
  `class="status sold"` en ambas páginas.

### FASE 4 — Limpieza
- `catalog.css`: consolidados los selectores duplicados `.featured` (dos 
  bloques separados) y `.featured-grid` (dos bloques separados) en una 
  sola declaración cada uno. Sin cambios visuales.
- `chat.css`: eliminados comentarios de sección repetidos 
  (`/* CHAT ACTIVO */`, `/* MENSAJES */`, `/* FORMULARIO */` aparecían 
  duplicados). Sin cambios visuales ni funcionales.

### FASE 5 — Responsive (iniciada)

**Header — menú hamburguesa (breakpoint 860px)**

Se implementó un menú de navegación colapsable para pantallas angostas, 
sin modificar el diseño en escritorio.

- `header.css`: 
  - Nuevo bloque `.menu-toggle` (botón hamburguesa animado a "X" con CSS puro).
  - Nuevo `#nav-wrapper` con `display:contents` en escritorio (invisible 
    a efectos de layout) que en el media query `(max-width:860px)` se 
    convierte en panel desplegable (`position:absolute`, oculto por 
    defecto, visible con la clase `.open`).
  - Ajustes de tamaño de logo, título y botones de usuario para pantallas 
    angostas.
  - A los 480px se oculta el subtítulo "Compra y Venta de Ganado" para 
    ahorrar espacio.
- `header.js`: 
  - Lógica de apertura/cierre del menú (clic en el botón, clic en un link 
    del menú, clic fuera del menú).
  - Nueva función `actualizarAlturaHeader()`: mide la altura real del 
    header en cada carga y resize, y actualiza la variable 
    `--header-height` dinámicamente. Esto evita que el contenido de la 
    página quede tapado o con espacio de más si el header cambia de 
    tamaño (login/logout, distintos anchos de pantalla).
- HTML: se envolvió el `<nav>` y el botón "Publicar Ganado" dentro de un 
  nuevo `<div id="nav-wrapper">`, y se agregó el botón 
  `<button id="menu-toggle">` antes de ese wrapper, dentro de 
  `.header-bottom`. Aplicado hasta ahora en:
  - `index.html` ✅ (probado y confirmado)
  - `login.html` ✅ (pendiente de confirmación del usuario)

**Nota de corrección durante esta fase:** en un cambio anterior se 
renombraron por error las clases de los botones del hero de 
`hero-primary`/`hero-secondary` a `btn-primary`/`btn-secondary` en 
`index.html`, asumiendo que `hero.css` ya usaba esos nombres. Se confirmó 
que `hero.css` sigue usando `.hero-primary`/`.hero-secondary` (nunca se 
renombró ahí), así que se revirtió el cambio en `index.html` para 
que las clases coincidan correctamente. `hero.css` no se tocó.

### Pendiente para continuar
- Replicar el patrón de menú hamburguesa (`#menu-toggle` + `#nav-wrapper`) 
  en las 6 páginas restantes: `registro.html`, `perfil.html`, 
  `detalle-bovino.html`, `explorar.html`, `publicar.html`, `chat.html`.
- Resto de Fase 5: revisar/ajustar responsive de hero, catálogo, explorar, 
  detalle, autenticación, chat y footer (varios ya tienen media queries 
  razonables desde antes; falta probarlos a fondo en distintos anchos).

### Nota técnica para recordar
Al probar cambios de CSS/JS en local (Live Server / 127.0.0.1), el 
navegador puede mostrar una versión en caché de los archivos aunque se 
hayan guardado cambios nuevos. Si un cambio "no se ve reflejado", probar 
primero con hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) antes de asumir 
que el código tiene un error.