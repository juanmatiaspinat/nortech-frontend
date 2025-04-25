function Login() {
    return (
        <div className="col-md-4 mx-auto">
            <h2>Iniciar Sesión</h2>
            <form>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="tu@email.com" />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" placeholder="********" />
                </div>
                <button className="btn btn-primary w-100">Ingresar</button>
            </form>
        </div>
    );
}

export default Login;
