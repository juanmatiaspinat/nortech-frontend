import { useState } from 'react';
import { useProductosStore } from "../store/ProductStore"; // Ajusta el path

function CargarProducto() {
  const { crearProducto } = useProductosStore();

  const [producto, setProducto] = useState({
    nombre: '',
    imagen: '', 
    marca: '',
    descripcion: '',
    precio_costo: '',
    precio_venta: '',
    stock: '',
    stock_min: '',
    eliminado: 0,
    idCategoria: ''
  });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await crearProducto({
        ...producto,
        precio_costo: parseFloat(producto.precio_costo),
        precio_venta: parseFloat(producto.precio_venta),
        stock: parseInt(producto.stock),
        stock_min: parseInt(producto.stock_min),
        eliminado: parseInt(producto.eliminado),
        idCategoria: parseInt(producto.idCategoria)
      });
      console.log('Producto cargado:', data);
      alert('Producto cargado con éxito');
    } catch (error) {
      console.error('Error al subir el producto:', error);
      alert('Error al cargar el producto');
    }
  };

  return (
    <div className="col-md-6 mx-auto">
      <h2>Cargar nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input type="text" name="nombre" className="form-control" value={producto.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Imagen (URL)</label>
          <input type="text" name="imagen" className="form-control" value={producto.imagen} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Marca</label>
          <input type="text" name="marca" className="form-control" value={producto.marca} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea name="descripcion" className="form-control" value={producto.descripcion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Precio Costo</label>
          <input type="number" name="precio_costo" className="form-control" value={producto.precio_costo} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Precio Venta</label>
          <input type="number" name="precio_venta" className="form-control" value={producto.precio_venta} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Stock</label>
          <input type="number" name="stock" className="form-control" value={producto.stock} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Stock Mínimo</label>
          <input type="number" name="stock_min" className="form-control" value={producto.stock_min} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>ID Categoría</label>
          <input type="number" name="idCategoria" className="form-control" value={producto.idCategoria} onChange={handleChange} required />
        </div>
        <button className="btn btn-success w-100">Guardar Producto</button>
      </form>
    </div>
  );
}

export default CargarProducto;
