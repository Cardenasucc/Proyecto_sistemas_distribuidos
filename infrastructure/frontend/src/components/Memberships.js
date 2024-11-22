import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemberships, createMembership } from '../redux/membershipSlice';
import './Memberships.css';

const MembershipsPages = () => {
  const dispatch = useDispatch();
  
  const { memberships = [], loading = false, error = null } = useSelector((state) => state.memberships || {});

  const [formData, setFormData] = useState({
    type: '',
    price: '',
    startDate: '',
    endDate: '',
  });
  const [showModal, setShowModal] = useState(false);

  // Cargar las membresías al montar el componente
  useEffect(() => {
    dispatch(fetchMemberships());
  }, [dispatch]);

  // Si hay un error, mostramos un mensaje
  if (error) return <p>Error: {error}</p>;

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const { type, price, startDate, endDate } = formData;

    // Despachar acción para crear una nueva membresía
    dispatch(createMembership({ type, price: parseFloat(price), startDate, endDate }))
      .unwrap()
      .then(() => {
        // Limpiar el formulario y cerrar el modal después de registrar una nueva membresía
        setFormData({ type: '', price: '', startDate: '', endDate: '' });
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error al crear la membresía:', error);
      });
  };

  // Método para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="memberships-container">
      <h2 className="memberships-title">Membresías</h2>
      <button className="btn-register" onClick={() => setShowModal(true)}>Registrar nueva membresía</button>
      {loading ? (
        <p>Cargando membresías...</p>
      ) : (
        <ul className="memberships-list">
          {memberships.map((membership) => (
            <li key={membership.id} className="membership-item">
              Tipo: <strong>{membership.type}</strong> - Precio: ${parseFloat(membership.price).toFixed(2)}<br />
              Fecha de Inicio: <strong>{membership.startDate}</strong> - Fecha de Fin: <strong>{membership.endDate}</strong>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2 className="form-title">Registrar nueva membresía</h2>
            <form className="membership-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="type"
                placeholder="Tipo de Membresía"
                value={formData.type}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={formData.price}
                onChange={handleChange}
                required
                className="form-input"
                min="0"
                step="0.01"
              />
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
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

export default MembershipsPages;
