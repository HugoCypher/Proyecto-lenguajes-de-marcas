
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
- [x] Fase 3 · Práctica → Laboratorio XML y ejercicios
- [x] Fase 4 · Datos → Guardar progreso
- [ ] Fase 5 · IA y n8n
- [ ] Fase 6 · Evaluación y demo

## Nota sobre los ejemplos de XML

En el temario los ejemplos de código usan & lt; y & gt; en lugar de < y >.

Lo he hecho así para que el navegador muestre las etiquetas como texto y no las interprete como HTML real. Si se pusieran los < > normales,
la pagína se rompería o no se verían bien los ejemplos. 

## Fase 4 · Datos y progreso

- Guardado del progreso en localStorage.
- Registro de las lecciones marcadas como vistas.
- Guardado del último resultado de cada práctica.
- Registro del total de análisis del laboratorio y de los análisis
  sin errores detectados por el comprobador.
- Resumen del avance en Inicio y Mi progreso.
- Detalle del estado de las lecciones y prácticas.
- Botón para reiniciar el progreso con confirmación.

El porcentaje de avance cuenta las cinco lecciones vistas y las
cinco prácticas intentadas, aunque la respuesta sea incorrecta.
Los análisis del laboratorio se contabilizan por separado.

El progreso se guarda en el navegador utilizado; no se sincroniza
entre dispositivos ni con la cuenta de GitHub.

Alumno: Hugo Fernández Riquelme  
Fecha: octubre 2026
