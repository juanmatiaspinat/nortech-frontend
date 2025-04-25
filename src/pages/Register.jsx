function Register() {
    return (
        <div className="col-md-6 mx-auto">
            <h2>Registrarse</h2>
            <form>
                <div className="mb-3">
                    <label>Nombre</label>
                    <input type="text" className="form-control" placeholder="Tu nombre" />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="tu@email.com" />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" placeholder="********" />
                </div>
                <button className="btn btn-success w-100">Crear cuenta</button>
            </form>
        </div>
    );
}

export default Register;
