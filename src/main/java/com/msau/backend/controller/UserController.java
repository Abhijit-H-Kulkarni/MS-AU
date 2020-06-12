package com.msau.backend.controller;

import com.msau.backend.models.User;
import com.msau.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="https://ms-au-frontend.herokuapp.com")
@RequestMapping("/user")
public class UserController {
	@Autowired
    UserRepository userRepository;
	
	@GetMapping("/getusers")
	public List<User> getAllUsers() {
	    return userRepository.findAll();
	}
	
	@PostMapping("/adduser")
	public void addUser(@RequestBody User user) {
		userRepository.save(user);
	}
	
	@PostMapping("/finduser")
	public Optional<User> findUser(@RequestBody User user) {
		return userRepository.findById(user.getEmail());
	}
	
}
