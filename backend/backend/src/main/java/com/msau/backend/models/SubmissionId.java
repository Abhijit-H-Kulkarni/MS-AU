package com.msau.backend.models;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class SubmissionId implements Serializable {
	int aid;
	int uid;
	public int getAid() {
		return aid;
	}
	public void setAid(int aid) {
		this.aid = aid;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
}
