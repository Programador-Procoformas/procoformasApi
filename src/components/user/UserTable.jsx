// components/UserTable.js
import React from 'react';
import './UserTable.css';

const UserTable = ({ users, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  const getStatusBadge = (estado) => {
    switch (estado) {
      case '1':
      case 'ACTIVO':
        return <span className="badge badge-success">🟢 Activo</span>;
      case '0':
      case 'INACTIVO':
        return <span className="badge badge-error">🔴 Inactivo</span>;
      default:
        return <span className="badge badge-warning">🟡 {estado || 'Desconocido'}</span>;
    }
  };

  const getRolBadge = (rol) => {
    const rolColors = {
      'ADMIN': 'badge-purple',
      'USER': 'badge-blue',
      'ASESOR': 'badge-green'
    };
    
    const rolIcons = {
      'ADMIN': '👑',
      'USER': '👤',
      'ASESOR': '💼'
    };

    return (
      <span className={`badge ${rolColors[rol] || 'badge-gray'}`}>
        {rolIcons[rol] || '👤'} {rol}
      </span>
    );
  };

  if (!users || users.length === 0) {
    return (
      <div className="no-users">
        <div className="no-users-icon">📝</div>
        <h3>No hay usuarios registrados</h3>
        <p>Comienza creando el primer usuario</p>
      </div>
    );
  }

  return (
    <div className="user-table-container">
      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="user-id">#{user.id}</td>
                <td className="user-name">
                  <div className="user-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  {user.name}
                </td>
                <td className="user-email">{user.email}</td>
                <td>{getRolBadge(user.rol)}</td>
                <td>{getStatusBadge(user.estado)}</td>
                <td className="user-date">{formatDate(user.createdAt)}</td>
                <td className="user-actions">
                  <button
                    className="btn btn-sm btn-edit"
                    onClick={() => onEdit(user)}
                    title="Editar usuario"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-sm btn-delete"
                    onClick={() => onDelete(user.id)}
                    title="Eliminar usuario"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-footer">
        <div className="table-info">
          Mostrando {users.length} usuario{users.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default UserTable;