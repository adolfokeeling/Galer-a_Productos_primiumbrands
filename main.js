/**
 * ==============================================================================
 * PRIMIUMBRANDS CREATIVE SERVICES MARKETPLACE - JAVASCRIPT VANILLA
 * Estudiante: Adolfo Keeling | Institución: Kodigo.org
 * ==============================================================================
 * En este archivo implementamos toda la lógica interactiva de la aplicación:
 * 1. Definición del array 'productos' (9 objetos).
 * 2. Generación dinámica de botones de categorías ("Todas", "Branding", etc.).
 * 3. Renderizado de tarjetas HTML utilizando obligatoriamente map().
 * 4. Filtrado combinado (Categoría + Presupuesto Máximo) utilizando obligatoriamente filter().
 * 5. Validación de presupuesto numérico no negativo.
 * 6. Manejo de eventos con addEventListener() y actualización del DOM sin recargar.
 * 7. Comentarios pedagógicos explicando map(), filter() y manipulación del DOM.
 */

// ==============================================================================
// 1. BASE DE DATOS LOCAL: ARRAY DE PRODUCTOS
// ==============================================================================
// Cada objeto cuenta exactamente con las propiedades: nombre, precio y categoria.
// Los precios son valores numéricos en dólares estadounidenses (USD).
const productos = [
  { nombre: "Logo Design", precio: 250, categoria: "Branding" },
  { nombre: "Mini Brand Guidelines", precio: 450, categoria: "Branding" },
  { nombre: "Corporate Brand Manual", precio: 950, categoria: "Branding" },
  { nombre: "Social Media Templates", precio: 150, categoria: "Digital Marketing" },
  { nombre: "Social Media Campaign", precio: 550, categoria: "Digital Marketing" },
  { nombre: "Landing Page Design", precio: 750, categoria: "Web Design" },
  { nombre: "Website UI Design", precio: 1200, categoria: "Web Design" },
  { nombre: "Product Label Design", precio: 300, categoria: "Packaging" },
  { nombre: "Packaging Design", precio: 650, categoria: "Packaging" }
];

// Lista de categorías requeridas para los botones de filtrado
const categorias = ["Todas", "Branding", "Digital Marketing", "Web Design", "Packaging"];

// ==============================================================================
// 2. REFERENCIAS A ELEMENTOS DEL DOM
// ==============================================================================
// Guardamos los nodos del DOM en constantes para manipularlos de forma eficiente.
const serviciosGrid = document.getElementById("serviciosGrid");
const mensajeSinResultados = document.getElementById("mensajeSinResultados");
const contadorResultados = document.getElementById("contadorResultados");

// Elementos de control de filtros
const contenedorFiltros = document.getElementById("contenedorFiltros");
const inputPresupuestoMax = document.getElementById("presupuestoMax");
const errorPresupuesto = document.getElementById("errorPresupuesto");
const btnFiltrar = document.getElementById("btnFiltrar");
const btnLimpiar = document.getElementById("btnLimpiar");

// Elementos de la Ventana Modal
const modalDetalles = document.getElementById("modalDetalles");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const btnCerrarModalSecundario = document.getElementById("btnCerrarModalSecundario");
const btnSolicitarServicio = document.getElementById("btnSolicitarServicio");
const modalIcono = document.getElementById("modalIcono");
const modalCategoria = document.getElementById("modalCategoria");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescripcion = document.getElementById("modalDescripcion");
const modalListaIncluye = document.getElementById("modalListaIncluye");
const modalPrecio = document.getElementById("modalPrecio");
const modalTiempo = document.getElementById("modalTiempo");

// Estado global de la categoría seleccionada (inicia en "Todas")
let categoriaSeleccionada = "Todas";

// ==============================================================================
// 3. GENERACIÓN DINÁMICA DE BOTONES DE CATEGORÍA
// ==============================================================================

/**
 * Genera e inserta en el DOM los botones de filtro:
 * "Todas", "Branding", "Digital Marketing", "Web Design" y "Packaging".
 */
function generarBotonesCategorias() {
  // Limpiamos el contenedor
  contenedorFiltros.innerHTML = "";

  // Iteramos sobre las categorías usando map() para construir el HTML de cada botón
  const botonesHTML = categorias.map((cat) => {
    // Si la categoría coincide con la activa, añadimos la clase CSS 'active'
    const claseActiva = cat === categoriaSeleccionada ? "active" : "";
    return `
      <button 
        type="button" 
        class="btn-category ${claseActiva}" 
        data-categoria="${cat}"
      >
        ${cat}
      </button>
    `;
  }).join("");

  // Inyectamos los botones generados al contenedor del DOM
  contenedorFiltros.innerHTML = botonesHTML;
}

