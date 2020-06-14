package com.msau.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import javax.transaction.Transactional;

import com.msau.backend.models.Assignment;


import com.msau.backend.repository.AssignmentRepository;

@RestController
@CrossOrigin(origins="https://ms-au-frontend.herokuapp.com")
@RequestMapping("/assignment")
public class AssignmentController {
	@Autowired
	AssignmentRepository assignmentRepository;

	@GetMapping("/getassignments")
	public List<Assignment> getAssignments() {
		return assignmentRepository.findAll();
	}
	
	@Transactional
	@PostMapping("/addassignment")
	public Assignment addAssignment(@RequestParam("imageFile") MultipartFile file, @RequestParam("assType") String asstype, @RequestParam("weight") int weight,@RequestParam("cid") int cid) {
		Assignment assignment = new Assignment();
		assignment.setAsstype(asstype);
		assignment.setCid(cid);
		assignment.setWeight(weight);
		try {
			assignment.setQuestion(compressBytes(file.getBytes()));
		}
		catch (IOException e) {
			System.out.println(e.getStackTrace());
		}
		return assignmentRepository.save(assignment);
	}
	
	@PostMapping("/findbyid")
	public Assignment findById(@RequestBody Assignment assignment) {
		Assignment Resassignment = new Assignment();
		Resassignment = assignmentRepository.findById(assignment.getAid()).get();
		Resassignment.setQuestion(decompressBytes(Resassignment.getQuestion()));
		return Resassignment;
	}
	
	@PostMapping("/getassignmentsbyid")
	public List<Assignment> getAssignmentsById(@RequestBody Assignment assignment) {
		return assignmentRepository.findAllByCid(assignment.getCid());
	}

	@PostMapping("/getsumofweights")
	public int getSumOfWeights(@RequestBody Assignment assignment) {
		if(!assignmentRepository.findAllByCid(assignment.getCid()).isEmpty()) {
			return assignmentRepository.findSumOfWeights(assignment.getCid());
		}
		return 0;
	}
	
	public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
      try {
           outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }
	
	public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
}
