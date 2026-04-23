import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { API_URL_AUTH } from "../api/conexiones";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuth: false,
      isAuthenticated: false,
      token: null,
      error: null,
      datauserAuth: [],

      signCreateEmail: async (p) => {
        try {
          const response = await axios.post(`${API_URL_AUTH}/signup`, {
            email: p.email,
            password: p.password,
          });

          return response.data.user;
        } catch (error) {
          console.error("ERROR SIGNUP:", error.response?.data || error);
          set({
            error:
              error.response?.data?.message || "Error al registrar usuario",
          });
          return null;
        }
      },

      signInWithEmail: async (p) => {
        try {
          const response = await axios.post(`${API_URL_AUTH}/signin`, {
            email: p.email,
            password: p.password,
          });

          const session = response.data.session;
          const token = session.access_token;
          const datauser = session.user;

          // ✅ guardar SIEMPRE el token fresco
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(datauser));

          set({
            isAuthenticated: true,
            token,
            error: null,
            datauserAuth: datauser,
          });

          return response.data;
        } catch (error) {
          console.error("ERROR LOGIN:", error.response?.data || error);
          set({ error: "Failed to login. Please check your credentials." });
          return null;
        }
      },

      signout: async () => {
        localStorage.removeItem("token");
        set({
          isAuthenticated: false,
          token: null,
          datauserAuth: [],
        });
      },

      checkAuth: () => {
        const token = localStorage.getItem("token");

        if (token) {
          set({
            isAuthenticated: true,
            token,
          });
        } else {
          set({
            isAuthenticated: false,
            token: null,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    },
  ),
);
