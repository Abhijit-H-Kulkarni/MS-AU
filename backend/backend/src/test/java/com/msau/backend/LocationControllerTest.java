package com.msau.backend;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.controller.LocationController;
import com.msau.backend.repository.LocationRerpository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Component
public class LocationControllerTest extends LocationController{
	@Autowired
	LocationRerpository locationRepository;
	
	@Test
	public void test() {
		this.getLocations();
		this.checkLocation("Bangalore");
		this.incCount("Bangalore");
		this.incCount("Agra");
	}
}
