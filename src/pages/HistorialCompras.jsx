import { useEffect, useState } from "react";

import {
    ObtenerHistorialVentas,
} from "../models/crudVentas";

export default function HistorialCompras() {

    const [ventas, setVentas] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const token =
        JSON.parse(
            localStorage.getItem("auth-storage")
        )?.state?.token;

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    useEffect(() => {

        cargarHistorial();

    }, []);

    const cargarHistorial = async () => {

        try {

            const response =
                await ObtenerHistorialVentas(
                    user.id,
                    token
                );

            setVentas(response.historial);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return <h2>Cargando...</h2>;
    }

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                Historial de compras
            </h2>

            {ventas.length === 0 ? (

                <p>
                    No hay compras realizadas.
                </p>

            ) : (

                <div className="row">

                    {ventas.map((venta) => (

                        <div
                            key={venta.id}
                            className="col-md-6 mb-3"
                        >

                            <div className="card p-3 shadow-sm">

                                <h5>
                                    Venta #{venta.id}
                                </h5>

                                <p>
                                    Estado:
                                    {" "}
                                    {venta.estado}
                                </p>

                                <p>
                                    Total:
                                    {" "}
                                    $
                                    {new Intl.NumberFormat(
                                        "es-AR"
                                    ).format(
                                        venta.total
                                    )}
                                </p>

                                <p>
                                    Fecha:
                                    {" "}
                                    {new Date(
                                        venta.created_at
                                    ).toLocaleString()}
                                </p>

                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
