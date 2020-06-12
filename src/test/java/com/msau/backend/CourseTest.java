package com.msau.backend;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.models.Course;
import com.msau.backend.repository.CourseRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CourseTest {
	@Autowired
	CourseRepository courseRepository;
	
	@Test
	public void getCourses() {
		System.out.println("CourseTest 1");
		assertEquals(5,courseRepository.findAll().get(0).getCid());
	}
	
	@Test
	public void addCourse() {
		System.out.println("CourseTest 2");
		Course course = new Course();
		course.setCdescription("a");
		course.setCname("a");
		course.setLocation("a");
		course.setPrerequisites("a");
		course.setSkills("a");
		course.setTid(1);
		assertEquals(course,courseRepository.save(course));
		courseRepository.deleteById(course.getCid());
	}
	
	@Test
	public void getCourseByIdTest() {
		System.out.println("CourseTest 3");
		assertEquals("C",courseRepository.findById(5).get().getCname());
	}
	
	@Test
	public void getCourseByLocationTest() {
		System.out.println("CourseTest 4");
		assertEquals(5,courseRepository.checkLocation("Bangalore").get(0).getCid());
	}
	
	@Test
	public void getSortedRatingTest() {
		System.out.println("CourseTest 5");
		assertEquals(5,courseRepository.findAll(Sort.by(Sort.Direction.DESC, "rating")).get(0).getCid());
	}
}
