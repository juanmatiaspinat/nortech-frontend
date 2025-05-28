import { create } from "zustand";
import { MostrarProductos, CrearProducto, ObtenerCategorias, ObtenerMarcas } from "../models/crudProductos";
import { useAuthStore } from "./AuthStore";
export const useProductosStore = create((set) => ({
  dataproductos: [],
  mostrarProductos: async () => {
    const response = await MostrarProductos();
    set({ dataproductos: response });
    return response;
  },
  crearProducto: async (producto) => {
    const token = useAuthStore.getState().token; // Obtenemos el token del AuthStore
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

}));
