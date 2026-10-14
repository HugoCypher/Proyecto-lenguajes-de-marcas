/**
 * AULA XML - Script principal
 * Fase 1 · Prototipo navegable
 */

(function () {
  "use strict";

  // ========== Tema (claro / oscuro) ==========
  const THEME_KEY = "aula-xml-theme";

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);

    // Actualizar icono del botón
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    const sun = btn.querySelector(".icon-sun");
    const moon = btn.querySelector(".icon-moon");
    if (theme === "dark") {
      sun?.classList.remove("hidden");
      moon?.classList.add("hidden");
    } else {
      sun?.classList.add("hidden");
      moon?.classList.remove("hidden");
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || getPreferredTheme();
    applyTheme(current === "dark" ? "light" : "dark");
  }

  // ========== Menú móvil ==========
  function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-main");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cerrar al hacer clic en un enlace
    nav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ========== Marcar enlace activo ==========
  function setActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  // ========== Inicialización ==========
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getPreferredTheme());
    document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);
    initMobileMenu();
    setActiveNav();
  });
})();