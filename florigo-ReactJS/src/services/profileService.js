import axios from 'utils/axios';

class ProfileService {
  setURL = (fd) =>
    new Promise((resolve, reject) => {
      axios
        .put('api/employees/self/photo', fd)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new ProfileService();

export default instance;
