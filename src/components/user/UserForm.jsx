// components/UserForm.js
import React, { useState, useEffect } from 'react';
import './UserForm.css';

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    password: '',
    name: '',
    rol: 'USER'
  });
  const [errors, setErrors] = useState({});

  // Inicializar formulario cuando el usuario cambia
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || '',
        email: user.email || '',
        password: '', // No mostrar contraseña existente
        name: user.name || '',
        rol: user.rol || 'USER'
      });
    } else {
      setFormData({
        id: '',
        email: '',
        password: '',
        name: '',
        rol: 'USER'
      });
    }
    setErrors({});
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.id) newErrors.id = 'El ID es requerido';
    if (!formData.email) newErrors.email = 'El email es requerido';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Email no válido';
    
    if (!user && !formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!formData.name) newErrors.name = 'El nombre es requerido';
    if (!formData.rol) newErrors.rol = 'El rol es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="user-form-overlay">
      <div className="user-form-container">
        <div className="user-form-header">
          <h2>{user ? '✏️ Editar Usuario' : '👤 Crear Nuevo Usuario'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="id">ID *</label>
              <input
                type="number"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className={errors.id ? 'error' : ''}
                disabled={!!user} // No permitir editar ID en modificación
              />
              {errors.id && <span className="error-message">{errors.id}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="rol">Rol *</label>
              <select
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className={errors.rol ? 'error' : ''}
              >
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
                <option value="ASESOR">Asesor</option>
              </select>
              {errors.rol && <span className="error-message">{errors.rol}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Nombre Completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Ingrese el nombre completo"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="usuario@ejemplo.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Contraseña {!user && '*'}
              {user && <span className="optional">(Opcional - dejar en blanco para no cambiar)</span>}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder={user ? "Nueva contraseña" : "Ingrese la contraseña"}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              ❌ Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {user ? '💾 Actualizar' : '✅ Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;