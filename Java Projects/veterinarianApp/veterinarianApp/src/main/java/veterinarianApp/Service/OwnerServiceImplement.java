package veterinarianApp.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import veterinarianApp.Model.Owners;
import veterinarianApp.Repository.OwnerRepository;

@Service
public class OwnerServiceImplement  {

	@Autowired
	private OwnerRepository ownerRepository;
	
	
	public List<Owners> getByKeyword(String keyword){
		  return ownerRepository.findByKeyword(keyword);
	}
	
	public List<Owners> getAllOwners() {
		
		return ownerRepository.findAll();
		//get All pet owners
	}

	
	public void saveOwners(Owners owners) {
		this.ownerRepository.save(owners);
	}

	
	public Owners getOwnerByid(long id) {
		Optional<Owners> optional = ownerRepository.findById(id);
		Owners owners = null;
		    if (optional.isPresent()) {
		        owners = optional.get();
		    } else {
		        throw new RuntimeException(" Invalid id :: " + id);
		    }
		    return owners;
     }

	
	public void deleteOwnerByid(long id) {
		this.ownerRepository.deleteById(id);
		
	}
	
  	
}

