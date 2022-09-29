import axios from 'utils/axios';

class SalesAgentReportsService {
  getSalesAgentReports = (starttime, endtime) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/orders/getOrderFromSearch?starttime=${starttime}&endtime=${endtime}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new SalesAgentReportsService();

export default instance;
