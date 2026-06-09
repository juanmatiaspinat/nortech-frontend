import { useEffect, useState } from "react";

import { MostrarProductos } from "../models/crudProductos";

import { crearReparacion } from "../models/crudReparaciones";

import { useNavigate } from "react-router-dom";

function SolicitarReparacion() {

    const navigate = useNavigate();

    const [productos,
        setProductos] = useState([]);

    const [idProducto,
        setIdProducto] = useState("");

    const [descripcion,
        setDescripcion] = useState("");

    const token =
        localStorage.getItem("token");

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    useEffect(() => {

        cargarProductos();

    }, []);

    const cargarProductos =
        async () => {

            try {

                const response =
                    await MostrarProductos();

                setProductos(response);

            } catch (error) {

                console.log(error);
            }
        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                await crearReparacion(
                    {
                        id_producto:
                            Number(idProducto),

                        descripcion,
                    },
                    token
                );

                alert(
                    "Solicitud enviada correctamente"
                );

                navigate("/reparaciones");

            } catch (error) {

                console.log(error);

                alert(
                    "Error al crear reparación"
                );
            }
        };

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h1 className="mb-4">
                    Solicitar reparación
                </h1>

                <form
                    onSubmit={handleSubmit}
                >

                    <div className="row mb-4">

                        <div className="col-md-3">

                            <label className="form-label fw-bold">
                                Usuario
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={
                                    user?.user_metadata?.usuario || ""
                                }
                                disabled
                            />

                        </div>

                        <div className="col-md-3">

                            <label className="form-label fw-bold">
                                Apellido
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={
                                    user?.user_metadata?.apellido || ""
                                }
                                disabled
                            />

                        </div>

                        <div className="col-md-2">

                            <label className="form-label fw-bold">
                                Nombre
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={
                                    user?.user_metadata?.nombre || ""
                                }
                                disabled
                            />

                        </div>

                        <div className="col-md-4">

                            <label className="form-label fw-bold">
                                Email
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={
                                    user?.email || ""
                                }
                                disabled
                            />

                        </div>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Dispositivo
                        </label>

                        <select
                            className="form-select"
                            value={idProducto}
                            onChange={(e) =>
                                setIdProducto(
                                    e.target.value
                                )
                            }
                            required
                        >

                            <option value="">
                                Seleccione un dispositivo
                            </option>

                            {productos.map(
                                (p) => (

                                    <option
                                        key={p.id}
                                        value={p.id}
                                    >

                                        {p.nombre}

                                    </option>
                                )
                            )}

                        </select>

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            Descripción
                        </label>

                        <textarea
                            className="form-control"
                            minlength="4" 
                            maxlength="150"
                            rows="5"
                            placeholder="Describa el problema a revisar/reparar..."
                            value={descripcion}
                            onChange={(e) =>
                                setDescripcion(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-dark"
                    >
                        Enviar solicitud
                    </button>

                </form>

            </div>

        </div>
    );
}

export default SolicitarReparacion;
