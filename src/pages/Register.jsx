import { useState } from "react";

function Register() {
    const [formData, setFormData] = useState({
        idperfil: 2,
        nombre: "",
        apellido: "",
        usuario: "",
        contraseña: "",
        email: "",
        dni: "",
        fechaNacimiento: "",
        telefono: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos de registro:", formData);
        // ACA SE TENDRIA QUE HACER EL FETCH/POST AL BACKEND
        alert("Usuario registrado (simulado)");
    };

    return (
        <div className="col-md-6 mx-auto">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Perfil</label>
                    <select
                        className="form-control"
                        name="idperfil"
                        value={formData.idperfil}
                        onChange={handleChange}
                    >
                        <option value={2}>Usuario</option>
                        <option value={1}>Administrador</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="apellido"
                        className="form-control"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Usuario</label>
                    <input
                        type="text"
                        name="usuario"
                        className="form-control"
                        value={formData.usuario}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="contraseña"
                        className="form-control"
                        value={formData.contraseña}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>DNI</label>
                    <input
                        type="number"
                        name="dni"
                        className="form-control"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Fecha de Nacimiento</label>
                    <input
                        type="date"
                        name="fechaNacimiento"
                        className="form-control"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        className="form-control"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-success btn-sm w-100" type="submit">
                    Crear cuenta
                </button>
            </form>
        </div>
    );
}

export default Register;
