import express from "express";
import bodyParser from "body-parser";
import { getPreferences, setPreferences } from "./controllers/preferences.controller";
import { processEvent } from "./controllers/events.controller";

const app = express();
app.use(bodyParser.json());

app.get("/preferences/:userId", getPreferences);
app.post("/preferences/:userId", setPreferences);
app.post("/events", processEvent);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
