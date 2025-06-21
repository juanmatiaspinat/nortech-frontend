import { useState, useEffect } from "react";
import { useUsuariosStore } from "../store/UserStore";

function Register() {
  const { crearNuevoUsuario, cargarPerfiles, perfiles } = useUsuariosStore();

  const [formData, setFormData] = useState({
    idperfil: "",
    nombre: "",
    apellido: "",
    usuario: "",
    contraseña: "",
    email: "",
    dni: "",
    fechaNacimiento: "",
    telefono: "",
  });

  // ⚡ Cargar perfiles al montar el componente
  useEffect(() => {
    cargarPerfiles();
  }, [cargarPerfiles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Asegura que se envíe fechanacimiento y el idperfil como número
    const payload = {
      ...formData,
      idperfil: Number(formData.idperfil),
      fechanacimiento: formData.fechaNacimiento,
    };
    delete payload.fechaNacimiento;

    try {
      const result = await crearNuevoUsuario(payload);
      alert("✅ Usuario registrado exitosamente");
      console.log("Registro exitoso:", result);

      // Limpia formulario
      setFormData({
        idperfil: "",
        nombre: "",
        apellido: "",
        usuario: "",
        contraseña: "",
        email: "",
        dni: "",
        fechaNacimiento: "",
        telefono: "",
      });

      // window.location.href = "/login"; // Opcional
    } catch (error) {
      console.error("❌ Error:", error);
      alert(error?.message || "Error al registrar usuario");
    }
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
            required
          >
            <option value="">Seleccione un perfil</option>
            {perfiles.map((perfil) => (
              <option key={perfil.idperfil} value={perfil.idperfil}>
                {perfil.nombre}
              </option>
            ))}
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
