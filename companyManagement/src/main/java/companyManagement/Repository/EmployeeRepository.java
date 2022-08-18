package companyManagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import companyManagement.Model.Employee;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
