package veterinarianApp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import veterinarianApp.Model.Pets;

@Repository
public interface PetRepository extends JpaRepository<Pets, Long> {

}
