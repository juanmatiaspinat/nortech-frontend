import { create } from "zustand";
import { MostrarUsuarioXIdSupabase } from "../models/crudUsuarios";

export const useUsuariosStore = create((set) => ({
  datausuarios: [],
  mostrarUserXIdSupabase: async (p) => {
    console.log(p)
    const response = await MostrarUsuarioXIdSupabase(p);
    set({ datausuarios: response });
    return response;
  },
}));