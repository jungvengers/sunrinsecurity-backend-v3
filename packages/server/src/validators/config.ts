import Joi from 'joi';

export const ConfigValidator = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('production'),
  CORS_ORIGIN: Joi.string().default('*'),
  CORS_METHODS: Joi.string().default('GET,PUT,POST,DELETE'),
  CORS_CREDENTIALS: Joi.boolean().default(true),
  CORS_PREFLIGHT: Joi.boolean().default(false),
  CORS_OPTIONS_STATUS: Joi.number().default(204),
  SWAGGER_ENABLED: Joi.boolean(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),
  FRONTEND_URL: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_S3_BUCKET: Joi.string().required(),
  APPLICATION_START_TIME: Joi.date().iso().required(),
  APPLICATION_END_TIME: Joi.date().iso().required(),
  FORM_START_TIME: Joi.date().iso().required(),
  FORM_END_TIME: Joi.date().iso().required(),
  // ADMIN: Joi.array().items(Joi.string()).required(),
});

