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

  const handleAddToCart = (producto) => {
    // VALIDACIÓN DE STOCK
    if (producto.stock <= 0) {
      alert("No hay stock disponible para este producto");

      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carritoActual.find((p) => p.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      console.log(producto);
      carritoActual.push({
        ...producto,
        cantidad: 1,
        stock: producto.stock,
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    alert(`"${producto.nombre}" agregado al carrito`);
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mbñ-3">
        <h2 className="m-0">Catálogo de Productos</h2>

        {isAuthenticated && datauserAuth?.role === 1 && (
          <Link to="/admin/cargar-producto" className="btn btn-primary btn-sm">
            Cargar Producto
          </Link>
        )}
      </div>

      {!isAuthenticated && (
        <div className="alert alert-warning text-center">
          Debes ingresar como usuario para comprar productos.
        </div>
      )}

      <div className="row">
        {dataproductos.map((p) => (
          <ProductCard
            key={p.id}
            {...p}
            stock={p.stock}
            id_producto={p.id}
            isAdmin={datauserAuth?.role === 1}
            hideCartButton={datauserAuth?.role === 1}
            onDelete={eliminarProducto}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
