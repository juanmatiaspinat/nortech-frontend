import axios from "axios";
import { API_URL_PRODUCTS } from "../api/conexiones";

export async function obtenerProductos() {
  const response = await axios.get(`${API_URL_PRODUCTS}/active`);
  return response.data;
}

export async function crearProducto(producto, token) {
  console.log("TOKEN ENVIADO:", token);

  const response = await axios.post(`${API_URL_PRODUCTS}/`, producto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function obtenerCategorias() {
  const response = await axios.get(`${API_URL_PRODUCTS}/categories`);
  return response;
}
export async function obtenerMarcas() {
  const response = await axios.get(`${API_URL_PRODUCTS}/brands`);
  return response;
}
export async function obtenerProductoPorId(id) {
  const response = await axios.get(`${API_URL_PRODUCTS}/${id}`);
  return response.data;
}

export async function actualizarProducto(id, producto, token) {
  const response = await axios.put(`${API_URL_PRODUCTS}/${id}`, producto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function eliminarProducto(id, token) {
  const response = await axios.delete(`${API_URL_PRODUCTS}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
