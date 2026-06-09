import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

function Carrito() {
  const { datauserAuth } = useAuthStore();
  const [carrito, setCarrito] = useState([]);

  const navigate = useNavigate();

  const userId = datauserAuth?.email;
  const key = `carrito_${userId}`;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setCarrito(data);
  }, [key]);

  const eliminarDelCarrito = (id) => {
    const nuevo = carrito.filter((p) => p.id !== id);
    localStorage.setItem(key, JSON.stringify(nuevo));
    setCarrito(nuevo);
  };

  const vaciarCarrito = () => {
    localStorage.removeItem(key);
    setCarrito([]);
  };

  const aumentarCantidad = (id) => {
    const nuevo = carrito.map((p) => {
      if (p.id === id) {
        if ((p.cantidad || 1) >= p.stock) {
          alert("No hay más stock disponible");
          return p;
        }

        return {
          ...p,
          cantidad: (p.cantidad || 1) + 1,
        };
      }

      return p;
    });

    localStorage.setItem(key, JSON.stringify(nuevo));
    setCarrito(nuevo);
  };

  const disminuirCantidad = (id) => {
    const nuevo = carrito.map((p) => {
      if (p.id === id) {
        if ((p.cantidad || 1) <= 1) {
          return p;
        }

        return {
          ...p,
          cantidad: (p.cantidad || 1) - 1,
        };
      }

      return p;
    });

    localStorage.setItem(key, JSON.stringify(nuevo));
    setCarrito(nuevo);
  };

  const total = carrito.reduce(
    (acc, p) => acc + Number(p.precio_venta) * (p.cantidad || 1),
    0,
  );

  const irAPago = () => {
    navigate("/pago", {
      state: {
        carrito,
        total,
      },
    });
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-4">Carrito</h2>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <>
          <div className="row">
            {carrito.map((p, i) => (
              <div key={i} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100 p-3 shadow-sm">
                  <h5>{p.nombre}</h5>

                  <div className="mb-3">
                    <strong>Cantidad:</strong>

                    <div className="d-flex align-items-center gap-2 mt-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        disabled={(p.cantidad || 1) <= 1}
                        onClick={() => disminuirCantidad(p.id)}
                      >
                        -
                      </button>

                      <span
                        style={{
                          minWidth: "30px",
                          textAlign: "center",
                        }}
                      >
                        {p.cantidad || 1}
                      </span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => aumentarCantidad(p.id)}
                      >
                        +
                      </button>

                      <small className="text-success">
                        {p.stock} disponibles
                      </small>
                    </div>
                  </div>

                  <p>
                    Precio: $
                    {new Intl.NumberFormat("es-AR").format(
                      Number(p.precio_venta),
                    )}
                  </p>

                  <button
                    className="btn btn-danger btn-sm mt-auto"
                    onClick={() => eliminarDelCarrito(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4>
              Total: $
              {new Intl.NumberFormat("es-AR").format(total)}
            </h4>

            <div className="d-flex gap-2 mt-2">
              <button
                className="btn btn-warning"
                onClick={vaciarCarrito}
              >
                Vaciar carrito
              </button>

              <button
                className="btn btn-success"
                onClick={irAPago}
              >
                Elegir forma de pago
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
