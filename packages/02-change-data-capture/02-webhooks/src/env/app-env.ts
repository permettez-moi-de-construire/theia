import {
  CleanedEnv,
  knownNodeEnv,
  KnownNodeEnv,
  LogLevel,
  logLevelValidator,
} from '@algar/theia-common'
import * as envalid from 'envalid'

interface AppEnv {
  NODE_ENV: KnownNodeEnv
  LOG_LEVEL: LogLevel
  PORT: number
  AMQP_URL: string
  AMQP_CONSUME_QUEUE: string
  AMQP_PUBLISH_EXCHANGE: string
  AMQP_ROUTING_KEY: string
  DATABASE_URL: string
  DATABASE_OPERATIONAL_SCHEMA: string
}

const appEnvValidators = {
  NODE_ENV: envalid.str({ choices: knownNodeEnv }),
  LOG_LEVEL: logLevelValidator(),
  PORT: envalid.port(),
  AMQP_URL: envalid.url(),
  AMQP_CONSUME_QUEUE: envalid.str(),
  AMQP_PUBLISH_EXCHANGE: envalid.str(),
  AMQP_ROUTING_KEY: envalid.str(),
  DATABASE_URL: envalid.url(),
  DATABASE_OPERATIONAL_SCHEMA: envalid.str(),
}

const getAppEnv = (env: NodeJS.ProcessEnv = process.env) => {
  const cleanedEnv = envalid.cleanEnv<AppEnv>(env, appEnvValidators)

  return { ...cleanedEnv } as CleanedEnv<AppEnv>
}

const appEnv = getAppEnv(process.env)

export { appEnv, getAppEnv }
export type { AppEnv }
