package com.msau.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.msau.backend.models.Trainer;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Integer> {

}
