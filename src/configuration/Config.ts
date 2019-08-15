import * as fs from 'fs'
import * as dotenv from 'dotenv'

interface ConfigInterface {
  jwt: {
    secret: string
    expiresIn: string
  },
  typeorm: {
    host: string
    port: number
    username: string
    password: string
    database: string
  }
}

function configure(): ConfigInterface {
  const filename = `env/${process.env.NODE_ENV}.env`
  const parsedConfig = dotenv.parse(fs.readFileSync(filename))
  return {
    jwt: {
      secret: parsedConfig.JWT_SECRET || '',
      expiresIn: '60s'
    },
    typeorm: {
      host: parsedConfig.TYPEORM_HOST || '',
      port: Number.parseInt(parsedConfig.TYPEORM_PORT || '', 10),
      username: parsedConfig.TYPEORM_USERNAME || '',
      password: parsedConfig.TYPEORM_PASSWORD || '',
      database: parsedConfig.TYPEORM_DATABASE || ''
    }
  }
}

const config = configure()
export default config

