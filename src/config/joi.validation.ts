import * as joi from 'joi';

export const JoiValidationSchema = joi.object({
  MONGODB: joi.required(),
  DEFAULT_LIMIT: joi.number().default(7),
});
