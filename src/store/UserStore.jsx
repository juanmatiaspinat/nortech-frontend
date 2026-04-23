import { create } from "zustand";
import { crearUsuario, obtenerPerfiles } from "../models/crudUsuarios";

export const useUsuariosStore = create((set) => ({
  perfiles: [],

  crearNuevoUsuario: async (payload) => {
    const response = await crearUsuario(payload);
    return response;
  },

  cargarPerfiles: async () => {
    try {
      const perfiles = await obtenerPerfiles();

      set(() => ({
        perfiles: Array.isArray(perfiles) ? [...perfiles] : [],
      }));

      return perfiles;
    } catch (error) {
      console.error("Error al cargar perfiles:", error);

      set(() => ({
        perfiles: [],
      }));

      return [];
    }
  },
}));
