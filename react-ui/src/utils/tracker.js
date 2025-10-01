const API_URL = "http://localhost:9096/api/events";
const DEBUG = true; // set to false in production

// Queue events if offline
const eventQueueKey = "eventQueue";

function sendEvent(eventName, properties = {}) {
  const sessionId = getSession();
  const userId = getUserId();

  const payload = {
    eventId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    eventName,
    userId,
    sessionId,
    clientTimestamp: new Date().toISOString(),
    properties,
    pageUrl: window.location.href,
    referrer: document.referrer,
  };

  try {
    // Use sendBeacon for page unload events
    if (navigator.sendBeacon && eventName === "PageUnload") {
      navigator.sendBeacon(API_URL, JSON.stringify(payload));
      return;
    }

    // Try sending immediately
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Session-Id": sessionId, "X-User-Id": userId },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to send event");
        flushQueue(); // send any queued events after successful call
      })
      .catch(() => {
        queueEvent(payload);
        if (DEBUG) console.warn("Event queued due to network issues", payload);
      });
  } catch (e) {
    queueEvent(payload);
    if (DEBUG) console.warn("sendEvent error", e);
  }
}

// Generate or retrieve session
function getSession() {
  let id = localStorage.getItem("sessionId");
  if (!id) {
    id = `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    localStorage.setItem("sessionId", id);
  }
  return id;
}

// Generate or retrieve userId
function getUserId() {
  let id = localStorage.getItem("userId");
  if (!id) {
    id = `u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    localStorage.setItem("userId", id);
  }
  return id;
}

// Queue event in localStorage
function queueEvent(event) {
  const queue = JSON.parse(localStorage.getItem(eventQueueKey) || "[]");
  queue.push(event);
  localStorage.setItem(eventQueueKey, JSON.stringify(queue));
}

// Flush queued events
function flushQueue() {
  const queue = JSON.parse(localStorage.getItem(eventQueueKey) || "[]");
  if (!queue.length) return;

  const promises = queue.map(payload =>
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Session-Id": payload.sessionId, "X-User-Id": payload.userId },
      body: JSON.stringify(payload),
    })
  );

  Promise.allSettled(promises)
    .then(results => {
      const failed = results
        .map((res, i) => (res.status === "rejected" ? queue[i] : null))
        .filter(Boolean);
      localStorage.setItem(eventQueueKey, JSON.stringify(failed));
      if (DEBUG) console.log(`Flushed events. ${queue.length - failed.length} succeeded, ${failed.length} failed.`);
    });
}

// Auto track SPA pageviews
window.addEventListener("popstate", () => sendEvent("PageView", { page: window.location.pathname }));
window.addEventListener("beforeunload", () => sendEvent("PageUnload"));

export default sendEvent;
