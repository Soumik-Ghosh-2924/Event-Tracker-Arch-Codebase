const API_URL = "http://localhost:9090/api/events"; // <-- change if your Spring Boot uses another port

function sendEvent(eventName, properties = {}) {
  const payload = {
    eventId: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
    eventName,
    userId: "guest",
    sessionId: localStorage.getItem("sessionId") || generateSession(),
    clientTimestamp: new Date().toISOString(),
    properties,
  };

  try {
    if (navigator.sendBeacon && eventName === "PageUnload") {
      navigator.sendBeacon(API_URL, JSON.stringify(payload));
      return;
    }
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((e) => console.warn("tracker err", e));
  } catch (e) {
    console.warn("tracker err catch", e);
  }
}

function generateSession() {
  const id = `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;
  localStorage.setItem("sessionId", id);
  return id;
}

export default sendEvent;
