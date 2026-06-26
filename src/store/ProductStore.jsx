import { create } from "zustand";
import {
  obtenerProductos,
  crearProducto,
  obtenerCategorias,
  obtenerMarcas,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../models/crudProductos";
import { useAuthStore } from "./AuthStore";

export const useProductosStore = create((set) => ({
  dataproductos: [],

  obtenerProductos: async () => {
    const response = await obtenerProductos();
    set({ dataproductos: response });
    return response;
  },

  crearProducto: async (producto) => {
    // fallback por si zustand todavía no rehidrató
    const token =
      useAuthStore.getState().token || localStorage.getItem("token");

    const response = await crearProducto(producto, token);

    set((state) => ({
      dataproductos: [...state.dataproductos, response],
    }));

    return response;
  },

  obtenerCategorias: async () => {
    const response = await obtenerCategorias();
    return response;
  },

  obtenerMarcas: async () => {
    const response = await obtenerMarcas();
    return response;
  },

  obtenerProductoPorId: async (id) => {
    const response = await obtenerProductoPorId(id);
    return response;
  },

  actualizarProducto: async (id, producto) => {
    const token =
      useAuthStore.getState().token || localStorage.getItem("token");

    const response = await actualizarProducto(id, producto, token);
    return response;
  },

  eliminarProducto: async (id) => {
    const token = useAuthStore.getState().token;
    await eliminarProducto(id, token);

    set((state) => ({
      dataproductos: state.dataproductos.filter((p) => p.id !== id),
    }));
  },
}));
