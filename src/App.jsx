import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CargarProducto from "./pages/CargarProducto";
import Pago from "./pages/Pago";

import HistorialCompras from "./pages/HistorialCompras";

import Reparaciones from "./pages/Reparaciones";

import SolicitarReparacion
  from "./pages/SolicitarReparacion";

import ReparacionesClientes
  from "./pages/ReparacionesClientes";

function App() {

  return (

    <Router>

      <div className="app-fixed-layout">

        <Navbar />

        <main className="main-scroll-area">

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/catalogo"
              element={<Catalogo />}
            />

            <Route
              path="/carrito"
              element={<Carrito />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/registro"
              element={<Register />}
            />

            <Route
              path="/admin/cargar-producto"
              element={<CargarProducto />}
            />

            <Route
              path="/pago"
              element={<Pago />}
            />

            <Route
              path="/historial"
              element={<HistorialCompras />}
            />

            <Route
              path="/reparaciones"
              element={<Reparaciones />}
            />

            <Route
              path="/solicitar-reparacion"
              element={
                <SolicitarReparacion />
              }
            />

            <Route
              path="/reparaciones-clientes"
              element={
                <ReparacionesClientes />
              }
            />

          </Routes>

        </main>

        <Footer />

      </div>

    </Router>
  );
}

export default App;
