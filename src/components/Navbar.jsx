import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoNorTech-navbar.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {

  const {
    isAuthenticated,
    signout,
    datauserAuth,
  } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {

    signout();

    localStorage.removeItem("user");

    navigate("/login");
  };

  const userId =
    datauserAuth?.email;

  const key =
    `carrito_${userId}`;

  const data =
    JSON.parse(
      localStorage.getItem(key)
    ) || [];

  const cantidadTotal =
    data.reduce(
      (acc, p) =>
        acc + (p.cantidad || 1),
      0
    );

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/"
        >
          
          <img
            src={logo}
            alt="Logo"
            width="200"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
  className="collapse navbar-collapse"
  id="navbarContent"
>

          <ul className="navbar-nav ms-auto">

            <li>
              <Link
                className="nav-link"
                to="/"
              >
                Inicio
              </Link>
            </li>

            <li>
              <Link
                className="nav-link"
                to="/catalogo"
              >
                Catálogo
              </Link>
            </li>

            <li>
              <Link
                className="nav-link"
                to={
                  datauserAuth?.role === 1
                    ? "/reparaciones-clientes"
                    : "/reparaciones"
                }
              >
                Reparación
              </Link>
            </li>

            {isAuthenticated &&
              datauserAuth?.role !== 1 && (
                <>
                  <li>
                    <Link
                      className="nav-link"
                      to="/carrito"
                    >
                      Carrito ({cantidadTotal})
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="nav-link"
                      to="/historial"
                    >
                      Historial
                    </Link>
                  </li>
                </>
              )}

            {isAuthenticated ? (
              <>
                <li>
                  <span className="nav-link">

                    {datauserAuth
                      ? `${datauserAuth.role === 1
                        ? "ADMIN"
                        : "CLIENTE"
                      }: ${datauserAuth.username || datauserAuth.usuario || datauserAuth.user_metadata?.usuario}`
                      : null}

                  </span>
                </li>

                <li>
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="nav-link"
                    to="/login"
                  >
                    Ingresar
                  </Link>
                </li>

                <li>
                  <Link
                    className="nav-link"
                    to="/registro"
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
