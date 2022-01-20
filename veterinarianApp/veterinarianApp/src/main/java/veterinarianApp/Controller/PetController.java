package veterinarianApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import veterinarianApp.Model.Pets;
import veterinarianApp.Service.PetService;
import veterinarianApp.Service.PetServiceImplement;

@Controller
public class PetController {

	@Autowired
	private PetService petService;
	
	@Autowired
	private PetServiceImplement petServiceImpl;
	
	@GetMapping("/pets")
	public String viewOwnerPage(Model model) {
		model.addAttribute("listPets", petService.getAllPets());
		return "pets"; 	
	}
	@GetMapping("/showNewPetForm")
	public String showNewPetForm(Model model) {
		Pets pets = new Pets();
		model.addAttribute("pets", pets);
		return "new_pet";
	}
	@PostMapping("/saveNewPet")
	public String savePets (@ModelAttribute("owners") Pets pets) {
		petService.savePets(pets);
		return "redirect:/pets"; 
	}
	@GetMapping("/showFormForUpdatePet/{id}")
	public String showFormForUpdatePet(@PathVariable(value="id") long id,Model model) { 
		Pets pets= petService.getPetByid(id);
		model.addAttribute("pets",pets);
		return "update_pet";
	}
	  //delete  pet
    @GetMapping("/deletePet/{id}")
	public String deletePet(@PathVariable(value="id") long id) { 
		this.petService.deletePetByid(id);
		return "redirect:/pets"; 
	}
    
	@GetMapping("/selectedPet")
	public String viewPet(Model model,String keyword) {
		if(keyword != null ) { 
			model.addAttribute("pets",petServiceImpl.getPetByKeyword(keyword));
		} else  { 
			model.addAttribute("listPets", petService.getAllPets());
		}
		return "pets"; 	
	}
}
