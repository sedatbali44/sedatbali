package veterinarianApp.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import veterinarianApp.Model.Owners;
import veterinarianApp.Repository.OwnerRepository;

@Service
public class OwnerServiceImplement implements OwnerService {

	@Autowired
	private OwnerRepository ownerRepository;
	
	@Override
	public List<Owners> getAllOwners() {
		
		return ownerRepository.findAll();
		//get All pet owners
	}

	@Override
	public void saveOwners(Owners owners) {
		this.ownerRepository.save(owners);
	}
	
  
}
