export interface Preference {
  dnd: {
    start: string; 
    end: string;   
  };
  eventSettings: Record<string, { enabled: boolean }>;
}

export interface EventPayload {
  eventId: string;
  userId: string;
  eventType: string;
  timestamp: string; // ISO string
}
