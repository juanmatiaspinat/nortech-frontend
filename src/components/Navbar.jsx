import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const { isAuthenticated, signout, datauserAuth } = useAuthStore();
    console.log("🚀 ~ Navbar ~ datauserAuth:", datauserAuth)
    const navigate = useNavigate();

    const handleLogout = () => {
        signout();
        navigate("/login");
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">NorTech</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/catalogo">Catálogo</Link>
                        </li>
                        {isAuthenticated ? (
                            <li className="nav-item">
                                <span className="nav-link">{datauserAuth.email}</span>  {/* Mostrar el correo del usuario autenticado */}
                                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}


export default Navbar;
