import ProductCard from '../components/ProductCard';
import { useProductosStore } from '../store/ProductStore';
import { useEffect } from 'react';

function Catalogo() {
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
