package veterinarianApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import veterinarianApp.Model.Owners;
import veterinarianApp.Service.OwnerService;

@Controller
public class OwnerController {
  
	@Autowired(required=true)
	private OwnerService ownerService;
	
	@GetMapping("/")
	public String viewOwnerPage(Model model) {
		model.addAttribute("listOwners", ownerService.getAllOwners());
		return "owners"; 	
	} 
	
	@GetMapping("/showNewOwnerForm")
	public String showNewOwnerForm(Model model) {
		Owners owners = new Owners();
		model.addAttribute("owners", owners);
		return "new_owner";
	}
	@PostMapping("/saveNewOwner")
	public String saveOwners (@ModelAttribute("owners") Owners owners) {
		ownerService.saveOwners(owners);
		return "redirect:/"; 
	}
}
