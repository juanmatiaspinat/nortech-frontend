import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

function ProductCard({
  id_producto,
  nombre,
  precio_venta,
  imagen,
  isAdmin,
  onDelete,
}) {
  const { datauserAuth } = useAuthStore();

  const handleDeleteClick = () => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto "${nombre}"?`,
    );

    if (confirmar) {
      onDelete(id_producto);
    }
  };

  const handleAddToCart = () => {
    const userId = datauserAuth?.email;
    const key = `carrito_${userId}`;

    const carrito = JSON.parse(localStorage.getItem(key)) || [];

    const existe = carrito.find((p) => p.id === id_producto);

    let nuevoCarrito;

    if (existe) {
      nuevoCarrito = carrito.map((p) =>
        p.id === id_producto ? { ...p, cantidad: (p.cantidad || 1) + 1 } : p,
      );
    } else {
      nuevoCarrito = [
        ...carrito,
        {
          id: id_producto,
          nombre,
          precio_venta,
          imagen,
          cantidad: 1,
        },
      ];
    }

    localStorage.setItem(key, JSON.stringify(nuevoCarrito));

    alert(`"${nombre}" agregado al carrito`);
    window.location.reload();
  };

  return (
    <div className="col-md-2 mb-2">
      <div className="card h-100">
        <img src={imagen} className="card-img-top" alt={nombre} />

        <div className="card-body d-flex flex-column">
          <h5>{nombre}</h5>

          <p>
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
            }).format(precio_venta)}
          </p>

          {localStorage.getItem("user") ? (
            <button
              className="btn btn-primary btn-sm w-100"
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </button>
          ) : null}

          {isAdmin && (
            <>
              <Link
                className="btn btn-secondary btn-sm w-100 mt-2"
                to={`/admin/cargar-producto?id=${id_producto}&editar=true`}
              >
                Editar producto
              </Link>

              <button
                className="btn btn-danger btn-sm w-100 mt-2"
                onClick={handleDeleteClick}
              >
                Borrar producto
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
