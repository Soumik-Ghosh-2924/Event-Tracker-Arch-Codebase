package org.ingestion.consumer.repository;

import org.ingestion.consumer.entity.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<EventEntity, String> {

}
