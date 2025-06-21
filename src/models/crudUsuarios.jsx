import axios from "axios";
import { API_URL_AUTH } from "../api/conexiones";

export async function crearUsuario(payload) {
  try {
    const response = await axios.post(`${API_URL_AUTH}/signup`, payload);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error.response ? error.response.data : error; 
  }
}

export async function obtenerPerfiles() {
  try {
    const response = await axios.get(`${API_URL_AUTH}/profiles`);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener perfiles:", error);
    throw error.response ? error.response.data : error;
  }
}

