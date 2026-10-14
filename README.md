
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

## Próxima fase

**Fase 2 · Contenido** → Convertir el PDF del tema en unidades y lecciones reales dentro de `temario.html` y `data/lessons.json`.

---

Alumno: Hugo Fernández Riquelme  
Fecha: octubre 2026
