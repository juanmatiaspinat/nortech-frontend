import { useEffect, useState } from "react";

import {
  obtenerTodasReparaciones,
  actualizarEstado,
  actualizarDiagnostico,
} from "../models/crudReparaciones";

function ReparacionesClientes() {
  const [reparaciones, setReparaciones] = useState([]);

  const [diagnosticos, setDiagnosticos] = useState({});

  const [modoEdicion, setModoEdicion] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    cargarReparaciones();
  }, []);

  const cargarReparaciones = async () => {
    try {
      const response = await obtenerTodasReparaciones(token);

      setReparaciones(response.reparaciones);

      const datosIniciales = {};
      const edicionInicial = {};

      response.reparaciones.forEach((r) => {
        datosIniciales[r.id] = {
          diagnostico: r.diagnostico || "",
          costo: r.costo || "",
          tecnico: r.tecnico || "",
        };

        edicionInicial[r.id] = !r.diagnostico;
      });

      setDiagnosticos(datosIniciales);

      setModoEdicion(edicionInicial);
    } catch (error) {
      console.log(error);
    }
  };

  const cambiarEstado = async (id, estado) => {
    try {
      await actualizarEstado(id, estado, token);

      cargarReparaciones();
    } catch (error) {
      console.log(error);
    }
  };

  const guardarDiagnostico = async (id) => {
    try {
      const data = diagnosticos[id];

      await actualizarDiagnostico(
        id,
        data?.diagnostico,
        data?.costo,
        data?.tecnico,
        token,
      );

      await actualizarEstado(id, "Esperando aprobación", token);

      setModoEdicion({
        ...modoEdicion,
        [id]: false,
      });

      cargarReparaciones();
    } catch (error) {
      console.log(error);
    }
  };

  const getEstadoColor = (estado) => {
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

  return (
    <div className="container-fluid px-4 pt-1">
      <h1 className="mb-4">Reparaciones clientes</h1>

      <div className="row">
        {reparaciones.map((r) => {
          const editable = modoEdicion[r.id];

          return (
            <div key={r.id} className="col-md-6 mb-4">
              <div className="card shadow h-100">
                <div className="card-body">
                  <h4>{r.producto_nombre}</h4>

                  <p>
                    <strong>Cliente:</strong> {r.usuario_nombre}{" "}
                    {r.usuario_apellido}
                  </p>

                  <p>
                    <strong>Email:</strong> {r.usuario_email}
                  </p>

                  <p>
                    <strong>Problema:</strong> {r.descripcion}
                  </p>

                  <p>
                    <strong>Estado:</strong>{" "}
                    <span className={`badge bg-${getEstadoColor(r.estado)}`}>
                      {r.estado}
                    </span>
                  </p>

                  <div className="mb-3">
                    <select
                      className="form-select"
                      value={r.estado}
                      onChange={(e) => cambiarEstado(r.id, e.target.value)}
                    >
                      <option>Pendiente</option>

                      <option>Llevar a reparar</option>

                      <option>Esperando aprobación</option>

                      <option>En reparación</option>

                      <option>Pasar a retirar</option>

                      <option>Finalizada</option>
                    </select>
                  </div>

                  <hr />

                  <h5 className="mb-3">Diagnóstico</h5>

                  <input
                    type="text"
                    placeholder="Diagnóstico"
                    className="form-control mb-2"
                    value={diagnosticos[r.id]?.diagnostico || ""}
                    disabled={!editable}
                    onChange={(e) =>
                      setDiagnosticos({
                        ...diagnosticos,
                        [r.id]: {
                          ...diagnosticos[r.id],
                          diagnostico: e.target.value,
                        },
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Costo"
                    className="form-control mb-2"
                    value={diagnosticos[r.id]?.costo || ""}
                    disabled={!editable}
                    onChange={(e) =>
                      setDiagnosticos({
                        ...diagnosticos,
                        [r.id]: {
                          ...diagnosticos[r.id],
                          costo: e.target.value,
                        },
                      })
                    }
                  />

                  <select
                    className="form-select mb-3"
                    value={diagnosticos[r.id]?.tecnico || ""}
                    disabled={!editable}
                    onChange={(e) =>
                      setDiagnosticos({
                        ...diagnosticos,
                        [r.id]: {
                          ...diagnosticos[r.id],
                          tecnico: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="">Seleccione técnico</option>

                    <option>Técnico 1</option>

                    <option>Técnico 2</option>

                    <option>Técnico 3</option>
                  </select>

                  {editable ? (
                    <button
                      className="btn btn-dark w-100"
                      onClick={() => guardarDiagnostico(r.id)}
                    >
                      Guardar diagnóstico
                    </button>
                  ) : (
                    <button
                      className="btn btn-success w-100"
                      onClick={() =>
                        setModoEdicion({
                          ...modoEdicion,
                          [r.id]: true,
                        })
                      }
                    >
                      Editar diagnóstico
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReparacionesClientes;
