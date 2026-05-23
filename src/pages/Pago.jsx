import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CrearVenta } from "../models/crudVentas";

export default function Pago() {
  const location = useLocation();
  const navigate = useNavigate();

  const { carrito, total } = location.state;

  const [metodoPago, setMetodoPago] = useState("Tarjeta");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("auth-storage"))?.state?.token;

  const finalizarCompra = async () => {
    try {
      const productos = carrito.map((p) => ({
        idproducto: p.id,
        cantidad: p.cantidad || 1,
        subtotal: Number(p.precio_venta) * (p.cantidad || 1),
      }));

      const data = {
        idtipofactura: 1,
        productos,
      };

      console.log("TOKEN:", token);
      console.log("DATA ENVIADA:", data);

      await CrearVenta(data, token);

      const key = `carrito_${user.email}`;
      localStorage.removeItem(key);

      alert("Compra realizada con éxito");

      navigate("/");
    } catch (error) {
      console.error("ERROR COMPLETO:", error);
      console.error("RESPONSE:", error.response);

      alert("Error al realizar la compra");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Forma de pago</h1>

      <h3>Total: ${total}</h3>

      <select
        value={metodoPago}
        onChange={(e) => setMetodoPago(e.target.value)}
      >
        <option>Tarjeta</option>
        <option>Transferencia</option>
        <option>Efectivo</option>
      </select>

      <br />
      <br />

      <button onClick={finalizarCompra}>Finalizar compra</button>
    </div>
  );
}
