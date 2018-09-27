require('dotenv').config()

const config = {
    env: '',
    port: '',
    mongooseDebug: '',
    jwtSecret: process.env.JWTSECRET,
    mongo: {
      host: '',
      port: ''
    }
}

export default config;