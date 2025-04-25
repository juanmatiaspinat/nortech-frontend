import { useState } from 'react';


function CargarProducto() {
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        descripcion: ''
    });


    const [imagenFile, setImagenFile] = useState(null);


    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e) => {
        setImagenFile(e.target.files[0]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('descripcion', producto.descripcion);
        formData.append('imagen', imagenFile); // archivo


        try {
            const res = await fetch('http://localhost:3000/api/productos', {
                method: 'POST',
                body: formData
            });


            const data = await res.json();
            console.log('Producto cargado:', data);
            alert('Producto cargado con éxito');
        } catch (error) {
            console.error('Error al subir el producto:', error);
            alert('Error al cargar el producto');
        }
    };


    return (
        <div className="col-md-4 mx-auto">
            <h2>Cargar nuevo producto</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        value={producto.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Precio</label>
                    <input
                        type="number"
                        name="precio"
                        className="form-control"
                        value={producto.precio}
                        onChange={handleChange}
                        required
                    />
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
                    <label>Imagen (archivo)</label>
                    <input
                        type="file"
                        name="imagen"
                        className="form-control"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </div>
                <button className="btn btn-success w-100">Guardar Producto</button>
            </form>
        </div>
    );
}


export default CargarProducto;
