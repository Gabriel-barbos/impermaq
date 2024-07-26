import axios from 'axios';

const API_URL = 'http://localhost:3000/api/produtos';

class ProdutoService {
  getProdutos() {
    return axios.get(API_URL);
  }

  getProdutoById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createProduto(produto) {
    return axios.post(API_URL, produto);
  }

  updateProduto(id, produto) {
    return axios.put(`${API_URL}/${id}`, produto);
  }

  deleteProduto(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new ProdutoService();
