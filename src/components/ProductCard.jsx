import { Link } from 'react-router-dom';

function ProductCard({ nombre, precio_venta, imagen, id_producto, isAdmin, onDelete }) {
  const handleDeleteClick = () => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar el producto "${nombre}"?`);
    if (confirmar) {
      onDelete(id_producto);
    }
  };

  return (
    <div className="col-md-2 mb-2">
      <div className="card h-100">
        <img src={imagen} className="card-img-top" alt={nombre} />
        <div className="card-body d-flex flex-column">
          <div className="product-info-container">
            <h5 className="card-title product-title">{nombre}</h5>
            <p className="card-text product-price mb-2">
              {/* Usamos un formateador para que el precio se vea mejor, ej: $ 150.000 */}
              {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(precio_venta)}
            </p>
          </div>

          <div className="mt-auto"> {/* ALINEAR BOTONES AL FINAL */}
            <button className="btn btn-primary btn-sm w-100">
              Agregar al carrito
            </button>

            {isAdmin && (
              <> {/* FRAGMENTO PARA AGRUPAR BOTONES DE ADMIN */}
                <Link
                  className="btn btn-secondary btn-sm w-100 mt-2"
                  to={`/admin/cargar-producto?id=${id_producto}&editar=true`}
                >
                  Editar producto
                </Link>

                {/* BOTON DE BORRAR ACA!!! */}
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
    </div>
  );
}

export default ProductCard;
