package com.msau.backend;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.controller.CourseController;
import com.msau.backend.models.Course;
import com.msau.backend.repository.CourseRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Component
public class CourseControllerTest extends CourseController {
	@Autowired
	CourseRepository courseRepo;
	
	@Test
	public void test() {
		this.getAllCourses();
		Course course = new Course();
		course.setCdescription("a");
		course.setCname("a");
		course.setLocation("a");
		course.setPrerequisites("a");
		course.setSkills("a");
		course.setTid(1);
		this.addCourse(course);
		this.updateCourse(course);
		this.getCourseById(course);
		this.getCourseByLocation("a");
		this.getSortedRating();
		this.updateRating(course);
		this.checkLocation(course);
		this.deleteCourse(course);
	}
}
