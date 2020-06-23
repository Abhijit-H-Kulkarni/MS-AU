package com.msau.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.msau.backend.models.Submission;
import com.msau.backend.models.SubmissionId;


public interface SubmissionRepository extends JpaRepository<Submission, SubmissionId> {
	@Query("select sum(s.score) from Submission s where s.id.uid=?1 and s.id.cid=?2")
	public Optional<Integer> getsumscore(int uid, int cid);
	
	@Query("select count(s) from Submission s where s.id.aid=?1")
	public Optional<Integer> getsubmissioncount(int aid);
	
}
