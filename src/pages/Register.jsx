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

  useEffect(() => {
    cargarPerfiles();
  }, []); // ← CORREGIDO

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposObligatorios = [
      formData.idperfil,
      formData.nombre.trim(),
      formData.apellido.trim(),
      formData.usuario.trim(),
      formData.contraseña.trim(),
      formData.email.trim(),
      formData.dni.trim(),
      formData.fechaNacimiento.trim(),
      formData.telefono.trim(),
    ];

    const algunCampoVacio = camposObligatorios.some(
      (campo) => campo === "" || campo === null || campo === undefined
    );

    if (algunCampoVacio) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      alert("El correo electrónico no tiene un formato válido.");
      return;
    }

    if (formData.contraseña.trim() === "") {
      alert("La contraseña no puede estar vacía.");
      return;
    }

    const fechaNacimiento = new Date(formData.fechaNacimiento);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaNacimiento > hoy) {
      alert("La fecha de nacimiento no puede ser mayor a la fecha actual.");
      return;
    }

    const dniValido = /^\d+$/.test(formData.dni) && parseInt(formData.dni) >= 0;
    const telefonoValido =
      /^\d+$/.test(formData.telefono) && parseInt(formData.telefono) >= 0;

    if (!dniValido || !telefonoValido) {
      alert(
        "Los campos numéricos (DNI y Teléfono) deben contener solo números positivos."
      );
      return;
    }

    const payload = {
      ...formData,
      idperfil: Number(formData.idperfil),
      fechanacimiento: formData.fechaNacimiento,
    };

    delete payload.fechaNacimiento;

    try {
      await crearNuevoUsuario(payload);

      alert("Usuario registrado exitosamente");

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
          >
            <option value="">Seleccione un perfil</option>
            {Array.isArray(perfiles) &&
              perfiles.map((perfil) => (
                <option key={perfil.idperfil} value={perfil.idperfil}>
                  {perfil.descripcion}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Nombre</label>
          <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Apellido</label>
          <input type="text" name="apellido" className="form-control" value={formData.apellido} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Usuario</label>
          <input type="text" name="usuario" className="form-control" value={formData.usuario} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" name="contraseña" className="form-control" value={formData.contraseña} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>DNI</label>
          <input type="number" name="dni" className="form-control" value={formData.dni} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Fecha de Nacimiento</label>
          <input type="date" name="fechaNacimiento" className="form-control" value={formData.fechaNacimiento} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Teléfono</label>
          <input type="text" name="telefono" className="form-control" value={formData.telefono} onChange={handleChange} />
        </div>

        <button className="btn btn-success btn-sm w-100" type="submit">
          Crear cuenta
        </button>
      </form>
    </div>
  );
}

export default Register;
