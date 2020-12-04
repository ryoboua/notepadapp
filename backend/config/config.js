require('dotenv').config()
import Joi from 'joi';


// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['dev', 'prod'])
    .default('dev'),
  SERVER_PORT: Joi.number()
    .default(3030),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('dev'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  PRIVATE_KEY: Joi.string().required(),
  CERT_CERT: Joi.string().required(),
  DEMO_USER_PASSWORD: Joi.string().required(),
}).unknown()
  .required()

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST
  },
  privateKey: envVars.PRIVATE_KEY,
  certificate: envVars.CERT_CERT,
  demoUserPassword: envVars.DEMO_USER_PASSWORD,

}

module.exports = config