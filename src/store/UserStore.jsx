import { create } from "zustand";
import { crearUsuario, obtenerPerfiles } from "../models/crudUsuarios";

export const useUsuariosStore = create((set) => ({

   perfiles: [],
  crearNuevoUsuario: async (payload) => {
    const response = await crearUsuario(payload);
    return response;
  },

  cargarPerfiles: async () => {
    const perfiles = await obtenerPerfiles();
    set({ perfiles });
    return perfiles;
  },

}));