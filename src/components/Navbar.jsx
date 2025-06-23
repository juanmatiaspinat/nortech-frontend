import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoNorTech-navbar.png';

function Navbar() {
    const { isAuthenticated, signout, datauserAuth } = useAuthStore();
    const navigate = useNavigate();
    const handleLogout = () => {
        signout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo de NorTech" width="200" />
                </Link>
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
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">{datauserAuth.email}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>Salir</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Ingresar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/registro">Registrarse</Link>
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
