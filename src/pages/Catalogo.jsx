import ProductCard from '../components/ProductCard';
import { useProductosStore } from '../store/ProductStore';
import { useEffect } from 'react';
import { useAuthStore } from '../store/AuthStore';

function Catalogo() {
    const { isAuthenticated, datauserAuth } = useAuthStore();
    const { dataproductos, mostrarProductos } = useProductosStore();
    
    useEffect(() => {
        mostrarProductos(); // Carga los productos al montar el componente
    }, [mostrarProductos]);

    return (
        <div>
            <h2>Catálogo de Productos</h2>
            <div className="row">
                {dataproductos.map((p, index) => (
                    <ProductCard key={index} {...p} isAdmin={datauserAuth.isAdmin} id_producto={p.id}  />
                ))}
            </div>
        </div>
    );
}


export default Catalogo;
