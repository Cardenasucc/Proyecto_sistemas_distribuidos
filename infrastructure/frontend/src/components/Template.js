import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Template.css'; // Importar el archivo CSS

const Template = () => {
  const navigate = useNavigate(); // Usar useNavigate

  const handleNavigation = (path) => {
    navigate(path); // Cambiar a navigate
  };

  return (
    <div className="template-container">
      <h1 className="welcome-text">Bienvenido a Nuestro Gimnasio</h1>
      <p>¡Únete a nosotros y transforma tu vida!</p>

      <div className="navigation-container">
        <div className="navigation-box" onClick={() => handleNavigation('/users')}>
          <h2>Usuarios</h2>
          <p>Gestiona los usuarios de nuestro gimnasio.</p>
        </div>
        <div className="navigation-box" onClick={() => handleNavigation('/orders')}>
          <h2>Órdenes</h2>
          <p>Revisa y gestiona las órdenes de los usuarios.</p>
        </div>
        <div className="navigation-box" onClick={() => handleNavigation('/memberships')}>
          <h2>Membresías</h2>
          <p>Administra las diferentes membresías disponibles.</p>
        </div>
        <div className="navigation-box" onClick={() => handleNavigation('/products')}>
          <h2>Productos</h2> 
          <p>Gestiona los productos disponibles en nuestro gimnasio.</p>
        </div>
        <div className="navigation-box" onClick={() => handleNavigation('/payments')}>
          <h2>Pagos</h2>
          <p>Gestiona y revisa los pagos realizados por los usuarios.</p>
        </div>
      </div>

      <h2>Beneficios de unirte a nosotros:</h2>
      <ul className="benefits-list">
        <li>Entrenadores profesionales y certificados.</li>
        <li>Acceso a equipos de última generación.</li>
        <li>Clases grupales motivadoras.</li>
        <li>Programas personalizados de entrenamiento.</li>
        <li>Ambiente amigable y motivador.</li>
      </ul>
    </div>
  );
};

export default Template;