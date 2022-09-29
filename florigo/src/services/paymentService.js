import axios from 'utils/axios';

class Paymentservice {
  setRefund = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .put('api/payments/refund', obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new Paymentservice();

export default instance;
