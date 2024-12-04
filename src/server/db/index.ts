import {env} from '@/configs/env'
import {drizzle} from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schemas'

const logger = env.NODE_ENV === 'development' ? true : false

const connectionString = env.DATABASE_URL

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, {prepare: false})
export const db = drizzle(client, {schema, logger})

// export const db = drizzle(client, {schema})
export type DB = typeof db
