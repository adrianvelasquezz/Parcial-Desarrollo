/**
 * <tarjeta-producto> — Web Component nativo (Custom Element + Shadow DOM)
 *
 * Atributos (props):
 *   imagen       -> ruta de la imagen
 *   titulo       -> nombre del producto
 *   descripcion  -> texto corto
 *   precio       -> número (se formatea en COP)
 *   etiqueta     -> (opcional) insignia, ej: "Nuevo"
 *
 * Eventos emitidos (CustomEvent, burbujean y cruzan el Shadow DOM):
 *   agregar-carrito -> detail: { titulo, precio }
 *   ver-mas         -> detail: { titulo, descripcion, precio, imagen }
 */
class TarjetaProducto extends HTMLElement {
  static get observedAttributes() {
    return ["imagen", "titulo", "descripcion", "precio", "etiqueta"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get precioFormateado() {
    const n = Number(this.getAttribute("precio")) || 0;
    return new Intl.NumberFormat("es-CO", {
      style: "currency", currency: "COP", maximumFractionDigits: 0,
    }).format(n);
  }

  emitir(nombre, detail) {
    this.dispatchEvent(new CustomEvent(nombre, { detail, bubbles: true, composed: true }));
  }

  render() {
    const imagen = this.getAttribute("imagen") || "";
    const titulo = this.getAttribute("titulo") || "Producto";
    const descripcion = this.getAttribute("descripcion") || "";
    const etiqueta = this.getAttribute("etiqueta");
    const precio = Number(this.getAttribute("precio")) || 0;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        article {
          background: #fff; border: 1px solid #e7e5e1; border-radius: 18px;
          overflow: hidden; height: 100%; display: flex; flex-direction: column;
          transition: transform .2s, box-shadow .2s;
        }
        article:hover { transform: translateY(-4px); box-shadow: 0 14px 30px rgba(0,0,0,.08); }
        .media { position: relative; aspect-ratio: 4 / 3; overflow: hidden; background: #f3f2ef; }
        img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .35s; }
        article:hover img { transform: scale(1.05); }
        .badge {
          position: absolute; top: .75rem; left: .75rem; background: #16181d; color: #fff;
          font: 600 .7rem system-ui, sans-serif; letter-spacing: .06em; text-transform: uppercase;
          padding: .25rem .6rem; border-radius: 999px;
        }
        .body { padding: 1rem 1.1rem 1.2rem; display: flex; flex-direction: column; gap: .4rem; flex: 1; font-family: system-ui, sans-serif; }
        h3 { margin: 0; font-size: 1.05rem; letter-spacing: -.01em; color: #16181d; }
        p { margin: 0; font-size: .9rem; color: #6b7280; flex: 1; }
        .price { font-weight: 700; font-size: 1.1rem; color: #16181d; margin-top: .3rem; }
        .actions { display: flex; gap: .5rem; margin-top: .6rem; }
        button {
          font: 600 .85rem system-ui, sans-serif; cursor: pointer; border-radius: 999px;
          padding: .6rem 1rem; transition: background .15s, color .15s;
        }
        .add { flex: 1; background: #16181d; color: #fff; border: 1px solid #16181d; }
        .add:hover { background: #ff6b4a; border-color: #ff6b4a; }
        .more { background: transparent; color: #16181d; border: 1px solid #e7e5e1; }
        .more:hover { border-color: #16181d; }
        @media (max-width: 380px) { .actions { flex-direction: column; } }
      </style>
      <article>
        <div class="media">
          <img src="${imagen}" alt="${titulo}" loading="lazy">
          ${etiqueta ? `<span class="badge">${etiqueta}</span>` : ""}
        </div>
        <div class="body">
          <h3>${titulo}</h3>
          <p>${descripcion}</p>
          <span class="price">${this.precioFormateado}</span>
          <div class="actions">
            <button class="add" type="button">Agregar</button>
            <button class="more" type="button">Ver más</button>
          </div>
        </div>
      </article>
    `;

    this.shadowRoot.querySelector(".add").addEventListener("click", () =>
      this.emitir("agregar-carrito", { titulo, precio })
    );
    this.shadowRoot.querySelector(".more").addEventListener("click", () =>
      this.emitir("ver-mas", { titulo, descripcion, precio, imagen })
    );
  }
}

customElements.define("tarjeta-producto", TarjetaProducto);
