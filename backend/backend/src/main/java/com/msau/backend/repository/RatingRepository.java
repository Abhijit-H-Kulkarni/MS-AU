package com.msau.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;

import com.msau.backend.models.Rating;
import com.msau.backend.models.RatingId;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
	@Query("select avg(r.rating) from Rating r where r.id.uid=?1 and r.id.cid = ?2")
	public float findAvgRating(int uid, int cid);
	
	@Query("select r from Rating r where r.id=?1")
	public List<Rating> findRatingById(RatingId id);

}
