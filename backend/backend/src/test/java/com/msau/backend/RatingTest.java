package com.msau.backend;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.models.Rating;
import com.msau.backend.models.RatingId;
import com.msau.backend.repository.RatingRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RatingTest {
	@Autowired
	RatingRepository ratingRepository;
	
	@Test
	public void findallratingsTest() {
		System.out.println("RatingTest 1");
		assertEquals(3, ratingRepository.findAll().get(0).getId().getUid());
	}
	
	@Test
	public void addratingsTest() {
		System.out.println("RatingTest 2");
		RatingId id = new RatingId();
		id.setCid(7);
		id.setUid(3);
		Rating rating = new Rating();
		rating.setId(id);
		rating.setRating(5);
		assertEquals(ratingRepository.save(rating).getId().getCid(),rating.getId().getCid());
		ratingRepository.deleteById(id);
	}
}
