package com.msau.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.msau.backend.models.Trainer;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Integer> {
	@Query("select t from Trainer t where t.email=?1")
	public Optional<Trainer> getTrainerByEmail(String email);
}
