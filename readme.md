# Event-Driven Notification Orchestrator 

This project is a small Node.js/TypeScript service that manages user notification preferences and decides whether an event should trigger a notification.  


#  Features
- Manage **user preferences** (event subscriptions + Do Not Disturb window).
- Process incoming **events** and decide whether to notify.
- Correct **DND logic**, including overnight windows (e.g., 22:00 → 07:00).
- **Input validation** using Joi.
- **Unit tests** for DND logic using Jest.

---

# Setup & Run

# 1. Clone the repo

git clone https://github.com/danaaab/Event-Driven-Notification-Orchestrator.git      
cd Event-Driven Notification Orchestrator

# 2. Install dependencies
npm install

# 3. Start the server
npm run dev

Server runs at: http://localhost:3000

# API Endpoints
1. Set Preferences
POST /preferences/:userId

Body
{
  "dnd": { "start": "22:00", "end": "07:00" },
  "eventSettings": {
    "item_shipped": { "enabled": true },
    "invoice_generated": { "enabled": false }
  }
}

2. Get Preferences
GET /preferences/:userId

3. Process Event
POST /events

Body
{
  "eventId": "evt_12345",
  "userId": "usr_abcde",
  "eventType": "item_shipped",
  "timestamp": "2025-07-28T23:30:00Z"
}


Responses

Notification allowed
{ "decision": "PROCESS_NOTIFICATION" }

Blocked by DND
{ "decision": "DO_NOT_NOTIFY", "reason": "DND_ACTIVE" }

Blocked by user preference
{ "decision": "DO_NOT_NOTIFY", "reason": "USER_UNSUBSCRIBED_FROM_EVENT" }

No preferences set
{ "decision": "DO_NOT_NOTIFY", "reason": "NO_PREFERENCES" }

Example Flow

Save preferences

curl -X POST http://localhost:3000/preferences/usr_abcde \
  -H "Content-Type: application/json" \
  -d '{"dnd":{"start":"22:00","end":"07:00"},"eventSettings":{"item_shipped":{"enabled":true},"invoice_generated":{"enabled":false}}}'


Send event during DND

curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{"eventId":"evt_1","userId":"usr_abcde","eventType":"item_shipped","timestamp":"2025-07-28T23:30:00Z"}'


Response:

{
  "decision": "DO_NOT_NOTIFY",
  "reason": "DND_ACTIVE"
}

# Validation

DND times must be valid HH:MM format.

Event timestamp must be valid ISO 8601.

Invalid request example

{ "dnd": { "start": "25:99", "end": "07:00" } }


Response

{ "error": "\"dnd.start\" with value \"25:99\" fails to match the required pattern" }

# Unit Testing
Run tests
npm test


Sample Output

PASS  src/tests/dnd.test.ts
  DND Logic (22:00 → 07:00)
    ✓ blocks at 23:30
    ✓ blocks at 02:00
    ✓ allows at 21:00
    ✓ allows at 08:00
    ✓ edge case: exactly at 22:00 should be blocked
    ✓ edge case: exactly at 07:00 should be allowed
