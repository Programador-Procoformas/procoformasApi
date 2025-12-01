// services/UserService.js
import axios from 'axios';
import ClientAxios from '../config/ClientAxios';


class UserService {
  // Obtener todos los usuarios
  async getAllUsers() {
    try {
      const response = await ClientAxios.post(`users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Obtener usuario por ID
  async getUserById(id) {
    try {
      const response = await ClientAxios.post(`usersid`, null, { params: { id } });
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Crear usuario
  async createUser(userData) {
    try {
      const response = await ClientAxios.post(`crearUsuario`, null, {
        params: {
          id: userData.id,
          email: userData.email,
          password: userData.password,
          name: userData.name,
          rol: userData.rol
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Actualizar usuario
  async updateUser(userData) {
    try {
      const response = await ClientAxios.post(`usersupdate`,userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Eliminar usuario
  async deleteUser(id) {
    try {
      const response = await ClientAxios.post(`users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Obtener usuarios asesores
  async getAsesores() {
    try {
      const response = await ClientAxios.post(`users/asesores`);
      return response.data;
    } catch (error) {
      console.error('Error fetching asesores:', error);
      throw error;
    }
  }
}

export default new UserService();