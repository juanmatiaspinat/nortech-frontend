function ProductCard({ nombre, precio, imagen }) {
    return (
        <div className="col-md-2 mb-2">
            <div className="card h-100">
                <img src={imagen} className="card-img-top" alt={nombre} />
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text">${precio}</p>
                    <button className="btn btn-primary w-100">Agregar al carrito</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
