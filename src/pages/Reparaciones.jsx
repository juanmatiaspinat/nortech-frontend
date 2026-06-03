import { useEffect, useState } from "react";

import {
    obtenerMisReparaciones,
    aceptarReparacion,
    rechazarReparacion,
} from "../models/crudReparaciones";

import { Link } from "react-router-dom";

function Reparaciones() {

    const [reparaciones,
        setReparaciones] = useState([]);

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const token =
        localStorage.getItem("token");

    useEffect(() => {

        if (token) {

            cargarReparaciones();
        }

    }, []);

    const cargarReparaciones =
        async () => {

            try {

                const response =
                    await obtenerMisReparaciones(
                        token
                    );

                setReparaciones(
                    response.reparaciones
                );

            } catch (error) {

                console.log(error);
            }
        };

    const handleAceptar =
        async (id) => {

            try {

                await aceptarReparacion(
                    id,
                    token
                );

                cargarReparaciones();

            } catch (error) {

                console.log(error);
            }
        };

    const handleRechazar =
        async (id) => {

            try {

                await rechazarReparacion(
                    id,
                    token
                );

                cargarReparaciones();

            } catch (error) {

                console.log(error);
            }
        };

    const getEstadoColor =
        (estado) => {

            switch (estado) {

                case "Pendiente":
                    return "secondary";

                case "Llevar a reparar":
                    return "warning";

                case "Esperando aprobación":
                    return "info";

                case "En reparación":
                    return "primary";

                case "Pasar a retirar":
                    return "success";

                case "Finalizada":
                    return "dark";

                default:
                    return "secondary";
            }
        };

    if (!token) {

        return (

            <div className="container mt-4">

                <h1 className="mb-4">
                    Reparaciones
                </h1>

                <div className="alert alert-warning text-center">

                    Debes ingresar como usuario
                    para solicitar reparaciones.

                </div>

            </div>
        );
    }

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    Reparaciones
                </h1>

                <div className="d-flex gap-2">

                    <Link
                        to="/solicitar-reparacion"
                        className="btn btn-dark"
                    >
                        Solicitar reparación
                    </Link>

                    {user?.role === 1 && (

                        <Link
                            to="/reparaciones-clientes"
                            className="btn btn-primary"
                        >
                            Reparaciones clientes
                        </Link>
                    )}

                </div>

            </div>

            {reparaciones.length === 0 ? (

                <p>
                    No tiene reparaciones solicitadas.
                </p>

            ) : (

                <div className="row">

                    {reparaciones.map(
                        (r) => (

                            <div
                                key={r.id}
                                className="col-md-6 mb-4"
                            >

                                <div className="card shadow h-100">

                                    <div className="card-body">

                                        <h4>
                                            {
                                                r.producto_nombre
                                            }
                                        </h4>

                                        <p>

                                            <strong>
                                                Problema:
                                            </strong>

                                            {" "}

                                            {
                                                r.descripcion
                                            }

                                        </p>

                                        <p>

                                            <strong>
                                                Estado:
                                            </strong>

                                            {" "}

                                            <span
                                                className={
                                                    `badge bg-${getEstadoColor(r.estado)}`
                                                }
                                            >
                                                {r.estado}
                                            </span>

                                        </p>

                                        {r.tecnico && (

                                            <p>

                                                <strong>
                                                    Técnico:
                                                </strong>

                                                {" "}

                                                {r.tecnico}

                                            </p>
                                        )}

                                        {r.diagnostico && (

                                            <p>

                                                <strong>
                                                    Diagnóstico:
                                                </strong>

                                                {" "}

                                                {r.diagnostico}

                                            </p>
                                        )}

                                        {r.costo && (

                                            <p>

                                                <strong>
                                                    Costo:
                                                </strong>

                                                {" "}

                                                $

                                                {
                                                    Number(r.costo)
                                                        .toLocaleString()
                                                }

                                            </p>
                                        )}

                                        {r.estado ===
                                            "Esperando aprobación" && (

                                            <div className="d-flex gap-2 mt-3">

                                                <button
                                                    className="btn btn-success w-100"
                                                    onClick={() =>
                                                        handleAceptar(
                                                            r.id
                                                        )
                                                    }
                                                >
                                                    Aceptar
                                                </button>

                                                <button
                                                    className="btn btn-danger w-100"
                                                    onClick={() =>
                                                        handleRechazar(
                                                            r.id
                                                        )
                                                    }
                                                >
                                                    Rechazar
                                                </button>

                                            </div>
                                        )}

                                    </div>

                                </div>

                            </div>
                        )
                    )}

                </div>
            )}

        </div>
    );
}

export default Reparaciones;
