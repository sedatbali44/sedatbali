import axios from 'utils/axios';

class RecurringReportService {
  getTeamMembers = (team, starttime, endtime) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getTeamMembers?starttime=${starttime}&endtime=${endtime}&teamId=${team}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });

  getEmployeeRefundedReports = (team, starttime, endtime) =>
    new Promise((resolve, reject) => {
      axios
        .get(`api/reports/getEmployeeRefundedReports?starttime=${starttime}&endtime=${endtime}&employeeId=${team}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
}

const instance = new RecurringReportService();

export default instance;
