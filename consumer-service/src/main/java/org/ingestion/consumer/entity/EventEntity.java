package org.ingestion.consumer.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "events")
public class EventEntity {

    @Id
    @Column(name = "event_id", length = 100)
    private String eventId;

    @Column(name = "event_name")
    private String eventName;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "session_id")
    private String sessionId;

    @Column(name = "client_ts")
    private Instant clientTimestamp;

//    @Lob
//    @Column(name = "payload", columnDefinition = "jsonb")
//    private String payload; // store full JSON

    public EventEntity(String eventId, String eventName, String userId, String sessionId, Instant clientTimestamp, Instant serverReceivedTs) {
        this.eventId = eventId;
        this.eventName = eventName;
        this.userId = userId;
        this.sessionId = sessionId;
        this.clientTimestamp = clientTimestamp;
        this.serverReceivedTs = serverReceivedTs;
    }

    public EventEntity() {}

    @Column(name = "server_received_ts")
    private Instant serverReceivedTs = Instant.now();

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public Instant getClientTimestamp() {
        return clientTimestamp;
    }

    public void setClientTimestamp(Instant clientTimestamp) {
        this.clientTimestamp = clientTimestamp;
    }

//    public String getPayload() {
//        return payload;
//    }
//
//    public void setPayload(String payload) {
//        this.payload = payload;
//    }

    public Instant getServerReceivedTs() {
        return serverReceivedTs;
    }

    public void setServerReceivedTs(Instant serverReceivedTs) {
        this.serverReceivedTs = serverReceivedTs;
    }
}
