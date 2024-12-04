import config from '@/configs/drizzle.config'
import {client, db} from '@/server/db'
import {migrate} from 'drizzle-orm/postgres-js/migrator'

import '@/server/utils/load-env'

async function main() {
  if (config.out) {
    await migrate(db, {migrationsFolder: config.out})
    console.info(`Migrations complete`)
  }
}

main()
  .catch((e) => {
    console.error(e)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await client.end()
  })