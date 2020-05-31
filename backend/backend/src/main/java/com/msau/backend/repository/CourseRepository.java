package com.msau.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.msau.backend.models.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

}
