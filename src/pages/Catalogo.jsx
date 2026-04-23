import ProductCard from "../components/ProductCard";
import { useProductosStore } from "../store/ProductStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/AuthStore";
import { Link } from "react-router-dom";

function Catalogo() {
  const { isAuthenticated, datauserAuth } = useAuthStore();

  const { dataproductos, mostrarProductos, eliminarProducto } =
    useProductosStore();

  useEffect(() => {
    mostrarProductos();
  }, [mostrarProductos]);

  // agregar al carrito usando localStorage simple y funcional
  const handleAddToCart = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carritoActual.find((p) => p.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carritoActual.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    alert(`"${producto.nombre}" agregado al carrito`);
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-3">
        <h2 className="m-0">Catálogo de Productos</h2>

        {isAuthenticated && datauserAuth?.role === 1 && (
          <Link to="/admin/cargar-producto" className="btn btn-primary btn-sm">
            Cargar Producto
          </Link>
        )}
      </div>

      <div className="row">
        {dataproductos.map((p) => (
          <ProductCard
            key={p.id}
            {...p}
            id_producto={p.id}
            isAdmin={datauserAuth?.isAdmin}
            onDelete={eliminarProducto}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
