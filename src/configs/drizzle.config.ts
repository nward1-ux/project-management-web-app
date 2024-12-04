import type {Config} from 'drizzle-kit'

import '@/server/utils/load-env'

import {env} from '@/configs/env'

export default {
  schema: './src/server/db/schemas/index.ts',
  out: './db-migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config