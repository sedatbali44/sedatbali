import axios from 'utils/axios';

class CreditCardReportsService {
  getCreditCardandOrders = (paymentCardNumber, starttime, endtime) =>
    new Promise((resolve, reject) => {
      let query = '';
      if (paymentCardNumber) {
        query += `&paymentCardNumber=${paymentCardNumber}`;
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

const instance = new CreditCardReportsService();

export default instance;
