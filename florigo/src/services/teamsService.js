import axios from 'utils/axios';

class TeamsService {
  getTeams = () =>
    new Promise((resolve, reject) => {
      axios
        .get('api/teams')
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getTeam = (id) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/teams/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  createTeam = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .post(`api/teams`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  updateTeam = (id, obj) =>
    new Promise((resolve, reject) => {
      axios
        .put(`api/teams/${id}`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  deleteTeam = (id) =>
    new Promise((resolve, reject) => {
      axios
        .delete(`api/teams/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new TeamsService();

export default instance;
