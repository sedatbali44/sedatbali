import axios from 'utils/axios';

class RoleService {
  getRoles = () =>
    new Promise((resolve, reject) => {
      axios
        .get('api/roles')
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getRole = (id) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/roles/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  createRole = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .post(`api/roles`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updateRole = (id, obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/roles/${id}`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  deleteRole = (id) =>
    new Promise((resolve, reject) => {
      axios
        .delete(`api/roles/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new RoleService();

export default instance;