// ==============================================================================
// 4. FUNCIÓN mostrarProductos(lista) CON USO OBLIGATORIO DE map()
// ==============================================================================

/**
 * ============================================================================
 * EXPLICACIÓN PEDAGÓGICA EN ESPAÑOL: ¿QUÉ ES Y CÓMO FUNCIONA map()?
 * ----------------------------------------------------------------------------
 * El método `Array.prototype.map()` es una función de orden superior que itera
 * sobre cada elemento de un arreglo y devuelve un NUEVO arreglo con la misma
 * longitud, conteniendo los resultados de aplicar una función transformadora.
 * 
 * Ventajas clave de map():
 * 1. Es inmutable: no modifica el arreglo original de datos.
 * 2. En desarrollo Front-End, es el método estándar para convertir arreglos
 *    de objetos (datos en bruto) a cadenas de marcado HTML estructurado.
 * 3. Al combinarlo con `.join("")`, convertimos la lista de plantillas en un
 *    solo bloque de texto listo para ser insertado en `elemento.innerHTML`.
 * ============================================================================
 *
 * @param {Array} lista - Arreglo de objetos producto a renderizar.
 */
function mostrarProductos(lista) {
  // Limpiamos el contenedor previo para evitar duplicados en el DOM
  serviciosGrid.innerHTML = "";

  // 6. Si no hay resultados que coincidan, mostramos el mensaje informativo
  if (lista.length === 0) {
    mensajeSinResultados.classList.remove("hidden");
    contadorResultados.textContent = "0 resultados encontrados";
    return;
  }

  // Ocultamos el mensaje de "sin resultados" si la lista tiene al menos un producto
  mensajeSinResultados.classList.add("hidden");

  // APLICACIÓN DE map(): Transformamos cada producto en su tarjeta HTML
  const tarjetasHTML = lista.map((producto) => {
    // Generamos un identificador CSS amigable para la clase de la insignia
    const claseBadge = producto.categoria.toLowerCase().replace(/\s+/g, "-");

    // Asignación de icono ilustrativo según la categoría
    let icono = "📦";
    if (producto.categoria === "Branding") icono = "🎨";
    else if (producto.categoria === "Digital Marketing") icono = "📱";
    else if (producto.categoria === "Web Design") icono = "💻";
    else if (producto.categoria === "Packaging") icono = "🏷️";

    return `
      <article class="service-card">
        <div class="card-header">
          <div class="card-icon" aria-hidden="true">${icono}</div>
          <span class="service-badge badge-${claseBadge}">${producto.categoria}</span>
        </div>

        <h3 class="card-title">${producto.nombre}</h3>
        <p class="card-description">Solución profesional de ${producto.categoria} desarrollada a medida por Primiumbrands.</p>

        <div class="card-footer">
          <div class="card-price-info">
            <span class="price-label">Inversión</span>
            <span class="card-price">$${producto.precio} USD</span>
          </div>
          <button 
            type="button" 
            class="btn-card-details" 
            onclick="abrirModalProducto('${producto.nombre}', ${producto.precio}, '${producto.categoria}', '${icono}')"
          >
            Ver detalles
          </button>
        </div>
      </article>
    `;
  }).join("");

  // Actualización del contenedor mediante el DOM sin recargar la página
  serviciosGrid.innerHTML = tarjetasHTML;

  // Actualización del contador dinámico de resultados
  const sufijo = lista.length === 1 ? "resultado encontrado" : "resultados encontrados";
  contadorResultados.textContent = `Mostrando ${lista.length} ${sufijo}`;
}

// ==============================================================================
// 5. LÓGICA DE FILTRADO CON USO OBLIGATORIO DE filter()
// ==============================================================================

/**
 * ============================================================================
 * EXPLICACIÓN PEDAGÓGICA EN ESPAÑOL: ¿QUÉ ES Y CÓMO FUNCIONA filter()?
 * ----------------------------------------------------------------------------
 * El método `Array.prototype.filter()` crea un NUEVO arreglo que contiene
 * únicamente aquellos elementos que cumplen con una condición lógica (test).
 * 
 * Funcionamiento:
 * 1. Para cada elemento del arreglo, se ejecuta una función de callback que
 *    debe retornar `true` o `false`.
 * 2. Si retorna `true`, el elemento se incluye en el nuevo arreglo resultante.
 * 3. Si retorna `false`, el elemento se descarta.
 * 4. Tampoco muta el arreglo original.
 * 
 * En nuestra aplicación:
 * Utilizamos `filter()` para evaluar simultáneamente:
 *   a) Si el producto pertenece a la categoría seleccionada (o a "Todas").
 *   b) Si el precio del producto es menor o igual al presupuesto máximo.
 * ============================================================================
 */
