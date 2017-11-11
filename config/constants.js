import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path: path.join(__dirname, "../.env")})

const serverPort = process.env.PORT || 4000
const baseUrl = process.env.BASE_URL || 'localhost'
const protocol = process.env.PROTOCOL || 'http'

export default {
  version: '0.0.1',
  protocol,
  serverPort,
  baseUrl,
  redisPort: process.env.REDIS_PORT || 16379,
  mongoDatabaseUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017',
  elasticSearch: {},
  staticUrl: process.env.STATIC_URL || `${protocol}://${baseUrl}:${serverPort}`,
  tokens: {
    apolloEngine: process.env.APOLLO_ENGINE_KEY,
    sentry: process.env.SENTRY_KEY,
    mollie: process.env.MOLLIE_KEY,
  },
};
