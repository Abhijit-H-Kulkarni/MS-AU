package com.msau.backend;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.controller.RatingController;
import com.msau.backend.models.Rating;
import com.msau.backend.models.RatingId;
import com.msau.backend.repository.RatingRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Component
public class RatingControllerTest extends RatingController{
	@Autowired
	RatingRepository ratingRepository;
	
	@Test
	public void test() {
		Rating rating = new Rating();
		RatingId id = new RatingId();
		id.setCid(5);
		id.setUid(3);
		rating.setId(id);
		rating.setRating(5);
		this.addRating(rating);
		this.findAllRating(rating);
		ratingRepository.deleteById(id);
	}
}