/**
 * Determina si una categoría representa la opción global de ver todo el catálogo.
 * Soporta de manera robusta "Todas", "todas", "Todos", "todos", "all" o valores vacíos.
 * @param {string} cat - Nombre de la categoría.
 * @returns {boolean} True si representa ver todo el catálogo.
 */
function esTodasLasCategorias(cat) {
  if (!cat) return true;
  const normalizada = cat.toLowerCase().trim();
  return normalizada === "todas" || normalizada === "todos" || normalizada === "all" || normalizada === "";
}

function aplicarFiltros() {
  // Obtenemos y limpiamos el valor del campo de presupuesto
  const textoPresupuesto = inputPresupuestoMax.value.trim();
  let presupuestoMaximo = null;

  // 7. Validación del precio: debe ser un número no negativo (>= 0)
  if (textoPresupuesto !== "") {
    // Limpiamos posibles símbolos de moneda o comas que el usuario pudiera pegar
    const valorLimpio = textoPresupuesto.replace(/[$,\s]/g, "");
    const valorNumerico = Number(valorLimpio);

    // Verificamos si no es un número válido o si es negativo
    if (isNaN(valorNumerico) || valorNumerico < 0) {
      // Mostramos mensaje visual de error
      if (errorPresupuesto) errorPresupuesto.classList.remove("hidden");
      inputPresupuestoMax.classList.add("input-error");
      return; // Detenemos la ejecución si la validación falla
    }

    presupuestoMaximo = valorNumerico;
  }

  // Si la validación es correcta, ocultamos cualquier mensaje de error previo
  if (errorPresupuesto) errorPresupuesto.classList.add("hidden");
  inputPresupuestoMax.classList.remove("input-error");

  // ==========================================================================
  // USO DE filter() PARA COMBINAR CATEGORÍA Y PRESUPUESTO MÁXIMO (Puntos 2, 3 y 4)
  // ==========================================================================
  const productosFiltrados = productos.filter((producto) => {
    // Criterio 1: Categoría seleccionada (soporta "Todas"/"Todos" y es insensible a mayúsculas)
    const cumpleCategoria =
      esTodasLasCategorias(categoriaSeleccionada) ||
      producto.categoria.toLowerCase().trim() === (categoriaSeleccionada || "").toLowerCase().trim();

    // Criterio 2: Presupuesto máximo (precio <= presupuesto ingresado por el usuario)
    const cumplePresupuesto =
      presupuestoMaximo === null || producto.precio <= presupuestoMaximo;

    // Retorna true solo si cumple ambos criterios a la vez
    return cumpleCategoria && cumplePresupuesto;
  });

  // Renderizamos los productos filtrados en el DOM sin recargar la página
  mostrarProductos(productosFiltrados);
}

// ==============================================================================
// 6. RESTABLECER FILTROS (LIMPIAR)
// ==============================================================================

/**
 * 5. Restaura todos los productos del catálogo al estado inicial.
 */
function limpiarFiltros() {
  // Limpiamos el valor del input y quitamos errores
  inputPresupuestoMax.value = "";
  errorPresupuesto.classList.add("hidden");
  inputPresupuestoMax.classList.remove("input-error");

  // Restablecemos la categoría a "Todas"
  categoriaSeleccionada = "Todas";

  // Volvemos a generar los botones para que "Todas" aparezca con la clase 'active'
  generarBotonesCategorias();

  // Mostramos el arreglo completo de productos mediante la función requerida
  mostrarProductos(productos);
}

// ==============================================================================
// 7. VENTANA MODAL (DETALLES Y CONTACTO DIRECTO)
// ==============================================================================

