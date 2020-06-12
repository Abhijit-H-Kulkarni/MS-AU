package com.msau.backend;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.controller.UserController;
import com.msau.backend.models.User;
import com.msau.backend.repository.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Component
public class UserControllerTest extends UserController{
	@Autowired
    UserRepository userRepository;
	
	@Test
	public void test() {
		this.getAllUsers();
		User user = new User();
		user.setUid(6);
		user.setEmail("a");
		user.setPsw("a");
		user.setUname("a");
		this.findUser(user);
		this.addUser(user);
		userRepository.deleteById(user.getEmail());
	}
}
