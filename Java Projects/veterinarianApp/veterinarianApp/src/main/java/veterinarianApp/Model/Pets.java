package veterinarianApp.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="pets")
public class Pets {
	
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)	
   private long id;
   
   @Column(name="pet_owner")
   private String owner;
   
   @Column(name="pet_type")
   private String type;
   
   @Column(name="pet_breed")
   private String breed;
   
   @Column(name="pet_age")
   private String age;
   
   @Column(name="pet_description")
   private String description;
   
   public long getId() {
	return id;
  }
   public void setId(long id) {
	this.id = id;
  }
   public String getOwner() {
	return owner;
  }
   public void setOwner(String owner) {
	this.owner = owner;
  }
  public String getType() {
	return type;
  }
  public void setType(String type) {
	this.type = type;
  }
  public String getBreed() {
	return breed;
  }
  public void setBreed(String breed) {
	this.breed = breed;
  } 
  public String getAge() {
	return age;
  }
  public void setAge(String age) {
	this.age = age;
  }
  public String getDescription() {
	return description;
  }
  public void setDescription(String description) {
	this.description = description;
  }
     
}
