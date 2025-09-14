package org.ingestion.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        Logger logger = LoggerFactory.getLogger(Main.class);
        logger.info("Starting the Consumer-Service class.");
        SpringApplication.run(Main.class, args);
        System.out.println("Consumer-Service started successfully!");
    }
}
