package com.msau.backend;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.controller.*;
import com.msau.backend.models.Assignment;
import com.msau.backend.repository.AssignmentRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Component
public class AssignmentControllerTest extends AssignmentController {
	@Autowired
	AssignmentRepository assignmentRepo;
	
	@Test
	public void getAssignmentsTest() {
		this.getAssignments();
		Assignment assignment = new Assignment();
		assignment.setAid(10);
		assignment.setAsstype("MCQ");
		assignment.setCid(5);
//		assignment.setQuestion("Demo");
		assignment.setWeight(5);
//		this.addAssignment(assignment);
		this.findById(assignment);
		this.getAssignmentsById(assignment);
		this.getSumOfWeights(assignment);
//		assignmentRepo.deleteById(assignment.getAid());
	}
}
