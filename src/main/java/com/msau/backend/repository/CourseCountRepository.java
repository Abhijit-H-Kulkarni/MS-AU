package com.msau.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.msau.backend.models.CourseCount;

@Repository
public interface CourseCountRepository extends JpaRepository<CourseCount, Integer> {
	@Query("select c from CourseCount c where c.cid = ?1")
	public Optional<CourseCount> getCourseByCid(int cid);
}
