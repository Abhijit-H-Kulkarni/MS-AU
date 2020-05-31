package com.msau.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;
import java.util.List;

import com.msau.backend.models.Trainer;
import com.msau.backend.repository.TrainerRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/trainer")
public class TrainerController {
	@Autowired
	private TrainerRepository trainerRepository;
	
	@GetMapping("/getalltrainers")
	public List<Trainer> getAllTrainers() {
		System.out.println("I am in");
		return trainerRepository.findAll();
	}

	@PostMapping("/findtrainer")
	public Optional<Trainer> getTrainerById(@RequestBody Trainer trainer) {
		return trainerRepository.findById(trainer.getTid());
	}
	
}
