import axios from "axios";

const BASE_URL = "http://localhost:3040/api/v1/users";

class UserService {
  getAllUser = () =>
    new Promise((resolve, reject) => {
      axios
        .get(BASE_URL)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getUserById = (id) =>
    new Promise((resolve, reject) => {
      axios
        .get(BASE_URL + "/" + id)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  createUser = (obj) =>
    new Promise((resolve, reject) => {
      axios
        .post(BASE_URL, obj)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new UserService();

export default instance;
