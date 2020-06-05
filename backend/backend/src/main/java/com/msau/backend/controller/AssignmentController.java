package com.msau.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import com.msau.backend.models.Assignment;


import com.msau.backend.repository.AssignmentRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/assignment")
public class AssignmentController {
	@Autowired
	AssignmentRepository assignmentRepository;

	@GetMapping("/getassignments")
	public List<Assignment> getAssignments() {
		return assignmentRepository.findAll();
	}
	
	@PostMapping("/addassignment")
	public Assignment addAssignment(@RequestBody Assignment assignment) {
		return assignmentRepository.save(assignment);
	}
	
	@PostMapping("/findbyid")
	public Optional<Assignment> findById(@RequestBody Assignment assignment) {
		return assignmentRepository.findById(assignment.getAid());
	}
	
	@PostMapping("/getassignmentsbyid")
	public List<Assignment> getAssignmentsById(@RequestBody Assignment assignment) {
		return assignmentRepository.findAllByCid(assignment.getCid());
	}

	@PostMapping("/getsumofweights")
	public int getSumOfWeights(@RequestBody Assignment assignment) {
		if(!assignmentRepository.findAllByCid(assignment.getCid()).isEmpty()) {
			return assignmentRepository.findSumOfWeights(assignment.getCid());
		}
		return 0;
	}
	
}
