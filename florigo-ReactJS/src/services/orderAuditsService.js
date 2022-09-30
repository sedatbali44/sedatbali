import axios from 'utils/axios';

class OrderAuditsService {
  getEmployeeCompletedReport = (starttime, endtime, id) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getTodayCompletedReport/${starttime}/${endtime}/${id}`, { starttime, endtime, id })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getEmployeeCompletedOrders = (starttime, endtime) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getTodayCompletedOrders/${starttime}/${endtime}`, { starttime, endtime })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getTodayEmployeeCompletedReport = (starttime, endtime) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getTodayEmployeeCompletedReport?starttime=${starttime}&endtime=${endtime}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getEmployeeCompletedOrdersAudit = (starttime, endtime, id) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getEmployeeCompletedOrders?starttime=${starttime}&endtime=${endtime}&employeeId=${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new OrderAuditsService();

export default instance;
