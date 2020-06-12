package com.msau.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msau.backend.models.CourseCount;
import com.msau.backend.repository.CourseCountRepository;

@RestController
@CrossOrigin(origins="https://ms-au.herokuapp.com")
@RequestMapping("/coursecount")
public class CourseCountController {
	@Autowired
	CourseCountRepository courseCountRepository;
	
	@GetMapping("/getcoursesdesc")
	public List<CourseCount> getCourses() {
		return courseCountRepository.findAll(Sort.by(Sort.Direction.DESC, "count"));
	}
	
	@PostMapping("/incrementcount")
	public void incCount(@RequestBody CourseCount obj) {
		Optional<CourseCount> res = courseCountRepository.getCourseByCid(obj.getCid());
		if(res.isPresent()) {
			res.get().setCount(res.get().getCount()+1);
			courseCountRepository.save(res.get());
		}
		else {
			CourseCount newObj = new CourseCount();
			newObj.setCid(obj.getCid());
			newObj.setCount(1);
			courseCountRepository.save(newObj);
		}
	}
}
