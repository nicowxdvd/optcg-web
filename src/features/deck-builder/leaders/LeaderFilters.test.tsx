import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LeaderFilters from "./LeaderFilters";

const replace = vi.fn();
let search    = "";

vi.mock("next/navigation", () => ({
  useRouter       : () => ({ replace }),
  usePathname     : () => "/deck-builder",
  useSearchParams : () => new URLSearchParams(search),
}));

function type(value: string) {
  fireEvent.change(screen.getByRole("searchbox", { name: "Buscar líder" }), { target: { value } });
}

describe("LeaderFilters", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    replace.mockReset();
    search = "";
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("inicia con el valor de la URL", () => {
    search = "q=luffy&color=Red";
    render(<LeaderFilters />);

    expect(screen.getByRole("searchbox")).toHaveValue("luffy");
    expect(screen.getByRole("combobox")).toHaveValue("Red");
    expect(screen.getByRole("button", { name: "Limpiar (2)" })).toBeInTheDocument();
  });

  it("sin filtros no muestra Limpiar", () => {
    render(<LeaderFilters />);

    expect(screen.queryByRole("button", { name: /Limpiar/ })).not.toBeInTheDocument();
  });

  it("actualiza la URL con debounce al escribir", () => {
    render(<LeaderFilters />);

    type("  zoro ");
    expect(replace).not.toHaveBeenCalled();

    act(() => { vi.advanceTimersByTime(300); });

    expect(replace).toHaveBeenCalledWith("/deck-builder?q=zoro", { scroll: false });
  });

  it("reinicia el temporizador si se sigue escribiendo", () => {
    render(<LeaderFilters />);

    type("z");
    act(() => { vi.advanceTimersByTime(200); });
    type("zo");
    act(() => { vi.advanceTimersByTime(200); });

    expect(replace).not.toHaveBeenCalled();

    act(() => { vi.advanceTimersByTime(100); });

    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith("/deck-builder?q=zo", { scroll: false });
  });

  it("quita q de la URL al vaciar el campo y conserva color y descarta page", () => {
    search = "q=luffy&color=Red&page=3";
    render(<LeaderFilters />);

    type("");
    act(() => { vi.advanceTimersByTime(300); });

    expect(replace).toHaveBeenCalledWith("/deck-builder?color=Red", { scroll: false });
  });

  it("vaciar el único filtro navega a la ruta sin query", () => {
    search = "q=luffy";
    render(<LeaderFilters />);

    type("");
    act(() => { vi.advanceTimersByTime(300); });

    expect(replace).toHaveBeenCalledWith("/deck-builder", { scroll: false });
  });

  it("no navega si el texto recortado coincide con la URL", () => {
    search = "q=luffy";
    render(<LeaderFilters />);

    type(" luffy ");
    act(() => { vi.advanceTimersByTime(300); });

    expect(replace).not.toHaveBeenCalled();
  });

  it("filtra por color y descarta page", () => {
    search = "page=2";
    render(<LeaderFilters />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Blue" } });

    expect(replace).toHaveBeenCalledWith("/deck-builder?color=Blue", { scroll: false });
  });

  it("quita el color al elegir la opción vacía", () => {
    search = "color=Red";
    render(<LeaderFilters />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "" } });

    expect(replace).toHaveBeenCalledWith("/deck-builder", { scroll: false });
  });

  it("Limpiar vacía el campo y navega a la ruta base", () => {
    search = "q=luffy&color=Red";
    render(<LeaderFilters />);

    fireEvent.click(screen.getByRole("button", { name: "Limpiar (2)" }));

    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(replace).toHaveBeenCalledWith("/deck-builder", { scroll: false });
  });
});
