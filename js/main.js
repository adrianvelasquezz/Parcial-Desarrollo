// Datos de ejemplo: el mismo componente se reutiliza con datos distintos.
const productos = [
  { imagen: "assets/aero-run.svg",    titulo: "Aero Run",    descripcion: "Zapatilla ligera para el día a día, suela amortiguada.", precio: 189900, etiqueta: "Nuevo" },
  { imagen: "assets/cloud-white.svg", titulo: "Cloud White", descripcion: "Blanca y limpia. Combina con absolutamente todo.",       precio: 169900 },
  { imagen: "assets/urban-high.svg",  titulo: "Urban High",  descripcion: "Caña alta con estilo urbano y detalle en mostaza.",      precio: 219900, etiqueta: "Top" },
  { imagen: "assets/trail-boot.svg",  titulo: "Trail Boot",  descripcion: "Bota resistente para caminos y días de lluvia.",         precio: 259900 },
  { imagen: "assets/mint-flow.svg",   titulo: "Mint Flow",   descripcion: "Tono menta fresco, flexible y muy cómoda.",              precio: 179900, etiqueta: "Nuevo" },
  { imagen: "assets/rose-high.svg",   titulo: "Rose High",   descripcion: "Caña alta en rosa suave para un toque diferente.",       precio: 209900 },
];

const grid = document.getElementById("grid");
const contador = document.getElementById("cart-count");
const toast = document.getElementById("toast");
const dialogo = document.getElementById("detalle");
const cop = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

let items = 0;
let toastTimer;

function avisar(mensaje) {
  toast.textContent = mensaje;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// Crear una tarjeta por producto
productos.forEach((p) => {
  const tarjeta = document.createElement("tarjeta-producto");
  Object.entries(p).forEach(([clave, valor]) => tarjeta.setAttribute(clave, valor));
  grid.appendChild(tarjeta);
});

// Escuchar los eventos que emite el componente
grid.addEventListener("agregar-carrito", (e) => {
  items += 1;
  contador.textContent = items;
  contador.classList.remove("bump");
  void contador.offsetWidth; // reinicia la animación
  contador.classList.add("bump");
  avisar(`${e.detail.titulo} agregado al carrito`);
});

grid.addEventListener("ver-mas", (e) => {
  const { titulo, descripcion, precio, imagen } = e.detail;
  document.getElementById("detalle-img").src = imagen;
  document.getElementById("detalle-img").alt = titulo;
  document.getElementById("detalle-titulo").textContent = titulo;
  document.getElementById("detalle-desc").textContent = descripcion;
  document.getElementById("detalle-precio").textContent = cop(precio);
  dialogo.showModal();
});

document.getElementById("detalle-cerrar").addEventListener("click", () => dialogo.close());
dialogo.addEventListener("click", (e) => { if (e.target === dialogo) dialogo.close(); });
