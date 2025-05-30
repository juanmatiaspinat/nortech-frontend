import ProductCard from '../components/ProductCard';
import { useProductosStore } from '../store/ProductStore';
import { useEffect } from 'react';
import { useAuthStore } from '../store/AuthStore';

function Catalogo() {
    const { isAuthenticated, datauserAuth } = useAuthStore();
    if (!isAuthenticated || !datauserAuth.isAdmin) {
      return (
        <div>
          <h2>No tienes permiso para acceder a esta sección.</h2>
        </div>
      );  
    }
    const { dataproductos, mostrarProductos } = useProductosStore();
    console.log("🚀 ~ Catalogo ~ dataproductos:", dataproductos) //muestra el json de datos por consola
    useEffect(() => {
        mostrarProductos(); // Carga los productos al montar el componente
    }, [mostrarProductos]);

    return (
        <div>
            <h2>Catálogo de Productos</h2>
            <div className="row">
                {dataproductos.map((p, index) => (
                    <ProductCard key={index} {...p} />
                ))}
            </div>
        </div>
    );
}


export default Catalogo;
