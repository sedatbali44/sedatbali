import axios from 'utils/axios';

class ArchivedOrderService {
  getOrderFromSearch = (obj) =>
    new Promise((resolve, reject) => {
      const params = new URLSearchParams(obj).toString();
      axios
        .get(`api/orders/getOrderFromSearch?${params}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new ArchivedOrderService();

export default instance;
