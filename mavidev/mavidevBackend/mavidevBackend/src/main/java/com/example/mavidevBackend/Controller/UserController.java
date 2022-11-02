package com.example.mavidevBackend.Controller;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import com.example.mavidevBackend.Entity.User;
import com.example.mavidevBackend.Exception.ResourceNotFoundException;
import com.example.mavidevBackend.Repository.UserRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
	
	@Autowired
	private UserRepository userRepo;
	
	@GetMapping("/users")
	public List<User> getAllUses() {
		return userRepo.findAll(); //get All Records
	}

	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
		return userRepo.save(user);
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id) {
		Optional<User> user = userRepo.findById(id);
		return ResponseEntity.ok(user);
	}
	
	@DeleteMapping("/users/{id}")
	public  ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){ 
		User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User does not exist with id :" + id));
		userRepo.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
		
	}
}
