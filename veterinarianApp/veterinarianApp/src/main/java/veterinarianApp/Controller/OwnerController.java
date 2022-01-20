package veterinarianApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import veterinarianApp.Model.Owners;
import veterinarianApp.Service.OwnerService;
import veterinarianApp.Service.OwnerServiceImplement;



@Controller
public class OwnerController {
  
	@Autowired(required=true)
	private OwnerService ownerService;
	
	@Autowired(required=true)
	private OwnerServiceImplement ownerServiceImplement;
	
	@GetMapping("/owner")
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
	@PostMapping("/saveOwner") 
	public String saveOwners (@ModelAttribute("owners") Owners owners) {
		ownerService.saveOwners(owners);
		return "redirect:/owner"; 
	}

	
	@GetMapping("/showFormForUpdate/{id}")
	public String showFormForUpdate(@PathVariable(value="id") long id,Model model) { 
		Owners owners = ownerService.getOwnerByid(id);
		model.addAttribute("owners", owners);
		return "update_owner";
	}
	//deleteOwner
	@GetMapping("/deleteOwner/{id}")
	public String deleteOwner(@PathVariable(value="id") long id) { 
		this.ownerService.deleteOwnerByid(id);
		return "redirect:/owner"; 
	}
	
	
	@GetMapping("/selectedOwner")
	public String viewOwner(Model model,String keyword) {
		if(keyword != null ) { 
			model.addAttribute("owners",ownerServiceImplement.getByKeyword(keyword));
		} else  { 
		  model.addAttribute("listOwners",ownerService.getAllOwners());
		}
		return "owners"; 	
	} 
 
	
	
}
