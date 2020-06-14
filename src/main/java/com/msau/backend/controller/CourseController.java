package com.msau.backend.controller;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.msau.backend.models.Course;
import com.msau.backend.repository.CourseRepository;

@RestController
@CrossOrigin(origins="https://ms-au-frontend.herokuapp.com")
@RequestMapping("/course")
public class CourseController {
	@Autowired
	CourseRepository courseRepository;
	
	@GetMapping("/getcourses")
	public List<Course> getAllCourses() {
		return courseRepository.findAll();
	}
	
	@Transactional
	@PostMapping("/addcourse")
	public void addCourse(@RequestBody Course course) {
		courseRepository.save(course);
	}
	
	@Transactional
	@PostMapping("/deletecourse")
	public void deleteCourse(@RequestBody Course course) {
		courseRepository.deleteById(course.getCid());
	}
	
	@Transactional
	@PostMapping("/updatecourse")
	public void updateCourse(@RequestBody Course course) {
		courseRepository.save(course);
	}
	
	@PostMapping("/getcoursebyid")
	public Optional<Course> getCourseById(@RequestBody Course course) {
		return courseRepository.findById(course.getCid());
	}
	
	@PostMapping("/getcoursebylocation")
	public List<Course> getCourseByLocation(@RequestBody String location) {
		return courseRepository.checkLocation(location);
	}
	
	@PostMapping("/getcoursebyname")
	public Optional<Course> findCourseByName(@RequestBody String course) {
		return courseRepository.getCourseByName(course);
	}
	
	@GetMapping("/ratingtrend")
	public List<Course> getSortedRating() {
		return courseRepository.findAll(Sort.by(Sort.Direction.DESC, "rating"));
	}
	
	@Transactional
	@PostMapping("/updateRating")
	public void updateRating(@RequestBody Course course) {
		courseRepository.setRating(course.getCid(), course.getRating());
	}
	
	@PostMapping("checklocation")
	public int checkLocation(@RequestBody Course course) {
		List<Course> result = courseRepository.checkLocation(course.getLocation());
		if(result.size()==0)
			return 0;
		return 1;
	}
	
}
