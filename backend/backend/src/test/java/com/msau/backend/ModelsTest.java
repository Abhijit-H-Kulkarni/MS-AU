package com.msau.backend;
import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.models.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ModelsTest {

	//	Assignment
	@Test
	public void setAidTest() {
		Assignment ass = new Assignment();
		ass.setAid(5);
		assertEquals(5,ass.getAid());
	}
	
	@Test
	public void setAssTypeTest() {
		Assignment ass = new Assignment();
		ass.setAsstype("Demo");
		assertEquals("Demo",ass.getAsstype());
	}
	
	@Test
	public void setCidTest() {
		Assignment ass = new Assignment();
		ass.setCid(2);
		assertEquals(2,ass.getCid());
	}
	
	@Test
	public void setWeight() {
		Assignment ass = new Assignment();
		ass.setWeight(5);
		assertEquals(5,ass.getWeight());
	}
	
	//	Course
	
	@Test
	public void getLocation() {
		Course course = new Course();
		course.setLocation("Bangalore");
		assertEquals("Bangalore", course.getLocation());
	}
	
	@Test
	public void getTidTest() {
		Course course = new Course();
		course.setTid(6);
		assertEquals(6, course.getTid());
	}
	
	@Test
	public void getCidTest() {
		Course course = new Course();
		course.setCid(6);
		assertEquals(6, course.getCid());
	}
	
	@Test
	public void getCdescription() {
		Course course = new Course();
		course.setCdescription("Demo");
		assertEquals("Demo", course.getCdescription());
	}
	
	@Test
	public void getSkillsTest() {
		Course course = new Course();
		course.setSkills("Demo");
		assertEquals("Demo", course.getSkills());
	}
	
	@Test
	public void getPrerequisitesTest() {
		Course course = new Course();
		course.setPrerequisites("Demo");
		assertEquals("Demo", course.getPrerequisites());
	}
	
	@Test
	public void getRating() {
		Course course = new Course();
		course.setRating(5);
		assertEquals(5, (int)course.getRating());
	}
	
	//	Location
	
	@Test
	public void setId() {
		Location loc = new Location();
		loc.setId(1);
		assertEquals(1,loc.getId());
	}
	
	@Test
	public void getLocationTest() {
		Location loc = new Location();
		loc.setLocation("Bangalore");
		assertEquals("Bangalore",loc.getLocation());
	}
	
	@Test
	public void getCount() {
		Location loc = new Location();
		loc.setCount(5);
		assertEquals(5,loc.getCount());
	}
	
	//	Rating
	
	@Test
	public void getRatingTest() {
		Rating rating = new Rating();
		rating.setRating(5);
		assertEquals(5, rating.getRating());
	}
	
	//	Submission
	
	@Test
	public void getIdTest() {
		Submission submission = new Submission();
		SubmissionId id = new SubmissionId();
		id.setAid(4);
		id.setCid(4);
		id.setUid(4);
		submission.setId(id);
		assertEquals(id,submission.getId());
	}
	
	@Test
	public void getScoreTest() {
		Submission submission = new Submission();
		submission.setScore(5);
		assertEquals(5, submission.getScore());
	}
	
	//  Trainer
	
	@Test
	public void getDesignationTest() {
		Trainer trainer = new Trainer();
		trainer.setDesignation("Demo");
		assertEquals("Demo", trainer.getDesignation());
	}
	
	@Test
	public void getSpecialities() {
		Trainer trainer = new Trainer();
		trainer.setSpecialities("Demo");
		assertEquals("Demo", trainer.getSpecialities());
	}
	
	@Test
	public void getEmail() {
		Trainer trainer = new Trainer();
		trainer.setEmail("Demo");
		assertEquals("Demo", trainer.getEmail());
	}
	
	//	User
	
	public void getUnameTest() {
		User user = new User();
		user.setUname("Demo");
		assertEquals("Demo",user.getUname());
	}
	
	public void getPswTest() {
		User user = new User();
		user.setPsw("Demo");
		assertEquals("Demo",user.getPsw());
	}
}
