package veterinarianApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import veterinarianApp.Service.PetService;

@Controller
public class PetController {

	@Autowired
	private PetService petService;
	
	@GetMapping("/pets")
	public String viewOwnerPage(Model model) {
		model.addAttribute("listPets", petService.getAllPets());
		return "pets"; 	
	}
}
