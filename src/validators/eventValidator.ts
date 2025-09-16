import Joi from "joi";

export const eventSchema = Joi.object({
  eventId: Joi.string().required(),
  userId: Joi.string().required(),
  eventType: Joi.string().required(),
  timestamp: Joi.string().isoDate().required() // must be valid ISO datetime
});
