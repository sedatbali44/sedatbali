import axios from 'utils/axios';

class RefundReportsService {
  getRefundOrders = (reason, starttime, endtime) =>
    new Promise((resolve, reject) => {
      let query = '';
      if (reason !== null) {
        query += `&tagName=${reason}`;
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

const instance = new RefundReportsService();

export default instance;
