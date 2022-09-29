import axios from 'utils/axios';

class VendorReportsService {
  getVendorsTotalTransactions = (starttime, endtime) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getVendorsTotalTransactions?starttime=${starttime}&endtime=${endtime}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getVendorsTransactions = (starttime, endtime, vendorId) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getVendorsTransactions?starttime=${starttime}&endtime=${endtime}&vendorId=${vendorId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new VendorReportsService();

export default instance;
