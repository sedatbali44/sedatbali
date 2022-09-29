import axios from 'utils/axios';

class ProfileService {
  sendEmail = (mail) =>
    new Promise((resolve, reject) => {
      axios
        .post('api/emails', mail)
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
