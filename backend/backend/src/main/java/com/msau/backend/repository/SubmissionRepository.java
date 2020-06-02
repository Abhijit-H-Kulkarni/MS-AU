package com.msau.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.msau.backend.models.Submission;
import com.msau.backend.models.SubmissionId;


public interface SubmissionRepository extends JpaRepository<Submission, SubmissionId> {
	@Query(value="select s.score from Submission s where s.id=?1",nativeQuery = true)
	public int getscore(SubmissionId id);
}
