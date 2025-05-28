import axios from "axios";
import { API_URL_PRODUCTS } from "../api/conexiones";

export async function MostrarProductos() {
  const response = await axios.get(`${API_URL_PRODUCTS}/`);
  return response.data;
}

export async function CrearProducto(producto, token) {
  const response = await axios.post(
    `${API_URL_PRODUCTS}/`,
    producto,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
}

export async function ObtenerCategorias() {
  const response = await axios.get(`${API_URL_PRODUCTS}/categories`);
  return response
}
export async function ObtenerMarcas() {
  const response = await axios.get(`${API_URL_PRODUCTS}/brands`);
  return response;
}