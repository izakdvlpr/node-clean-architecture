import { cleanEnv, str, num } from 'envalid'

export const environment = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
    default: 'development',
  }),
  FASTIFY_SERVER_HOST: str({ default: '0.0.0.0' }),
  FASTIFY_SERVER_PORT: num({ default: 8080 }),
  JWT_TOKEN: str({ default: crypto.randomUUID() }),
  DATABASE_URL: str(),
})
