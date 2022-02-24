package ayrotek.productService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ayrotek.productService.Model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
