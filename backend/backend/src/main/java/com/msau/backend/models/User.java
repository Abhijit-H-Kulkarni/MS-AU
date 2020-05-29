package com.msau.backend.models;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "users")
public class User {
	@Id
	private String email;
	
	@Column(nullable = true, updatable = false)
	private String uname;
	
	@Column(nullable = true, updatable = false)
	private String psw;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getPsw() {
		return psw;
	}

	public void setPsw(String psw) {
		this.psw = psw;
	}
	
	
	
}
