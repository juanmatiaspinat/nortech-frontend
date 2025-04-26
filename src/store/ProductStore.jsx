import { create } from "zustand";
import { MostrarProductos, CrearProducto } from "../models/crudProductos";
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
}));
