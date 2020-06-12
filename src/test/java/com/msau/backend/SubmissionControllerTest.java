package com.msau.backend;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import com.msau.backend.controller.SubmissionController;
import com.msau.backend.models.SubmissionId;
import com.msau.backend.repository.SubmissionRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Component
public class SubmissionControllerTest extends SubmissionController{
	@Autowired
	SubmissionRepository submissionRepository;
	
	@Test
	public void test() {
		this.getAllSubmission();
		SubmissionId submissionId = new SubmissionId();
		submissionId.setAid(4);
		submissionId.setCid(5);
		submissionId.setUid(4);
		this.getSubmissionById(submissionId);
		this.getsumofscores(submissionId);
		byte[] content = null;
		MultipartFile file = new MockMultipartFile("demo.txt","demo.txt", "text/plain", content);;
		this.Upload(file, 4, 4, 5, "5");
	}
}
