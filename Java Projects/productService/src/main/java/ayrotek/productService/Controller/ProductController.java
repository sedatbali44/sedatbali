package ayrotek.productService.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import ayrotek.productService.Model.Product;
import ayrotek.productService.Service.ProductService;

@Controller
public class ProductController {
	
	
	@Autowired(required=true)
	private ProductService productService;
	
	
	@GetMapping("/products")
	public String viewProductPage(Model model) { 
		
		model.addAttribute("productList",productService.getAllProduct());
		return "product"; //html file
    }
	
	 @GetMapping("/showNewProductForm")
	    public String showNewEmployeeForm(Model model) {
	        // create model attribute to bind form data
	        Product product = new Product();
	        model.addAttribute("product",product);
	        return "new_product";
	    }
	
	@PostMapping("/saveProduct")
    public String saveProduct(@ModelAttribute("product") Product product) {
      
       productService.saveProduct(product);
        return "redirect:/products";
    }
	
	@GetMapping("/deleteProduct/{id}")
    public String deleteEmployee(@PathVariable(value = "id") long id) {

        this.productService.deleteProductById(id);

        return "redirect:/products";
    }

    @GetMapping("/showFormForUpdate/{id}")
    public String showFormForUpdate(@PathVariable(value = "id") long id, Model model) {

        Product product = productService.getProductById(id);
        model.addAttribute("product", product);
        return "update_product";
    }
	
}