window.abrirModalProducto = function (nombre, precio, categoria, icono) {
  modalIcono.textContent = icono;
  modalTitulo.textContent = nombre;
  modalCategoria.textContent = categoria;
  modalCategoria.className = `service-badge badge-${categoria.toLowerCase().replace(/\s+/g, "-")}`;
  modalDescripcion.textContent = `Servicio integral de ${categoria} desarrollado por Primiumbrands para empresas y marcas que buscan excelencia.`;
  modalPrecio.textContent = `$${precio} USD`;
  modalTiempo.textContent = precio > 600 ? "15 a 20 días hábiles" : "5 a 10 días hábiles";

  modalListaIncluye.innerHTML = `
    <li>Brief creativo y conceptualización inicial</li>
    <li>Rondas de revisión y ajustes directos con Adolfo Keeling</li>
    <li>Formatos finales optimizados y archivos editables</li>
    <li>Soporte técnico y garantía de calidad de agencia</li>
  `;

  // Acción para redactar correo al hacer clic en 'Solicitar cotización'
  btnSolicitarServicio.onclick = function () {
    const asunto = encodeURIComponent(`Cotización de Servicio: ${nombre}`);
    const cuerpo = encodeURIComponent(`Hola Adolfo,\n\nMe interesa contratar el servicio "${nombre}" ($${precio} USD) en Primiumbrands.\n\nQuedo a la espera de tu respuesta para coordinar detalles.`);
    window.location.href = `mailto:adolfo@primiumbrands.net?subject=${asunto}&body=${cuerpo}`;
    cerrarModal();
  };

  modalDetalles.classList.remove("hidden");
  modalDetalles.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

function cerrarModal() {
  modalDetalles.classList.add("hidden");
  modalDetalles.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

// ==============================================================================
// 8. ASIGNACIÓN DE EVENTOS CON addEventListener()
// ==============================================================================
/**
 * ============================================================================
 * EXPLICACIÓN PEDAGÓGICA EN ESPAÑOL: ¿CÓMO FUNCIONAN LOS EVENTOS DEL DOM?
 * ----------------------------------------------------------------------------
 * `addEventListener(tipoEvento, callback)` permite registrar una función que
 * se ejecutará en respuesta a una acción del usuario (clic, escritura, teclas).
 * 
 * Ventajas clave:
 * 1. Separa limpiamente la estructura HTML de la lógica JavaScript.
 * 2. Permite aplicar "Delegación de Eventos": colocamos el listener en el
 *    contenedor padre (`contenedorFiltros`) y detectamos con `e.target.closest()`
 *    cuál botón hijo fue presionado, incluso si se crearon dinámicamente.
 * 3. Ejecuta las actualizaciones modificando el DOM en vivo sin recargar la página.
 * ============================================================================
 */

// Evento 1: Clic en botones de categoría mediante delegación de eventos
contenedorFiltros.addEventListener("click", (evento) => {
  const boton = evento.target.closest(".btn-category");
  if (!boton) return;

  // Actualizamos la variable de estado con la categoría del botón pulsado (o su texto si no hay dataset)
  categoriaSeleccionada = boton.dataset.categoria || boton.textContent.trim();

  // Actualizamos visualmente la clase 'active' en los botones
  const todosLosBotones = contenedorFiltros.querySelectorAll(".btn-category");
  todosLosBotones.forEach(b => b.classList.remove("active"));
  boton.classList.add("active");

  // Filtramos inmediatamente aplicando los criterios
  aplicarFiltros();
});

// Evento 2: Clic en el botón "Filtrar"
btnFiltrar.addEventListener("click", () => {
  aplicarFiltros();
});

// Evento 3: Filtrado en tiempo real al escribir en el campo de presupuesto
inputPresupuestoMax.addEventListener("input", () => {
  if (errorPresupuesto && !errorPresupuesto.classList.contains("hidden")) {
    errorPresupuesto.classList.add("hidden");
    inputPresupuestoMax.classList.remove("input-error");
  }
  aplicarFiltros();
});

// Evento 4: Filtrado al cambiar el valor (útil para flechas de incremento/decremento)
inputPresupuestoMax.addEventListener("change", () => {
  aplicarFiltros();
});

// Evento 5: Presionar la tecla "Enter" en el campo de presupuesto
inputPresupuestoMax.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    aplicarFiltros();
  }
});

// Evento 6: Clic en el botón "Limpiar filtros"
btnLimpiar.addEventListener("click", () => {
  limpiarFiltros();
});

// Eventos de control para la ventana modal:
btnCerrarModal.addEventListener("click", cerrarModal);
btnCerrarModalSecundario.addEventListener("click", cerrarModal);

modalDetalles.addEventListener("click", (evento) => {
  if (evento.target === modalDetalles) {
    cerrarModal();
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && !modalDetalles.classList.contains("hidden")) {
    cerrarModal();
  }
});

// ==============================================================================
// 9. INICIALIZACIÓN DE LA APLICACIÓN AL CARGAR LA PÁGINA
// ==============================================================================
// 1. Generamos dinámicamente los botones de categoría requeridos
generarBotonesCategorias();

// 2. Ejecutamos mostrarProductos(productos) para pintar todo el catálogo inicial
mostrarProductos(productos);
