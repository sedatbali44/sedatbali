package veterinarianApp.Service;

import java.util.List;
import veterinarianApp.Model.Owners;

public interface OwnerService {
   
   
   List<Owners> getAllOwners();
   void saveOwners(Owners owners);
   Owners getOwnerByid(long id);
   void deleteOwnerByid(long id);

}
