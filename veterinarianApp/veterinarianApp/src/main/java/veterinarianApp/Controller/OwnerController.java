package veterinarianApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import veterinarianApp.Model.Owners;
import veterinarianApp.Service.OwnerServiceImplement;
import java.util.List;


@Controller
public class OwnerController {
	
	@Autowired(required=true)
	private OwnerServiceImplement ownerServiceImplement;
	
	@GetMapping("/owner")
	public String viewOwnerPage(Model model) {
		model.addAttribute("listOwners", ownerServiceImplement.getAllOwners());
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
		ownerServiceImplement.saveOwners(owners);
		return "redirect:/owner"; 
	}

	
	@GetMapping("/showFormForUpdate/{id}")
	public String showFormForUpdate(@PathVariable(value="id") long id,Model model) { 
		Owners owners = ownerServiceImplement.getOwnerByid(id);
		model.addAttribute("owners", owners);
		return "update_owner";
	}
	//deleteOwner
	@GetMapping("/deleteOwner/{id}")
	public String deleteOwner(@PathVariable(value="id") long id) { 
		this.ownerServiceImplement.deleteOwnerByid(id);
		return "redirect:/owner"; 
	}
	
	
	@RequestMapping("/selectedOwner")
	public String viewOwner(Owners owners,Model model,String keyword) {
		if(keyword == null ) { 
		   model.addAttribute("listOwners",ownerServiceImplement.getAllOwners()); 
		} else { 
			 List<Owners> listOwners = ownerServiceImplement.getByKeyword(keyword);
			   model.addAttribute("listOwners", listOwners); 
		}
		return "owners";	
	} 
	
	
}
