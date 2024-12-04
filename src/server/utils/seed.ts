import '@/server/utils/load-env'

import type {DB} from '@/server/db'
import type {Table} from 'drizzle-orm'

import {db} from '@/server/db'
import * as schema from '@/server/db/schemas'
import * as seeds from '@/server/db/seeds'
import {sql} from 'drizzle-orm'

async function resetTable(db: DB, table: Table) {
  return db.execute(sql`truncate table ${table} restart identity cascade`)
}
async function main() {
  //reset and seed user table
  await resetTable(db, schema.users)
  await seeds.users(db)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    console.info('Seeding done!')
    process.exit(0)
  })
