package com.msau.backend;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.controller.TrainerController;
import com.msau.backend.models.Trainer;
import com.msau.backend.repository.TrainerRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Component
public class TrainerControllerTest extends TrainerController {
	@Autowired
	private TrainerRepository trainerRepository;
	
	@Test
	public void test() {
		this.getAllTrainers();
		Trainer trainer = new Trainer();
		trainer.setDesignation("a");
		trainer.setEmail("a");
		trainer.setSpecialities("a");
		trainer.setTname("a");
		this.getTrainerById(trainer);
		this.addTrainer(trainer);
		trainerRepository.deleteById(trainer.getTid());
	}
}
