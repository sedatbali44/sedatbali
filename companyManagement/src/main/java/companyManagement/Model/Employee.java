package companyManagement.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="employees")
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name="employee_name")
	private String name;
	
	@Column(name="employee_surname")
	private String surname;
	
	@Column(name="employee_email")
	private String email;
	
	@Column(name="employee_phone")
	private String phone;
	
	@Column(name="employee_position")
	private String position;
	
	public Employee() { 
		//default constructor
	}
	
	public Employee(String name, String surname, String email, String phone, String position) {
		
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.phone = phone;
		this.position = position;
		
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	
}
