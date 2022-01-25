package veterinarianApp.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import veterinarianApp.Model.Pets;
import veterinarianApp.Repository.PetRepository;


@Service
public class PetServiceImplement  {

	@Autowired
	private PetRepository petRepository;
	

	public List<Pets> getAllPets() {
		
		return petRepository.findAll();
	}


	public void savePets(Pets pets) {
		this.petRepository.save(pets);	
	}

	
	public Pets getPetByid(long id) {
		Optional<Pets> optional = petRepository.findById(id);
		Pets pets = null;
		    if (optional.isPresent()) {
		        pets = optional.get();
		    } else {
		        throw new RuntimeException(" Invalid id :: " + id);
		    }
		    return pets;
	}

	
	public void deletePetByid(long id) {
		this.petRepository.deleteById(id);	
	}

	public List<Pets>  getPetWithKeyword(String keyword) {
		
		   return  petRepository.getPetByKeyword(keyword);
				
	    }
	
}
