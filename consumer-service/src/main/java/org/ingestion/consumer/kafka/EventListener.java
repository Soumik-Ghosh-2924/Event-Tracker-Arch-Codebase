package org.ingestion.consumer.kafka;

import org.ingestion.consumer.dto.UIEvent;
import org.ingestion.consumer.entity.EventEntity;
import org.ingestion.consumer.repository.EventRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.ZonedDateTime;

@Service
public class EventListener {

    private final EventRepository repository;
    private final ObjectMapper objectMapper;

    // IST formatter for logging/display
    private static final DateTimeFormatter IST_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS").withZone(ZoneId.of("Asia/Kolkata"));

    public EventListener(EventRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "activity-events", groupId = "event-consumer-group")
    public void consume(UIEvent uiEvent) {
        try {
            EventEntity e = new EventEntity();

            e.setEventId(uiEvent.getEventId() != null ? uiEvent.getEventId() : java.util.UUID.randomUUID().toString());
            e.setEventName(uiEvent.getEventName() != null ? uiEvent.getEventName() : "unknown");
            e.setUserId(uiEvent.getUserId());
            e.setSessionId(uiEvent.getSessionId());
            e.setClientTimestamp(uiEvent.getClientTimestamp());
            Instant serverTs = Instant.now();
            e.setServerReceivedTs(serverTs);

            repository.save(e);

            // Logging timestamps in IST
            String clientTsIST = uiEvent.getClientTimestamp() != null ?
                    IST_FORMATTER.format(uiEvent.getClientTimestamp()) : "N/A";
            String serverTsIST = IST_FORMATTER.format(serverTs);

            System.out.println("✅ Saved event: " + e.getEventName() +
                    " | clientTs(IST): " + clientTsIST +
                    " | serverTs(IST): " + serverTsIST);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

}