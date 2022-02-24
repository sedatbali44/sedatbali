package ayrotek.productService.Service;

import java.util.List;

import ayrotek.productService.Model.Product;

public interface ProductService {
	  List <Product> getAllProduct();
	  void saveProduct(Product product);
	  void deleteProductById(long id);
	  Product getProductById(long id);
}
