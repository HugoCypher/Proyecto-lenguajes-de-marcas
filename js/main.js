var KEY = "aula-xml-progreso";
var LECCIONES = ["u1", "u2", "u3", "u4", "u5"];
var PRACTICAS = ["t1", "t2", "e1", "e2", "t3"];
var NOMBRES = {
  u1: "Conceptos generales", u2: "Estructura y sintaxis",
  u3: "Documentos bien formados", u4: "Bien formado vs validado", u5: "Namespaces",
  t1: "Test: bien formado", t2: "Test: atributos",
  e1: "Error: etiqueta sin cerrar", e2: "Error: dos raíces", t3: "Test: válido"
};

function vacio() {
  return { lecciones: {}, practicas: {}, labIntentos: 0, labOk: 0 };
}
function cargar() {
  try {
    var raw = localStorage.getItem(KEY);
    if (!raw) return vacio();
    var d = JSON.parse(raw);
    return {
      lecciones: d.lecciones || {},
      practicas: d.practicas || {},
      labIntentos: d.labIntentos || 0,
      labOk: d.labOk || 0
    };
  } catch (e) { return vacio(); }
}
function guardar(p) { localStorage.setItem(KEY, JSON.stringify(p)); }
function resumen(p) {
  var lecciones = 0, hechas = 0, ok = 0, i;
  for (i = 0; i < LECCIONES.length; i++) if (p.lecciones[LECCIONES[i]]) lecciones++;
  for (i = 0; i < PRACTICAS.length; i++) {
    if (p.practicas[PRACTICAS[i]]) {
      hechas++;
      if (p.practicas[PRACTICAS[i]].ok) ok++;
    }
  }
  return { lecciones: lecciones, ok: ok, pct: Math.round(((lecciones + hechas) / 10) * 100) };
}
function pintarCabecera() {
  var p = cargar(), s = resumen(p);
  var badge = document.getElementById("pct");
  if (badge) badge.textContent = s.pct + "%";
  var fill = document.getElementById("barraFill");
  if (fill) fill.style.width = s.pct + "%";
  var pill = document.getElementById("pill");
  if (pill) pill.textContent = s.pct + "%";
  var nota = document.getElementById("notaHome");
  if (nota) nota.textContent = s.lecciones + " lecciones vistas · " + s.ok + " prácticas correctas · " + p.labIntentos + " análisis en el laboratorio";
}
function prepararTemario() {
  var p = cargar();
  var botones = document.querySelectorAll("[data-leccion]");
  for (var i = 0; i < botones.length; i++) {
    (function (btn) {
      var id = btn.getAttribute("data-leccion");
      if (p.lecciones[id]) { btn.textContent = "Vista"; btn.disabled = true; }
      btn.onclick = function () {
        var datos = cargar();
        datos.lecciones[id] = true;
        guardar(datos);
        btn.textContent = "Vista";
        btn.disabled = true;
        pintarCabecera();
      };
    })(botones[i]);
  }
}
function analizar(texto) {
  var errores = [], t = texto.trim();
  if (!t) return ["No has escrito nada."];
  t = t.replace(/<\?xml[^?]*\?>/gi, "").replace(/<!--[\s\S]*?-->/g, "").trim();
  if (/\s[a-zA-Z_][\w:.-]*=[^"'\s>]+/.test(t)) errores.push("Hay atributos sin comillas.");
  var pila = [], raices = 0, re = /<\/?([a-zA-Z_][\w:.-]*)[^>]*\/?>/g, m;
  while ((m = re.exec(t)) !== null) {
    var etiq = m[0], nombre = m[1];
    if (etiq.charAt(etiq.length - 2) === "/") { if (!pila.length) raices++; continue; }
    if (etiq.charAt(1) === "/") {
      if (!pila.length) errores.push("Cierre inesperado: </" + nombre + ">");
      else {
        var ultimo = pila.pop();
        if (ultimo !== nombre) errores.push("Se abrió <" + ultimo + "> y se cerró </" + nombre + ">");
      }
    } else { if (!pila.length) raices++; pila.push(nombre); }
  }
  if (pila.length) errores.push("Etiquetas sin cerrar: " + pila.join(", "));
  if (!raices) errores.push("No hay elemento raíz.");
  if (raices > 1) errores.push("Hay más de una raíz (solo puede haber una).");
  return errores;
}
function prepararLab() {
  var btn = document.getElementById("btnAnalizar");

  if (!btn) {
    return;
  }

  var entrada = document.getElementById("xmlInput");
  var caja = document.getElementById("resultado");
  var btnLimpiar = document.getElementById("btnLimpiar");

  btn.onclick = function () {
    var texto = entrada.value;

    caja.textContent = "";

    // No registrar un análisis si el editor está vacío.
    if (!texto.trim()) {
      var aviso = document.createElement("p");

      aviso.className = "mal";
      aviso.textContent = "Escribe o pega un XML antes de analizar.";

      caja.appendChild(aviso);
      entrada.focus();
      return;
    }

    var errores = analizar(texto);

    // Guardar el intento y su resultado.
    var datos = cargar();

    datos.labIntentos++;

    if (errores.length === 0) {
      datos.labOk++;
    }

    guardar(datos);
    pintarCabecera();

    // Mostrar el resultado como texto.
    if (errores.length === 0) {
      var correcto = document.createElement("p");

      correcto.className = "ok";
      correcto.textContent =
        "No se han detectado errores con este comprobador.";

      caja.appendChild(correcto);
    } else {
      var titulo = document.createElement("p");

      titulo.textContent = "Errores detectados:";
      caja.appendChild(titulo);

      for (var i = 0; i < errores.length; i++) {
        var mensaje = document.createElement("p");

        mensaje.className = "mal";
        mensaje.textContent = "• " + errores[i];

        caja.appendChild(mensaje);
      }
    }
  };

  if (btnLimpiar) {
    btnLimpiar.onclick = function () {
      entrada.value = "";
      caja.textContent = "Aquí saldrá el análisis.";
      entrada.focus();
    };
  }
}
function prepararPracticas() {
  var botones = document.querySelectorAll("[data-practica]");
  var p = cargar(), i;
  for (i = 0; i < botones.length; i++) {
    (function (btn) {
      var id = btn.getAttribute("data-practica");
      var bien = btn.getAttribute("data-ok");
      var msg = btn.parentElement.querySelector(".msg");
      if (p.practicas[id]) {
        msg.textContent = p.practicas[id].ok ? "Último intento: correcto" : "Último intento: incorrecto";
        msg.className = "msg " + (p.practicas[id].ok ? "ok" : "mal");
      }
      btn.onclick = function () {
        var elegida = document.querySelector('input[name="' + id + '"]:checked');
        if (!elegida) { msg.textContent = "Elige una opción."; msg.className = "msg mal"; return; }
        var ok = elegida.value === bien;
        var datos = cargar();
        datos.practicas[id] = { ok: ok };
        guardar(datos);
        pintarCabecera();
        msg.textContent = ok ? "Correcto." : "Incorrecto. Revisa el temario.";
        msg.className = "msg " + (ok ? "ok" : "mal");
      };
    })(botones[i]);
  }
}
function prepararProgreso() {
  var lista = document.getElementById("detalle");
  if (!lista) return;
  var p = cargar(), s = resumen(p), html = "", i;
  document.getElementById("nLec").textContent = s.lecciones + " / 5";
  document.getElementById("nPrac").textContent = s.ok + " / 5";
  document.getElementById("nLab").textContent = p.labOk + "/" + p.labIntentos;
  for (i = 0; i < LECCIONES.length; i++) {
    var id = LECCIONES[i], vista = p.lecciones[id];
    html += "<li><span>" + NOMBRES[id] + "</span><span class='" + (vista ? "ok" : "") + "'>" + (vista ? "Vista" : "Pendiente") + "</span></li>";
  }
  for (i = 0; i < PRACTICAS.length; i++) {
    var pid = PRACTICAS[i], r = p.practicas[pid], texto = "Sin intento", cls = "";
    if (r) { texto = r.ok ? "Correcta" : "Incorrecta"; cls = r.ok ? "ok" : "mal"; }
    html += "<li><span>" + NOMBRES[pid] + "</span><span class='" + cls + "'>" + texto + "</span></li>";
  }
  lista.innerHTML = html;
document.getElementById("btnBorrar").onclick = function () {
  var confirmar = window.confirm(
    "¿Quieres borrar todo tu progreso? Esta acción no se puede deshacer."
  );

  if (!confirmar) {
    return;
  }

  guardar(vacio());
  location.reload();
};
}
function tema() {
  var oscuro = localStorage.getItem("aula-tema") === "dark";
  document.documentElement.classList.toggle("oscuro", oscuro);
  var btn = document.getElementById("cambiarTema");
  if (btn) {
    btn.textContent = oscuro ? "☀" : "☾";
    btn.onclick = function () {
      oscuro = !document.documentElement.classList.contains("oscuro");
      document.documentElement.classList.toggle("oscuro", oscuro);
      localStorage.setItem("aula-tema", oscuro ? "dark" : "light");
      btn.textContent = oscuro ? "☀" : "☾";
    };
  }
  var menuBtn = document.getElementById("abrirMenu");
  var menu = document.getElementById("menuMovil");
  if (menuBtn && menu) menuBtn.onclick = function () { menu.classList.toggle("abierto"); };
}
document.addEventListener("DOMContentLoaded", function () {
  tema(); pintarCabecera(); prepararTemario(); prepararLab(); prepararPracticas(); prepararProgreso();
});