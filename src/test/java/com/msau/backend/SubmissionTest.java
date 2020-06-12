package com.msau.backend;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.msau.backend.models.SubmissionId;
import com.msau.backend.repository.SubmissionRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SubmissionTest {
	@Autowired
	SubmissionRepository submissionRepository;
	
	@Test
	public void getAllSubmissionTest() {
		System.out.println("SubmissionTest 1");
		assertEquals(4,submissionRepository.findAll().get(0).getId().getAid());
	}
	
	@Test
	public void getSubmissionById() {
		System.out.println("SubmissionTest 2");
		SubmissionId submissionId = new SubmissionId();
		submissionId.setAid(4);
		submissionId.setCid(5);
		submissionId.setUid(4);
		assertEquals(4,submissionRepository.findById(submissionId).get().getId().getAid());
	}
	
	@Test
	public void deleteByIdTest() {
		System.out.println("SubmissionTest 3");
		SubmissionId submissionId = new SubmissionId();
		submissionId.setAid(4);
		submissionId.setCid(5);
		submissionId.setUid(4);
		assertEquals(4, submissionId.getAid());
	}
	
	@Test
	public void getsumofscores() {
		System.out.println("SubmissionTest 4");
		SubmissionId submissionId = new SubmissionId();
		submissionId.setCid(5);
		submissionId.setUid(4);
		assertEquals(5, submissionRepository.getsumscore(submissionId.getUid(), submissionId.getCid()).get().intValue());
	}
	
	
}
