package com.msau.backend.models;

import java.io.IOException;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import com.msau.backend.models.SubmissionId;



import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "submission")
public class Submission {
	@EmbeddedId SubmissionId id;
	
	@Column(name = "solution", length = 1000)
	private byte[] solution;
	
	@Column(name = "score")
	private int score;

	public SubmissionId getId() {
		return id;
	}

	public void setId(SubmissionId id) {
		this.id = id;
	}

	public byte[] getSolution() {
		return solution;
	}

	public void setSolution(byte[] solution) {
		this.solution = solution;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	
}
