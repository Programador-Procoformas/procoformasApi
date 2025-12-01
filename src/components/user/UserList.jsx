
// components/UserList.js
import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import UserForm from './UserForm';
import UserTable from './UserTable';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const usersData = await UserService.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      setError('');
      setSuccess('');
      await UserService.createUser(userData);
      setSuccess('Usuario creado exitosamente');
      setShowForm(false);
      loadUsers(); // Recargar la lista
    } catch (err) {
      setError('Error al crear el usuario');
      console.error(err);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      setError('');
      setSuccess('');
      await UserService.updateUser(userData);
      setSuccess('Usuario actualizado exitosamente');
      setEditingUser(null);
      setShowForm(false);
      loadUsers(); // Recargar la lista
    } catch (err) {
      setError('Error al actualizar el usuario');
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        setError('');
        setSuccess('');
        await UserService.deleteUser(id);
        setSuccess('Usuario eliminado exitosamente');
        loadUsers(); // Recargar la lista
      } catch (err) {
        setError('Error al eliminar el usuario');
        console.error(err);
      }
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleNewUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingUser(null);
    setShowForm(false);
    setError('');
    setSuccess('');
  };

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1>👥 Gestión de Usuarios</h1>
        <button 
          className="btn btn-primary"
          onClick={handleNewUser}
        >
          ➕ Nuevo Usuario
        </button>
      </div>

      {/* Mensajes de éxito y error */}
      {error && (
        <div className="alert alert-error">
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          ✅ {success}
        </div>
      )}

      {/* Formulario de usuario */}
      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
          onCancel={handleCancelForm}
        />
      )}

      {/* Tabla de usuarios */}
      <div className="user-table-section">
        {loading ? (
          <div className="loading">🔄 Cargando usuarios...</div>
        ) : (
          <UserTable
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;