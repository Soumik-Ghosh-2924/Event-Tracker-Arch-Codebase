package org.ingestion.producer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UIEvent {
    private String eventId;
    private String eventName;
    private String userId;
    private String sessionId;
    private Instant clientTimestamp;
    private Map<String, Object> properties;
}
