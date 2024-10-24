const envPath =
  process.env.NODE_ENV === 'development'
    ? '.env.development'
    : process.env.NODE_ENV === 'staging'
    ? '.env.staging'
    : '.env'
require('dotenv').config({ path: envPath })

const MONGO_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`
export default MONGO_URI
