import axios from 'utils/axios';

class ProductsService {
  createProduct = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .post(`api/products`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updateProduct = (id, obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/products`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getProducts = () =>
    new Promise((resolve, reject) => {
      axios
        .get('api/products')
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  deleteProduct = (id) =>
    new Promise((resolve, reject) => {
      axios
        .delete(`api/products/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getProduct = (id) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/products/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new ProductsService();

export default instance;
