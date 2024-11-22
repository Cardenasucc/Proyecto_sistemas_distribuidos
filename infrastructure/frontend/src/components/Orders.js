import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, createOrder } from '../redux/orderSlice';
import './Orders.css';

const OrdersPages = () => {
  const dispatch = useDispatch();
  const { orders = [], loading = false, error = null } = useSelector((state) => state.orders || {});

  const [formData, setFormData] = useState({
    orderDate: '',
    orderItems: [{ product: '', quantity: 1 }],
  });
  const [showModal, setShowModal] = useState(false);

  // Cargar las órdenes cuando el componente se monta
  useEffect(() => {
    if (loading === false) {
      dispatch(fetchOrders());
    }
  }, [dispatch, loading]);

  // Verificar y mostrar un mensaje de error si existe
  if (error) return <p>Error: {error}</p>;

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const items = [...formData.orderItems];
    items[index] = { ...items[index], [name]: value };
    setFormData({ ...formData, orderItems: items });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      orderDate: formData.orderDate,
      items: formData.orderItems,
    };
    dispatch(createOrder(newOrder))
      .unwrap()
      .then(() => {
        setFormData({ orderDate: '', orderItems: [{ product: '', quantity: 1 }] });
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error al crear la orden:', error);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Órdenes</h2>
      <button className="btn-register" onClick={() => setShowModal(true)}>Registrar nueva orden</button>
      {loading ? (
        <p>Cargando órdenes...</p>
      ) : (
        <ul className="orders-list">
          {orders.map(order => (
            <li key={order.id} className="order-item">
              ID de Orden: <strong>{order.id}</strong>, Fecha: {order.orderDate}, Artículos: 
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.product} (Cantidad: {item.quantity})</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2 className="form-title">Registrar nueva orden</h2>
            <form className="order-form" onSubmit={handleSubmit}>
              <input
                type="date"
                name="orderDate"
                value={formData.orderDate}
                onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                required
                className="form-input"
              />
              {formData.orderItems.map((item, index) => (
                <div key={index} className="order-item-form">
                  <input
                    type="text"
                    name="product"
                    placeholder="Producto"
                    value={item.product}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="form-input"
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Cantidad"
                    value={item.quantity}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="form-input"
                    min="1"
                  />
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => setFormData({
                  ...formData,
                  orderItems: [...formData.orderItems, { product: '', quantity: 1 }]
                })} 
                className="btn-add-item"
              >
                Agregar Artículo
              </button>
              <button type="submit" className="form-button">Registrar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPages;