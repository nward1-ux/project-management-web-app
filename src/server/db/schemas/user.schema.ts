import {createId} from '@paralleldrive/cuid2'
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const userRoles = pgEnum('user_roles', [
  'admin',
  'manager',
  'developer',
  'member',
])

export const users = pgTable('users', {
  id: varchar('id', {length: 256})
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', {length: 100}).notNull(),
  email: varchar('email', {length: 255}).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: userRoles('role').notNull().default('member'),
  isDisabled: boolean('is_disabeld').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type UserInfo = Pick<User, 'id' | 'name' | 'email' | 'role'>

export type User = Omit<typeof users.$inferSelect, 'createdAt' | 'updatedAt'>
export type NewUser = Omit<typeof users.$inferInsert, 'createdAt' | 'updatedAt'>