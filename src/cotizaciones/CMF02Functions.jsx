import ClientAxios from '../config/ClientAxios';


class CMF02Functions {
  getAllItemsCliente(cliente) {
    try {
      console.log(cliente)
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }

}

export default new CMF02Functions();

