import axios from 'utils/axios';

class ReportsService {
  getBankTotalTransactions = (starttime, endtime) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getBankTotalTransactions?starttime=${starttime}&endtime=${endtime}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getBankTransactions = (starttime, endtime, bankId) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getBankTransactions?starttime=${starttime}&endtime=${endtime}&bankId=${bankId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getDailyReports = (starttime, endtime) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getDailyReports?starttime=${starttime}&endtime=${endtime}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getTagTransactions = (tag, starttime, endtime) =>
    new Promise((resolve, reject) => {
      let query = '';
      if (tag !== null) {
        query += `&tagName=${tag}`;
      }
      axios
        .get(`api/reports/getTagTransactions?starttime=${starttime}&endtime=${endtime}${query}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getTransactionsBank = (tag, starttime, endtime) =>
    new Promise((resolve, reject) => {
      let query = '';
      if (tag !== null) {
        query += `&bankId=${tag}`;
      }
      axios
        .get(`api/reports/getBankTransactions?starttime=${starttime}&endtime=${endtime}${query}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getOccasionTransactions = (tag, starttime, endtime) =>
    new Promise((resolve, reject) => {
      let query = '';
      if (tag !== null) {
        query += `&occasionId=${tag}`;
      }
      axios
        .get(`api/reports/getOccasionTransactions?starttime=${starttime}&endtime=${endtime}${query}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getVendorTransactions = (tag, starttime, endtime) =>
    new Promise((resolve, reject) => {
      let query = '';
      if (tag !== null) {
        query += `&vendorId=${tag}`;
      }
      axios
        .get(`api/reports/getVendorsTransactions?starttime=${starttime}&endtime=${endtime}${query}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getTimeZoneTransactions = (tag, starttime, endtime) =>
    new Promise((resolve, reject) => {
      let query = '';
      if (tag !== null) {
        query += `&customerTimezone=${tag}`;
      }
      axios
        .get(`api/reports/getTimezonesTransactions?starttime=${starttime}&endtime=${endtime}${query}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new ReportsService();

export default instance;
