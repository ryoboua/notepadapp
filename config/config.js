require('dotenv').config()

const config = {
    env: '',
    port: '',
    mongooseDebug: '',
    jwtSecret: process.env.JWTSECRET,
    mongo: {
      host: process.env.MONGO_HOST,
      port: ''
    }
}

export default config;