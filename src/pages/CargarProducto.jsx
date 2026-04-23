import { useEffect, useState } from "react";
import { useProductosStore } from "../store/ProductStore";
import { useAuthStore } from "../store/AuthStore";
import { useSearchParams } from "react-router-dom";

function CargarProducto() {
  //HOOKS
  const { isAuthenticated, datauserAuth } = useAuthStore();

  const {
    crearProducto,
    ObtenerCategorias,
    ObtenerMarcas,
    obtenerProductoPorId,
    actualizarProducto,
  } = useProductosStore();

  const [searchParams] = useSearchParams();
  const idProducto = searchParams.get("id");
  const isEditMode = searchParams.get("editar") === "true";

  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [producto, setProducto] = useState({
    nombre: "",
    imagen: "",
    idMarca: "",
    descripcion: "",
    precio_costo: "",
    precio_venta: "",
    stock: "",
    stock_min: "",
    eliminado: false,
    idCategoria: "",
  });

  //EFFECTS
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await ObtenerCategorias();
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    const obtenerMarcas = async () => {
      try {
        const response = await ObtenerMarcas();
        setMarcas(response.data);
      } catch (error) {
        console.error("Error al obtener marcas:", error);
      }
    };

    obtenerCategorias();
    obtenerMarcas();
  }, [ObtenerCategorias, ObtenerMarcas]);

  useEffect(() => {
    if (isEditMode && idProducto) {
      const fetchProducto = async () => {
        try {
          const data = await obtenerProductoPorId(idProducto);

          setProducto({
            nombre: data.nombre || "",
            imagen: data.imagen || "",
            idMarca: data.idMarca || "",
            descripcion: data.descripcion || "",
            precio_costo: data.precio_costo || "",
            precio_venta: data.precio_venta || "",
            stock: data.stock || "",
            stock_min: data.stock_min || "",
            eliminado: data.eliminado || false,
            idCategoria: data.idCategoria || "",
          });
        } catch (error) {
          console.error("Error al cargar producto:", error);
        }
      };

      fetchProducto();
    }
  }, [isEditMode, idProducto, obtenerProductoPorId]);

  //VALIDACION DE PERMISOS
  if (!isAuthenticated || !datauserAuth?.isAdmin) {
    return (
      <div>
        <h2>No tienes permiso para acceder a esta sección.</h2>
      </div>
    );
  }

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposObligatorios = [
      producto.nombre.trim(),
      producto.imagen.trim(),
      producto.idMarca,
      producto.precio_costo,
      producto.precio_venta,
      producto.stock,
      producto.stock_min,
      producto.idCategoria,
    ];

    const camposNumericos = [
      producto.precio_costo,
      producto.precio_venta,
      producto.stock,
      producto.stock_min,
    ];

    const algunNumeroNegativo = camposNumericos.some(
      (num) => parseFloat(num) < 0,
    );

    const algunCampoInvalido = camposObligatorios.some(
      (campo) => campo === "" || campo === null || campo === undefined,
    );

    const stock = parseInt(producto.stock);
    const stockMin = parseInt(producto.stock_min);

    if (stock < stockMin) {
      alert("El stock no puede ser menor que el stock mínimo.");
      return;
    }

    if (algunNumeroNegativo) {
      alert("Los valores numéricos no pueden ser negativos.");
      return;
    }

    if (algunCampoInvalido) {
      alert("Datos inválidos, revisá e intentá de nuevo.");
      return;
    }

    try {
      const payload = {
        ...producto,
        idMarca: parseInt(producto.idMarca),
        idCategoria: parseInt(producto.idCategoria),
        precio_costo: parseFloat(producto.precio_costo),
        precio_venta: parseFloat(producto.precio_venta),
        stock: parseInt(producto.stock),
        stock_min: parseInt(producto.stock_min),
      };

      if (isEditMode) {
        await actualizarProducto(idProducto, payload);
        alert("Producto actualizado con éxito");
      } else {
        await crearProducto(payload);
        alert("Producto cargado con éxito");

        //LIMPIEZA DE FORMULARIO
        setProducto({
          nombre: "",
          imagen: "",
          idMarca: "",
          descripcion: "",
          precio_costo: "",
          precio_venta: "",
          stock: "",
          stock_min: "",
          eliminado: false,
          idCategoria: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error");
    }
  };

  return (
    <div className="col-md-4 mx-auto">
      {isEditMode ? <h2>Editar producto</h2> : <h2>Cargar nuevo producto</h2>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={producto.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Imagen (URL)</label>
          <input
            type="text"
            name="imagen"
            className="form-control"
            value={producto.imagen}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Marca</label>
          <select
            name="idMarca"
            className="form-control"
            value={producto.idMarca}
            onChange={handleChange}
          >
            <option value="">Seleccione una marca</option>
            {marcas.map((marca) => (
              <option key={marca.idMarca} value={marca.idMarca}>
                {marca.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            value={producto.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Precio Costo</label>
          <input
            type="number"
            name="precio_costo"
            className="form-control"
            value={producto.precio_costo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Precio Venta</label>
          <input
            type="number"
            name="precio_venta"
            className="form-control"
            value={producto.precio_venta}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            className="form-control"
            value={producto.stock}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Stock Mínimo</label>
          <input
            type="number"
            name="stock_min"
            className="form-control"
            value={producto.stock_min}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Categoría</label>
          <select
            name="idCategoria"
            className="form-control"
            value={producto.idCategoria}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.idcategoria} value={categoria.idcategoria}>
                {categoria.descripcion}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-success btn-sm w-100">
          Guardar Producto
        </button>
      </form>
    </div>
  );
}

export default CargarProducto;
