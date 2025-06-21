import ProductCard from '../components/ProductCard';
import { useProductosStore } from '../store/ProductStore';
import { useEffect } from 'react';
import { useAuthStore } from '../store/AuthStore';
import { Link } from "react-router-dom"; 


function Catalogo() {
    const { isAuthenticated, datauserAuth } = useAuthStore();
    const { dataproductos, mostrarProductos, eliminarProducto } = useProductosStore();

    useEffect(() => {
        mostrarProductos(); // Carga los productos al montar el componente
    }, [mostrarProductos]);

    return (
        <div>
            <div className="d-flex align-items-center gap-3 mb-3">
                <h2 className="m-0">Catálogo de Productos</h2>
                {isAuthenticated && datauserAuth.role === 1 && (
                    <Link to="/admin/cargar-producto" className="btn btn-primary btn-sm">
                        Cargar Producto
                    </Link>
                )}
            </div>

            <div className="row">
                {dataproductos.map((p, index) => (
                    <ProductCard key={index} {...p} isAdmin={datauserAuth.isAdmin} id_producto={p.id} onDelete={eliminarProducto} />
                ))}
            </div>
        </div>
    );
}

export default Catalogo;
