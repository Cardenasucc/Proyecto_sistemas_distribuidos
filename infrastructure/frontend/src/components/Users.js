import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, createUser } from '../redux/userSlice';
import './Users.css';

const UsersPages = () => {
  const dispatch = useDispatch();

  const { users = [], status = 'idle', error = null } = useSelector((state) => state.users || {});

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Estado para mostrar/ocultar el modal
  const [showModal, setShowModal] = useState(false);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: formData.email,
      password: formData.password,
    };
    dispatch(createUser(newUser)); // Usamos el thunk para crear un nuevo usuario
    setFormData({ email: '', password: '' }); // Limpiar el formulario
    setShowModal(false); // Ocultar el modal después de registrar un nuevo usuario
  };

  // Método para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Cargar los usuarios cuando el componente se monta, solo si el estado es 'idle'
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  return (
    <div className="users-container">
      <h1 className="users-title">Lista de Usuarios registrados en nuestro gimnasio</h1>

      <button className="btn-register" onClick={() => setShowModal(true)}>
        Registrar nuevo usuario
      </button>

      {status === 'loading' && <p>Loading...</p>} {/* Mostrar mensaje mientras carga los usuarios */}

      {error && <p className="error-message">{error}</p>} {/* Mostrar errores si los hay */}

      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2 className="form-title">Registrar nuevo usuario</h2>
            <form className="user-form" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
              <button type="submit" className="form-button">
                Registrar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPages;

