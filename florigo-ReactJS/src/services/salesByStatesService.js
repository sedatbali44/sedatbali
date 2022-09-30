import axios from 'utils/axios';

class SalesByStatesService {
  getStateandOrders = (state, starttime, endtime) =>
    new Promise((resolve, reject) => {
      let query = '';
      if (state !== null) {
        query += `&customerState=${state}`;
      }
      axios
        .get(`api/orders/getOrderFromSearch?starttime=${starttime}&endtime=${endtime}${query}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new SalesByStatesService();

export default instance;
