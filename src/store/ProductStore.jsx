import { create } from "zustand";
import {
  MostrarProductos,
  CrearProducto,
  ObtenerCategorias,
  ObtenerMarcas,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../models/crudProductos";
import { useAuthStore } from "./AuthStore";

export const useProductosStore = create((set) => ({
  dataproductos: [],

  mostrarProductos: async () => {
    const response = await MostrarProductos();
    set({ dataproductos: response });
    return response;
  },

  crearProducto: async (producto) => {
    // ✅ fallback por si zustand todavía no rehidrató
    const token =
      useAuthStore.getState().token || localStorage.getItem("token");

    const response = await CrearProducto(producto, token);

    set((state) => ({
      dataproductos: [...state.dataproductos, response],
    }));

    return response;
  },

  ObtenerCategorias: async () => {
    const response = await ObtenerCategorias();
    return response;
  },

  ObtenerMarcas: async () => {
    const response = await ObtenerMarcas();
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
