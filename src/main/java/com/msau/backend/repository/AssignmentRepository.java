package com.msau.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.msau.backend.models.Assignment;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {
	@Query("select a from Assignment a where a.cid = ?1")
	public List<Assignment> findAllByCid(int cid);
	
	@Query("select sum(a.weight) from Assignment a where a.cid = ?1")
	public int findSumOfWeights(int cid);
	
}
