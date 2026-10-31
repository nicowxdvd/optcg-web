"use client";

import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";

    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);

  }

  return (
    <button
      onClick    = {toggle}
      type       = "button"
      className  = "ml-4 text-fg-muted transition-colors hover:text-gold"
      aria-label = "Cambiar tema">
      <FiMoon size={18} className="in-data-[theme=light]:hidden" />
      <FiSun  size={18} className="hidden in-data-[theme=light]:block" />
    </button>
  );

}
