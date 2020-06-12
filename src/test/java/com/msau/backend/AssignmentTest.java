package com.msau.backend;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.models.Assignment;
import com.msau.backend.repository.AssignmentRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AssignmentTest {
	@Autowired
	AssignmentRepository assignmentRepository;
	
	@Before
	public void beforeUserService() {
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void getAssignmentByIdTest() {
		System.out.println("AssignmentTest 1");
		Assignment assignment = new Assignment();
//		assignment.setQuestion("Describe C.");
		assertEquals(assignment.getQuestion(), assignmentRepository.findById(4).get().getQuestion());
	}
	
	@Test
	public void addAssignmentTest() {
		System.out.println("AssignmentTest 2");
		Assignment assignment = new Assignment();
		assignment.setAsstype("Descriptive");
		assignment.setCid(5);
//		assignment.setQuestion("What is differnece between C and C++.");
		assignment.setWeight(5);
		assertEquals(assignmentRepository.save(assignment), assignment);
		assignmentRepository.deleteById(assignment.getAid());
	}
	
	@Test
	public void findAssignmentByCid() {
		System.out.println("AssignmentTest 3");
		Assignment assignment = new Assignment();
//		assignment.setQuestion("Write a program to reverse a list in Python.");
		assertEquals(assignment.getQuestion(), assignmentRepository.findAllByCid(7).get(0).getQuestion());
	}
	
	@Test
	public void getsumofweightsTest() {
		System.out.println("AssignmentTest 4");
		assertEquals(20, assignmentRepository.findSumOfWeights(6));
	}
	
	@Test
	public void getAssignmentsTest() {
		System.out.println("AssignmentTest 5");
		assertEquals("Describe C.", assignmentRepository.findAll().get(0).getQuestion());
	}
	
	
}
