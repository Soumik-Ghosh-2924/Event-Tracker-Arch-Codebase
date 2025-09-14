package org.ingestion.producer.controller;

import org.ingestion.producer.dto.UIEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final RestTemplate restTemplate;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final String topic;

    public EventController(RestTemplate restTemplate, KafkaTemplate<String, Object> kafkaTemplate,
                           @Value("${app.topic.name}") String topic) {
        this.restTemplate = restTemplate;
        this.kafkaTemplate = kafkaTemplate;
        this.topic = topic;
    }

    @PostMapping
    public ResponseEntity<String> postEvent(@RequestBody @Validated UIEvent event) {

        String key = event.getUserId() != null ? event.getUserId() : event.getSessionId();
        kafkaTemplate.send(topic, key, event);
        return ResponseEntity.ok("published");
    }
}
