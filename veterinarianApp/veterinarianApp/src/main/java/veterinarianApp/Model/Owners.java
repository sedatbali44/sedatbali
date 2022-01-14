package veterinarianApp.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="owners")
public class Owners {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long   id;
	
	@Column(name="owner_fullname")
	private String fullname;
	
	@Column(name="owner_pets")
	private String ownerPets;
	
	@Column(name="owner_phone")
	private long   phone;
	
	@Column(name="owner_email")
	private String email;
	
	@Column(name="owner_address")
	private String address;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getOwnerPets() {
		return ownerPets;
	}

	public void setOwnerPets(String ownerPets) {
		this.ownerPets = ownerPets;
	}

	public long getPhone() {
		return phone;
	}

	public void setPhone(long phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	
	
}
