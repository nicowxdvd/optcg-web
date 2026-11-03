import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CardFilters, { type Filters } from "./CardFilters";

const onChange = vi.fn();

function setup(filters: Filters = { q: "" }) {
  return render(<CardFilters filters={filters} onChange={onChange} />);
}

function type(value: string) {
  fireEvent.change(screen.getByRole("searchbox", { name: "Buscar carta" }), { target: { value } });
}

describe("CardFilters", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    onChange.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("inicia con los valores recibidos", () => {
    setup({ q: "luffy", type: "EVENT", cost: 3 });

    expect(screen.getByRole("searchbox", { name: "Buscar carta" })).toHaveValue("luffy");
    expect(screen.getByRole("combobox", { name: "Tipo" })).toHaveValue("EVENT");
    expect(screen.getByRole("combobox", { name: "Coste" })).toHaveValue("3");
  });

  it("ofrece los tres tipos de carta", () => {
    setup();

    const options = screen.getAllByRole("option").map(option => option.textContent);

    expect(options).toEqual(expect.arrayContaining(["Personaje", "Evento", "Escenario"]));
  });

  it("ofrece costes del 0 al 10", () => {
    setup();

    const select  = screen.getByRole("combobox", { name: "Coste" });
    const options = Array.from(select.querySelectorAll("option")).map(option => option.value);

    expect(options).toEqual(["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
  });

  it("sin filtros no muestra Limpiar", () => {
    setup();

    expect(screen.queryByRole("button", { name: /Limpiar/ })).not.toBeInTheDocument();
  });

  it("Limpiar cuenta los filtros activos", () => {
    setup({ q: "luffy", type: "EVENT", cost: 0 });

    expect(screen.getByRole("button", { name: "Limpiar (3)" })).toBeInTheDocument();
  });

  it("el coste 0 cuenta como filtro activo", () => {
    setup({ q: "", cost: 0 });

    expect(screen.getByRole("button", { name: "Limpiar (1)" })).toBeInTheDocument();
  });

  it("notifica el texto con debounce y recortado", () => {
    setup();

    type("  zoro ");
    expect(onChange).not.toHaveBeenCalled();

    act(() => { vi.advanceTimersByTime(300); });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ q: "zoro" });
  });

  it("reinicia el temporizador si se sigue escribiendo", () => {
    setup();

    type("z");
    act(() => { vi.advanceTimersByTime(200); });
    type("zo");
    act(() => { vi.advanceTimersByTime(200); });

    expect(onChange).not.toHaveBeenCalled();

    act(() => { vi.advanceTimersByTime(100); });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ q: "zo" });
  });

  it("conserva tipo y coste al cambiar el texto", () => {
    setup({ q: "", type: "STAGE", cost: 2 });

    type("nami");
    act(() => { vi.advanceTimersByTime(300); });

    expect(onChange).toHaveBeenCalledWith({ q: "nami", type: "STAGE", cost: 2 });
  });

  it("no notifica si el texto recortado coincide con el actual", () => {
    setup({ q: "luffy" });

    type(" luffy ");
    act(() => { vi.advanceTimersByTime(300); });

    expect(onChange).not.toHaveBeenCalled();
  });

  it("notifica el tipo al instante", () => {
    setup({ q: "luffy" });

    fireEvent.change(screen.getByRole("combobox", { name: "Tipo" }), { target: { value: "EVENT" } });

    expect(onChange).toHaveBeenCalledWith({ q: "luffy", type: "EVENT" });
  });

  it("quita el tipo al elegir la opción vacía", () => {
    setup({ q: "", type: "EVENT" });

    fireEvent.change(screen.getByRole("combobox", { name: "Tipo" }), { target: { value: "" } });

    expect(onChange).toHaveBeenCalledWith({ q: "", type: undefined });
  });

  it("notifica el coste como número", () => {
    setup();

    fireEvent.change(screen.getByRole("combobox", { name: "Coste" }), { target: { value: "4" } });

    expect(onChange).toHaveBeenCalledWith({ q: "", cost: 4 });
  });

  it("notifica el coste 0 y no lo trata como vacío", () => {
    setup();

    fireEvent.change(screen.getByRole("combobox", { name: "Coste" }), { target: { value: "0" } });

    expect(onChange).toHaveBeenCalledWith({ q: "", cost: 0 });
  });

  it("quita el coste al elegir la opción vacía", () => {
    setup({ q: "", cost: 5 });

    fireEvent.change(screen.getByRole("combobox", { name: "Coste" }), { target: { value: "" } });

    expect(onChange).toHaveBeenCalledWith({ q: "", cost: undefined });
  });

  it("Limpiar vacía el campo y notifica los filtros vacíos", () => {
    setup({ q: "luffy", type: "EVENT", cost: 1 });

    fireEvent.click(screen.getByRole("button", { name: "Limpiar (3)" }));

    expect(screen.getByRole("searchbox", { name: "Buscar carta" })).toHaveValue("");
    expect(onChange).toHaveBeenCalledWith({ q: "" });
  });
});
