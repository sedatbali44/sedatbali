package ayrotek.productService.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ayrotek.productService.Model.Product;
import ayrotek.productService.Repository.ProductRepository;


@Service
public class ProductServiceImplement implements ProductService {

	
	@Autowired
	private ProductRepository productRepository;
	
	@Override
	public List<Product> getAllProduct() {
		
		return productRepository.findAll(); // get all products
	}

	@Override
	public void saveProduct(Product product) {
		
		this.productRepository.save(product);
		
	}

	@Override
	public void deleteProductById(long id) {
	
	  this.productRepository.deleteById(id);
	}

	@Override
	public Product getProductById(long id) {
		Optional<Product> optional = productRepository.findById(id);
		Product product = null;
		    if (optional.isPresent()) {
		        product = optional.get();
		    } else {
		        throw new RuntimeException(" Invalid id :: " + id);
		    }
		    return product;
	}

}
