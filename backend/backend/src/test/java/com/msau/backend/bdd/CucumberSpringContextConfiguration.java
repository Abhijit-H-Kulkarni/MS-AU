package com.msau.backend.bdd;

import com.msau.backend.controller.AssignmentController;
import cucumber.api.java.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootContextLoader;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
@ContextConfiguration(classes = AssignmentController.class, loader = SpringBootContextLoader.class)
public class CucumberSpringContextConfiguration {
	private static final Logger LOG = LoggerFactory.getLogger(CucumberSpringContextConfiguration.class);
	  @Before
	  public void setUp() {
	    LOG.info("-------------- Spring Context Initialized For Executing Cucumber Tests --------------");
	  }
}
