# paso. · Tienda de calzado

Proyecto académico de la unidad **Introducción al Front-end** (Desarrollo de Aplicaciones Web y Sistemas Operativos).

Página minimalista de una tienda de calzado cuyo núcleo es el componente reutilizable **`<tarjeta-producto>`**, implementado como **Web Component nativo** (HTML + CSS + JavaScript vanilla, sin dependencias).

## Componente `<tarjeta-producto>`

| Atributo (prop) | Descripción |
|---|---|
| `imagen` | Ruta de la imagen del producto |
| `titulo` | Nombre del producto |
| `descripcion` | Texto corto |
| `precio` | Número (se formatea en COP) |
| `etiqueta` | Opcional: insignia como "Nuevo" |

**Eventos:** `agregar-carrito` y `ver-mas` (CustomEvent con `detail`).

```html
<tarjeta-producto imagen="assets/aero-run.svg" titulo="Aero Run"
  descripcion="Zapatilla ligera" precio="189900" etiqueta="Nuevo"></tarjeta-producto>
```

## Estructura

```
index.html
css/styles.css
js/tarjeta-producto.js   # el componente
js/main.js               # datos y manejo de eventos
assets/                  # ilustraciones SVG
```

## Cómo ejecutarlo

Abre `index.html` en el navegador o usa la extensión **Live Server** de VS Code.

## Demo

Publicado con GitHub Pages: _(pega aquí el enlace)_
# Parcial-Desarrollo
# Parcial-Desarrollo
