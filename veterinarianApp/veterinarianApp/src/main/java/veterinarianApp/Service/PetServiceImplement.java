package veterinarianApp.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import veterinarianApp.Model.Pets;
import veterinarianApp.Repository.PetRepository;


@Service
public class PetServiceImplement implements PetService {

	@Autowired
	private PetRepository petRepository;
	
	@Override
	public List<Pets> getAllPets() {
		
		return petRepository.findAll();
	}

	@Override
	public void savePets(Pets pets) {
		this.petRepository.save(pets);	
	}

	@Override
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

	@Override
	public void deletePetByid(long id) {
		this.petRepository.deleteById(id);	
	}

	public List<Pets>  getPetByKeyword(String keyword) {
		
		   return  petRepository.getPetByKeyword(keyword);
				
	    }
	
}
