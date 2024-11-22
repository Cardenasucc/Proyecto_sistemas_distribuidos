import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments, createPayment } from '../redux/paymentsSlice';
import './Payments.css';

const PaymentsPages = () => {
  const dispatch = useDispatch();
  
  const { payments = [], loading = false, error = null } = useSelector((state) => state.payments || {});

  // Estado para el formulario
  const [formData, setFormData] = useState({
    userId: '',
    orderId: '',
    amount: '',
    status: '',
  });

  // Estado para mostrar/ocultar el modal
  const [showModal, setShowModal] = useState(false);

  // Cargar pagos al montar el componente
  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario para crear un nuevo pago
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPayment = {
      userId: parseInt(formData.userId),
      orderId: parseInt(formData.orderId),
      amount: parseInt(formData.amount),
      status: formData.status,
    };
    dispatch(createPayment(newPayment)).then(() => {
      setFormData({ userId: '', orderId: '', amount: '', status: '' });
      setShowModal(false); // Ocultar el modal después de registrar un nuevo pago
    });
  };

  // Método para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="payments-container">
      <h1 className="payments-title">Lista de Pagos</h1>

      <button className="btn-register" onClick={() => setShowModal(true)}>Registrar nuevo pago</button>

      {loading && <p>Cargando pagos...</p>}
      {error && <p>Error al cargar pagos: {error}</p>}

      <ul className="payments-list">
        {payments.map(payment => (
          <li key={payment.id} className="payment-item">
            <strong>Pago ID: {payment.id}</strong> - Usuario ID: {payment.userId} - Monto: ${payment.amount} - Estado: {payment.status}
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2 className="form-title">Registrar nuevo pago</h2>
            <form className="payment-form" onSubmit={handleSubmit}>
              <input
                type="number"
                name="userId"
                placeholder="ID del Usuario"
                value={formData.userId}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="number"
                name="orderId"
                placeholder="ID del Pedido"
                value={formData.orderId}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="number"
                name="amount"
                placeholder="Monto"
                value={formData.amount}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="text"
                name="status"
                placeholder="Estado"
                value={formData.status}
                onChange={handleChange}
                required
                className="form-input"
              />
              <button type="submit" className="form-button">Registrar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPages;
