import { Request, Response } from "express";
import { EventPayload } from "../types";
import { getUserPreferences, isWithinDND } from "../utils/dnd";
import { eventSchema } from "../validators/eventValidator";

export const processEvent = (req: Request, res: Response) => {
  const { error, value } = eventSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const event = value as EventPayload;
  const prefs = getUserPreferences(event.userId);

  if (!prefs) {
    return res.status(404).json({ decision: "DO_NOT_NOTIFY", reason: "NO_PREFERENCES" });
  }

  const eventSetting = prefs.eventSettings[event.eventType];
  if (!eventSetting || !eventSetting.enabled) {
    return res.status(200).json({
      decision: "DO_NOT_NOTIFY",
      reason: "USER_UNSUBSCRIBED_FROM_EVENT"
    });
  }

  const inDND = isWithinDND(event.timestamp, prefs.dnd.start, prefs.dnd.end);
  if (inDND) {
    return res.status(200).json({
      decision: "DO_NOT_NOTIFY",
      reason: "DND_ACTIVE"
    });
  }

  return res.status(202).json({ decision: "PROCESS_NOTIFICATION" });
};
