package veterinarianApp.Service;

import java.util.List;

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

}
