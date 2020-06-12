package com.msau.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.msau.backend.models.Location;

@Repository
public interface LocationRerpository extends JpaRepository<Location, Integer>{
	@Query("select l from Location l where l.location=?1")
	public List<Location> checkLocation(String location);
	
	@Query("select l.location from Location l order by l.count desc")
	public List<String> getLocations();
}
