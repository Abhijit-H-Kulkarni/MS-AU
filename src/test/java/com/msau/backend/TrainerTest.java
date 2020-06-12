package com.msau.backend;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.models.Trainer;
import com.msau.backend.repository.TrainerRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TrainerTest {
	@Autowired
	TrainerRepository trainerRepository;
	
	@Test
	public void getAllTrainersTest() {
		System.out.println("TrainerTest 1");
		assertEquals(1, trainerRepository.findAll().get(0).getTid());
	}
	
	@Test
	public void getTrainerByIdTest() {
		System.out.println("TrainerTest 2");
		Trainer trainer = new Trainer();
		trainer.setTid(1);
		assertEquals("Akash S Joshi", trainerRepository.findById(trainer.getTid()).get().getTname());
	}
	
	@Test
	public void addTrainerTest() {
		System.out.println("TrainerTest 3");
		Trainer trainer = new Trainer();
		trainer.setDesignation("a");
		trainer.setEmail("a");
		trainer.setSpecialities("a");
		trainer.setTname("a");
		assertEquals(trainerRepository.save(trainer),trainer);
		trainerRepository.deleteById(trainer.getTid());
	}
}
