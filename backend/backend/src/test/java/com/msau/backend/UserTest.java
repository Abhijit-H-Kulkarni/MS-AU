package com.msau.backend;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.models.User;
import com.msau.backend.repository.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserTest {
	@Autowired
	UserRepository userRepository;
	
	@Test
	public void getAllUsersTest() {
		System.out.println("UserTest 1");
		assertEquals(3, userRepository.findAll().get(0).getUid());
	}
	
	@Test
	public void addUser() {
		System.out.println("TrainerTest 2");
		User user = new User();
		user.setUid(6);
		user.setEmail("a");
		user.setPsw("a");
		user.setUname("a");
		assertEquals(userRepository.save(user).getUid(),user.getUid());
		userRepository.deleteById(user.getEmail());
	}
	
	@Test
	public void findUserTest() {
		System.out.println("UserTest 3");
		User user = new User();
		user.setEmail("admin@accoliteindia.com");
		assertEquals(3, userRepository.findById(user.getEmail()).get().getUid());
	}

}
