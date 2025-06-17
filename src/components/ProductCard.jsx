import { Link } from 'react-router-dom';

function ProductCard({ nombre, precio_venta, imagen, id_producto, isAdmin }) {
  return (
    <div className="col-md-2 mb-2">
      <div className="card h-100">
        <img src={imagen} className="card-img-top" alt={nombre} />
        <div className="card-body">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text">${precio_venta}</p>

          <button className="btn btn-primary w-100">
            Agregar al carrito
          </button>

          {isAdmin && (
            <Link
              className="btn btn-secondary w-100 mt-2"
              to={`/admin/cargar-producto?id=${id_producto}&editar=true`}
            >
              Editar producto
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;