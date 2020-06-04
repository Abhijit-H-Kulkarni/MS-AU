package com.msau.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.msau.backend.models.Rating;

import java.util.List;

import com.msau.backend.repository.RatingRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/rating")
public class RatingController {
	
	CourseController courseController = new CourseController();

	@Autowired
	RatingRepository ratingRespository;
	
	@PostMapping("/addrating")
	public float addRating(@RequestBody Rating rating) {
		ratingRespository.save(rating);
		float avgRating = ratingRespository.findAvgRating(rating.getId().getUid(),rating.getId().getCid());
		return avgRating;
	}
	
	@PostMapping("/findallratings")
	public List<Rating> findAllRating(@RequestBody Rating rating) {
		return ratingRespository.findRatingById(rating.getId());
	}
}
