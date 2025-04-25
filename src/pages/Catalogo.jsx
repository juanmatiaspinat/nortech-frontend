import ProductCard from '../components/ProductCard';


const productos = [
    { nombre: 'iPhone 14 Pro', precio: 1200, imagen: 'https://www.ooredoo.tn/Personal/10002-large_default/portable-iphone-14-pro-128gb.jpg' },
    { nombre: 'Samsung S23 Ultra', precio: 1100, imagen: 'https://dcdn-us.mitiendanube.com/stores/001/555/911/products/s23-ultra-lavender-85348a10dc2b6aeb5917102586922580-1024-1024.jpg' },
    { nombre: 'Motorola Edge 30', precio: 650, imagen: 'https://images.fravega.com/f500/d8811db5d536b16c3b3f10e92a6d970b.jpg' }
];


function Catalogo() {
    return (
        <div>
            <h2>Catálogo de Productos</h2>
            <div className="row">
                {productos.map((p, index) => (
                    <ProductCard key={index} {...p} />
                ))}
            </div>
        </div>
    );
}


export default Catalogo;
