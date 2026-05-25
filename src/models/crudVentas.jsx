import axios from "axios";

import {
    API_URL_VENTAS,
} from "../api/conexiones";

export async function CrearVenta(
    data,
    token
) {

    const response =
        await axios.post(
            `${API_URL_VENTAS}/`,
            data,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            }
        );

    return response.data;
}

export async function ObtenerHistorialVentas(
    idusuario,
    token
) {

    const response =
        await axios.get(
            `${API_URL_VENTAS}/${idusuario}/historial`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            }
        );

    return response.data;
}
