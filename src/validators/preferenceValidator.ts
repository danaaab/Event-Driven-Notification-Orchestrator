import Joi from "joi";

export const preferenceSchema = Joi.object({
  dnd: Joi.object({
    start: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // HH:MM format
      .required(),
    end: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // HH:MM format
      .required()
  }).required(),

  eventSettings: Joi.object().pattern(
    Joi.string(), // eventType key
    Joi.object({
      enabled: Joi.boolean().required()
    })
  )
});
