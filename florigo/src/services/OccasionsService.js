import axios from 'utils/axios';

class OccasionsService {
  getOccasionsTransactions = (starttime, endtime) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getOccasionsTransactions?starttime=${starttime}&endtime=${endtime}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getOccasionTransactions = (starttime, endtime, occasionId) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getOccasionTransactions?starttime=${starttime}&endtime=${endtime}&occasionId=${occasionId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getOccasions = () =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/occasions`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  createOccasion = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .post(`api/occasions`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  deleteOccasion = (id) =>
    new Promise((resolve, reject) => {
      axios
        .delete(`api/occasions/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updateOccasionStatus = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/occasions`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new OccasionsService();

export default instance;
