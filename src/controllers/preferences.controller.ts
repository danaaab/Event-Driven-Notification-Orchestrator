import { Request, Response } from "express";
import { Preference } from "../types";
import { preferencesStore } from "../store";
import { preferenceSchema } from "../validators/preferenceValidator";

export const getPreferences = (req: Request, res: Response) => {
  const { userId } = req.params;
  const prefs = preferencesStore.get(userId);
  if (!prefs) {
    return res.status(404).json({ error: "User preferences not found" });
  }
  return res.json(prefs);
};

export const setPreferences = (req: Request, res: Response) => {
  const { userId } = req.params;

  const { error, value } = preferenceSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  preferencesStore.set(userId, value as Preference);
  return res.status(201).json({ message: "Preferences saved", preferences: value });
};
