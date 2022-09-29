import axios from 'utils/axios';

class TeamsService {
  getPermissions = () =>
    new Promise((resolve, reject) => {
      axios
        .get('api/permissions')
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
