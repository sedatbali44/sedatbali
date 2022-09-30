import axios from 'utils/axios';

class FloristsService {
  getFlorists = () =>
    new Promise((resolve, reject) => {
      axios
        .get('api/florists')
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getFlorist = (id) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/florists/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  setFlorist = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .post(`api/florists`, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new FloristsService();

export default instance;
