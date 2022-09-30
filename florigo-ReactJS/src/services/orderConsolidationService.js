import axios from 'utils/axios';

class OrderConsolidationService {
  getDepartments = () =>
    new Promise((resolve, reject) => {
      axios
        .get('api/departments')
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getDepartment = (id) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/departments/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  createDepartment = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .post(`api/departments`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updateDepartment = (id, obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/departments/${id}`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  deleteDepartment = (id) =>
    new Promise((resolve, reject) => {
      axios
        .delete(`api/departments/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new OrderConsolidationService();

export default instance;
