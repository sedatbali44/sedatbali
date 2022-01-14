package veterinarianApp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import veterinarianApp.Model.Owners;

@Repository
public interface OwnerRepository extends JpaRepository<Owners, Long> {

}
