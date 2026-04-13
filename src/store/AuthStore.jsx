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

          console.log("LOGIN RESPONSE:", response.data);

          const token = response.data?.session?.access_token;
          const datauser = response.data?.session?.user;

          if (!token) {
            throw new Error("No se recibió token en la respuesta");
          }

          localStorage.setItem("token", token);

          set({
            isAuthenticated: true,
            token,
            error: null,
            datauserAuth: datauser || [],
          });

          return response.data;
        } catch (error) {
          console.error("ERROR LOGIN:", error.response?.data || error);

          set({
            error:
              error.response?.data?.message ||
              error.message ||
              "Error al iniciar sesión",
          });

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
