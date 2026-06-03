import axios from "axios";

const API_URL = "http://localhost:6543/reparaciones";

export const crearReparacion = async (data, token) => {
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const obtenerMisReparaciones = async (token) => {
  const response = await axios.get(`${API_URL}/mis-reparaciones`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const obtenerTodasReparaciones = async (token) => {
  const response = await axios.get(`${API_URL}/todas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const actualizarEstado = async (id, estado, token) => {
  const response = await axios.put(
    `${API_URL}/estado/${id}`,
    { estado },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const actualizarDiagnostico = async (
  id,
  diagnostico,
  costo,
  tecnico,
  token,
) => {
  const response = await axios.put(
    `${API_URL}/diagnostico/${id}`,
    {
      diagnostico,
      costo,
      tecnico,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const aceptarReparacion = async (id, token) => {
  const response = await axios.put(
    `${API_URL}/estado/${id}`,
    {
      estado: "En reparación",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const rechazarReparacion = async (id, token) => {
  const response = await axios.put(
    `${API_URL}/estado/${id}`,
    {
      estado: "Pasar a retirar",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
