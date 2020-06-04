package com.msau.backend.repository;

import javax.transaction.Transactional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.msau.backend.models.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
	@Transactional
	@Modifying
	@Query("update Course c set c.rating=?2 where c.cid = ?1")
	public void setRating(int cid, float rating);
	
	@Query("select c from Course c where c.location=?1")
	public List<Course> checkLocation(String location);
}
