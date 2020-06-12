package com.msau.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msau.backend.models.Location;
import com.msau.backend.repository.LocationRerpository;

@RestController
@CrossOrigin(origins="https://ms-au.herokuapp.com")
@RequestMapping("/location")
public class LocationController {
	@Autowired
	LocationRerpository locationRepository;
	
	@GetMapping("/getlocations")
	public List<String> getLocations() {
		return locationRepository.getLocations();
	}
	
	@PostMapping("/checklocation")
	public List<Location> checkLocation(String location) {
		return locationRepository.checkLocation(location);
	}
	
	@PostMapping("/incrementcount")
	public void incCount(@RequestBody String location) {
		List<Location> result = checkLocation(location);
		if(result.size()==0) {
			Location locationObj = new Location();
			locationObj.setLocation(location);
			locationObj.setCount(1);
			locationRepository.save(locationObj);
		}
		else {
			Location locationObj = result.get(0);
			locationObj.setCount(locationObj.getCount()+1);
			locationRepository.save(locationObj);
		}
	}
}
