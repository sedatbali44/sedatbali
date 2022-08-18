import React, { Component } from 'react';
import employeeService from '../services/employeeService';

class Employee extends Component {

    state = {
        employees: []
    };

    componentDidMount() {
        employeeService.getAllEmployees().then((res) => {
            this.setState({employees: res.data});
        });
    }
    render() {
        return (
            <div>
                 <h2 className="text-center">Employees List</h2>
                
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Employee  Name</th>
                                    <th> Employee Surname</th>
                                    <th> Employee Email</th>
                                    <th> Employee Phone</th>
                                    <th> Employee Position</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td> {employee.name} </td>   
                                             <td> {employee.surname}</td>
                                             <td> {employee.email}</td>
                                             <td> {employee.phone}</td>
                                             <td> {employee.position}</td>
                                            
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
            </div>
        );
    }
}

export default Employee;