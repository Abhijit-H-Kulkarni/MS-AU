package com.msau.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

import javax.transaction.Transactional;

import java.util.List;

import com.msau.backend.models.Trainer;
import com.msau.backend.repository.TrainerRepository;

@RestController
@CrossOrigin(origins="https://ms-au-frontend.herokuapp.com")
@RequestMapping("/trainer")
public class TrainerController {
	@Autowired
	private TrainerRepository trainerRepository;
	
	@GetMapping("/getalltrainers")
	public List<Trainer> getAllTrainers() {
		return trainerRepository.findAll();
	}

	@PostMapping("/findtrainer")
	public Optional<Trainer> getTrainerById(@RequestBody Trainer trainer) {
		return trainerRepository.findById(trainer.getTid());
	}
	
	@Transactional
	@PostMapping("/addtrainer")
	public void addTrainer(@RequestBody Trainer trainer) {
		trainerRepository.save(trainer);
	}
	
	@PostMapping("/gettrainerbyemail")
	public Optional<Trainer> getTrainerByEmail(@RequestBody Trainer trainer) {
		return trainerRepository.getTrainerByEmail(trainer.getEmail());
	}
}
