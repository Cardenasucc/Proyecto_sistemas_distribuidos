import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct } from '../redux/productsSlice';
import { fetchCategories } from '../redux/categorySlice';
import './Products.css';

const ProductsPages= () => {

  const dispatch = useDispatch();
  const { products = [], status: productStatus } = useSelector((state) => state.products || {});
  const { categories = [], status: categoryStatus } = useSelector((state) => state.categories || {});
  

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
  });

  // Estado para mostrar/ocultar el modal
  const [showModal, setShowModal] = useState(false);

  // Estado para la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState('');

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
    const newProduct = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      category: formData.category,
    };
    dispatch(addProduct(newProduct));
    setFormData({ name: '', description: '', price: '', quantity: '', category: '' }); 
    setShowModal(false); 
  };

  // Método para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Manejar el cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Cargar los productos y categorías al montar el componente
  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
    if (categoryStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [productStatus, categoryStatus, dispatch]);

  return (
    <div className="products-container">
      <div className="sidebar">
        <h2>Categorías</h2>
        <ul>
          <li onClick={() => handleCategoryChange('')}>Todas</li>
          {categories.map((category) => (
            <li key={category.id} onClick={() => handleCategoryChange(category.name)}>
              {category.name}
            </li>
          ))}
        </ul>
        <button className="btn-register" onClick={() => setShowModal(true)}>Registrar nuevo producto</button>
      </div>

      <div className="products-list">
        {productStatus === 'loading' ? (
          <p>Loading...</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Precio: ${product.price.toFixed(2)}</p>
              <p>Cantidad: {product.quantity}</p>
              <p>Categoría: {product.category}</p>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2 className="form-title">Registrar nuevo producto</h2>
            <form className="product-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Nombre del Producto"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="text"
                name="description"
                placeholder="Descripción"
                value={formData.description}
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
              />
              <input
                type="number"
                name="quantity"
                placeholder="Cantidad"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="form-input"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn-submit">Registrar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPages;
