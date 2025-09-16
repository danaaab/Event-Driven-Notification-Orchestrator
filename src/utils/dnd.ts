import { preferencesStore } from "../store";

export const getUserPreferences = (userId: string) => {
  return preferencesStore.get(userId);
};

// Check if time falls within DND window
export const isWithinDND = (timestamp: string, start: string, end: string): boolean => {
  const eventDate = new Date(timestamp);
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  const eventMinutes = eventDate.getUTCHours() * 60 + eventDate.getUTCMinutes();
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  if (startMinutes < endMinutes) {
    return eventMinutes >= startMinutes && eventMinutes < endMinutes;
  } else {
    return eventMinutes >= startMinutes || eventMinutes < endMinutes;
  }
};
