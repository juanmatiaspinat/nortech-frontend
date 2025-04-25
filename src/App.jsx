import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Register from './pages/Register';
import CargarProducto from './pages/CargarProducto';


function App() {
  return (
    <Router>
      <div className="app-fixed-layout">
        <Navbar />


        <main className="main-scroll-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/admin/cargar-producto" element={<CargarProducto />} />
          </Routes>
        </main>


        <Footer />
      </div>
    </Router>
  );
}


export default App;
