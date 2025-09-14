This service accepts JSON from your React tracker and publishes to event-consumer-group
using userId (or sessionId) as key so ordering per-user/session is preserved.

JsonSerializer will convert POJO to JSON.