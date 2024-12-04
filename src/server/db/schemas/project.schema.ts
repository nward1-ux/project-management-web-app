import {createId} from '@paralleldrive/cuid2'
import {relations} from 'drizzle-orm'
import {pgTable, text, varchar} from 'drizzle-orm/pg-core'

import {users} from './user.schema'

export const projects = pgTable('projects', {
  id: varchar('id', {length: 256}).primaryKey().$defaultFn(createId),
  title: varchar('name', {length: 100}).notNull(),
  description: text(),
  manager: varchar('manager_id', {length: 256}),
})

export const projectRelations = relations(projects, ({one}) => ({
  projectManager: one(users, {
    fields: [projects.manager],
    references: [users.id],
  }),
}))
