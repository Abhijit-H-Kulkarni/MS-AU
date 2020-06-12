package com.msau.backend;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.repository.LocationRerpository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LocationTest {
	@Autowired
	LocationRerpository locationRepository;
	
	@Test
	public void getLocations() {
		System.out.println("LocationTest 1");
		assertEquals("Bangalore" ,locationRepository.getLocations().get(0));
	}
	
	@Test
	public void checkLocation() {
		System.out.println("LocationTest 2");
		assertEquals(1 ,locationRepository.checkLocation("Bangalore").get(0).getId());
	}
	
}
