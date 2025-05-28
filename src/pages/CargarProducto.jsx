import { useEffect, useState } from 'react';
import { useProductosStore } from "../store/ProductStore"; // Ajusta el path

function CargarProducto() {
  const { crearProducto, ObtenerCategorias, ObtenerMarcas } = useProductosStore();
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [producto, setProducto] = useState({
    nombre: '',
    imagen: '',
    idMarca: '',
    descripcion: '',
    precio_costo: '',
    precio_venta: '',
    stock: '',
    stock_min: '',
    eliminado: false,
    idCategoria: ''
  });
  
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await ObtenerCategorias();
        setCategorias(response.data); // Guardar los datos en el estado
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    const obtenerMarcas = async () => {
      try {
        const response = await ObtenerMarcas();
        setMarcas(response.data); // Guardar los datos en el estado
      } catch (error) {
        console.error("Error al obtener marcas:", error);
      }
    };

    obtenerCategorias();
    obtenerMarcas();
  }, []);

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
        idCategoria: parseInt(producto.idCategoria)
      });
      alert('Producto cargado con éxito');
    } catch (error) {
      console.error('Error al subir el producto:', error);
      alert('Error al cargar el producto');
    }
  };


  return (
    <div className="col-md-4 mx-auto">
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
        {/* DESPLEGABLE MARCAS */}
        <div className="mb-3">
          <label>Marca</label>
          <select
            name="idMarca"
            className="form-control"
            value={producto.idMarca}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una marca</option>
            {marcas.map((marca) => (
              <option key={marca.idMarca} value={marca.idMarca} >
                {marca.marca}
              </option>
            ))}
          </select>
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

        {/* DESPLEGABLE CATEGORIAS */}
        <div className="mb-3">
          <label>Categoría</label>
          <select
            name="idCategoria"
            className="form-control"
            value={producto.idCategoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria} >  {/* value es el ID */}
                {categoria.descripcion}  {/* Esto solo es lo que se muestra */}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-success w-100">Guardar Producto</button>
      </form>
    </div>
  );
}

export default CargarProducto;
