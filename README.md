
# Proyecto-lenguajes-de-marcas

# Aula XML · Fase 1 · Diseño

**Prototipo navegable** 

## Contenido de esta fase

- Mapa de páginas implementado (Inicio, Temario, Laboratorio, Prácticas, Mi progreso)
- Identidad visual: colores, tipografía, variables CSS, modo claro/oscuro
- Layout responsive (móvil + escritorio)
- Navegación funcional con menú hamburguesa en móvil
- Toggle de tema (claro/oscuro) con persistencia en localStorage
- Estructura lista para las siguientes fases

## Estructura de carpetas

```text
aula-xml/
├── index.html          → Inicio
├── temario.html        → Temario (Fase 2)
├── laboratorio.html    → Laboratorio XML (Fase 3)
├── practicas.html      → Prácticas (Fase 3)
├── progreso.html       → Mi progreso (Fase 4)
├── css/
│   ├── variables.css   → Identidad visual + dark mode
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── styles.css      → Importa todo
├── js/
│   └── main.js         → Tema + menú móvil + enlace activo
├── data/               → (Fase 2)
└── assets/             → (iconos, logos…)
```

## Fases

- [x] Fase 1 · Diseño → Prototipo navegable
- [x] Fase 2 · Contenido → Temario con unidades y ejemplos en `temario.html`
- [ ] Fase 3 · Práctica → Laboratorio XML y ejercicios
- [ ] Fase 4 · Datos → Guardar progreso
- [ ] Fase 5 · IA y n8n
- [ ] Fase 6 · Evaluación y demo

## Nota sobre los ejemplos de XML

En el temario los ejemplos de código usan &lt; y &gt; en lugar de < y >.

Lo he hecho así para que el navegador muestre las etiquetas como texto
y no las interprete como HTML real. Si se pusieran los < > normales,
la página se rompería o no se verían bien los ejemplos.
---

Alumno: Hugo Fernández Riquelme  
Fecha: octubre 2026
