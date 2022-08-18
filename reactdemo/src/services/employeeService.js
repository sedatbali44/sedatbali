import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:4050/api/v1/employees";

//http://localhost:9090/owner
// "http://localhost:4050/api/v1/employees";

class employeeService {
  getAllEmployees() {
    return axios.get(EMPLOYEE_API_BASE_URL);
  }
}

export default new employeeService();
