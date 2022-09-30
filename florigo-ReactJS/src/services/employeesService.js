import axios from 'utils/axios';

class EmployeeService {
  getEmployees = () =>
    new Promise((resolve, reject) => {
      axios
        .get('api/employees')
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getEmployee = (id) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/employees/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  createEmployee = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .post(`api/employees`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updateEmployee = (id, obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/employees/${id}`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updatePassword = (id, obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/employees/${id}/password`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  deleteEmployee = (id) =>
    new Promise((resolve, reject) => {
      axios
        .delete(`api/employees/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getTeamMembers = (teams) =>
    new Promise((resolve, reject) => {
      axios
        .post(`api/employees/teammembers`, { teams })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getTeamMemberList = (teamId) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/${teamId}/teamlist`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new EmployeeService();

export default instance;
