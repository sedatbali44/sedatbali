package veterinarianApp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import veterinarianApp.Model.Owners;

@Repository
public interface OwnerRepository extends JpaRepository<Owners, Long> {


	@Query(value="SELECT * FROM owners o WHERE o.owner_fullname LIKE %:keyword%",nativeQuery = true)
	List<Owners> getByKeyword(@Param("keyword") String keyword);

}
