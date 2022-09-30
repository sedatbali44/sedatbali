import axios from 'utils/axios';

class DiscountsService {
  getDiscounts = () =>
    new Promise((resolve, reject) => {
      axios
        .get('api/discounts')
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getDiscount = (id) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/discounts/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  createDiscount = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .post(`api/discounts`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updateDiscount = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/discounts`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  deleteDiscount = (id) =>
    new Promise((resolve, reject) => {
      axios
        .delete(`api/discounts/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new DiscountsService();

export default instance;
