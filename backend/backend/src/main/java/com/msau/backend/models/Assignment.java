package com.msau.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "assignment")
public class Assignment {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int aid;
	
	@Column(nullable = false)
	String question;

	@Column(nullable = false)
	String asstype;
	

	@Id
	@Column(nullable = false)
	int cid;
	
	@Column(nullable = false)
	int weight;

	public int getAid() {
		return aid;
	}

	public void setAid(int aid) {
		this.aid = aid;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAsstype() {
		return asstype;
	}

	public void setAsstype(String asstype) {
		this.asstype = asstype;
	}

	public int getCid() {
		return cid;
	}

	public void setCid(Integer cid) {
		this.cid = cid;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}
	
}
