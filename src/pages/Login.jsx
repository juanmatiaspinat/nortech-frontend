import { useAuthStore } from "../store/AuthStore"; // Ajusta el path según tu estructura
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";

function Login() {
  const { signInWithEmail } = useAuthStore();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await signInWithEmail({
      email: data.email,
      password: data.password,
    });

    if (response) {
      navigate("/"); // Redirige al home o donde quieras
    } else {
      setLoginError("Credenciales incorrectas");
    }
  };

  return (
    <div className="col-md-4 mx-auto">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="tu@email.com"
            {...register("email", { required: "Campo requerido" })}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="********"
            {...register("password", { required: "Campo requerido" })}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
