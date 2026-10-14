// Tema claro/oscuro
const temaGuardado = localStorage.getItem("tema") || "light";
document.documentElement.setAttribute("data-theme", temaGuardado);

document.getElementById("cambiarTema")?.addEventListener("click", () => {
  const actual = document.documentElement.getAttribute("data-theme");
  const nuevo = actual === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nuevo);
  localStorage.setItem("tema", nuevo);
});

// Menú móvil
document.getElementById("abrirMenu")?.addEventListener("click", () => {
  document.getElementById("menu")?.classList.toggle("abierto");
});