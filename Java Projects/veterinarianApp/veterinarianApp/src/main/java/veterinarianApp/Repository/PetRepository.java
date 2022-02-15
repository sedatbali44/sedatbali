package veterinarianApp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import veterinarianApp.Model.Pets;

@Repository
public interface PetRepository extends JpaRepository<Pets, Long> {

	@Query(value="SELECT * FROM pets p WHERE p.pet_type LIKE  %:keyword%",nativeQuery = true)
	List<Pets> getPetByKeyword(@Param("keyword") String keyword);
}
