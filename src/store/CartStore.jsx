import { create } from "zustand";

export const useCartStore = create((set) => ({
  carrito: [],

  cargarCarrito: () => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    set({ carrito: data });
  },

  agregarAlCarrito: (producto) => {
    set((state) => {
      const existe = state.carrito.find((p) => p.id === producto.id);

      let nuevoCarrito;

      if (existe) {
        nuevoCarrito = state.carrito.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        nuevoCarrito = [...state.carrito, { ...producto, cantidad: 1 }];
      }

      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      return { carrito: nuevoCarrito };
    });
  },

  eliminarDelCarrito: (id) => {
    set((state) => {
      const nuevoCarrito = state.carrito.filter((p) => p.id !== id);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      return { carrito: nuevoCarrito };
    });
  },

  vaciarCarrito: () => {
    localStorage.removeItem("carrito");
    set({ carrito: [] });
  },
}));
