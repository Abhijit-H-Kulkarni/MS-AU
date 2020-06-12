package com.msau.backend.models;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "users")
public class User {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int uid;
	
	@Id
	@Column(nullable = false, updatable = false)
	private String email;
	
	@Column(nullable = true, updatable = false)
	private String uname;
	
	@Column(nullable = true, updatable = false)
	private String psw;

	public String getEmail() {
		return email;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
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
