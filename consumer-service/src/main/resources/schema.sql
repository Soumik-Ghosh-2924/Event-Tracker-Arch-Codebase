-- V1__create_events_table.sql
CREATE TABLE IF NOT EXISTS events (
  event_id text PRIMARY KEY,
  event_name text,
  user_id text,
  session_id text,
  client_ts timestampz,
  payload jsonb,
  server_received_ts timestampz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_userid ON events (user_id);
CREATE INDEX IF NOT EXISTS idx_events_eventname ON events (event_name);
CREATE INDEX IF NOT EXISTS idx_events_server_ts ON events (server_received_ts);