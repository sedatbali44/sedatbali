import React, { Component } from 'react';
import employeeService from '../services/employeeService';

class Employee extends Component {

    state = {
        users: []
    };

    componentDidMount() {
        employeeService.getAllEmployees().then((res) => {
            this.setState({users: res.data});
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
                                    this.state.users.map(
                                        users => 
                                        <tr key = {users.id}>
                                             <td> {users.name} </td>   
                                             <td> {users.surname}</td>
                                             <td> {users.email}</td>
                                             <td> {users.phone}</td>
                                             <td> {users.department}</td>
                                            
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