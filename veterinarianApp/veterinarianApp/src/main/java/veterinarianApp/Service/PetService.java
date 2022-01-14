package veterinarianApp.Service;

import java.util.List;

import veterinarianApp.Model.Pets;

public interface PetService {

	 List<Pets> getAllPets();
	 void savePets(Pets pets);
}
