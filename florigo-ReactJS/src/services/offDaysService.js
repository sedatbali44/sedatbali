import axios from 'utils/axios';

class OffDaysService {
  getOffDays = () =>
    new Promise((resolve, reject) => {
      axios
        .get('api/dayOffDeliveries')
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  createOffDay = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .post(`api/dayOffDeliveries`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  deleteOffDay = (id) =>
    new Promise((resolve, reject) => {
      axios
        .delete(`api/dayOffDeliveries/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updateOffDayStatus = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/dayOffDeliveries`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new OffDaysService();

export default instance;
