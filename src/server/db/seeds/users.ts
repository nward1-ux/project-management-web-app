import type {DB} from '@/server/db'
import type {NewUser} from '@/server/db/schemas'

import {users} from '@/server/db/schemas'
import {hashPassword} from '@/server/utils/password-handler'
import {faker} from '@faker-js/faker'

const mockUsers = async () => {
  const data: NewUser[] = []
  //demo a standard sample admin
  const adminPassword = await hashPassword('Admin@123!')
  data.push({
    name: 'admin',
    email: 'admin@example.com',
    passwordHash: adminPassword,
    role: 'admin',
  })
  //create a demo manager
  const managerPassword = await hashPassword('Manager@123!')
  data.push({
    name: 'Manager',
    email: 'manager@example.com',
    passwordHash: managerPassword,
    role: 'manager',
  })
  //lets add 3 random managers
  for (let i = 0; i < 3; i++) {
    const firstname = faker.person.firstName()
    const lastname = faker.person.lastName()
    const name = firstname + ' ' + lastname
    const email = faker.internet.email({
      firstName: firstname,
      lastName: lastname,
      provider: 'example.com',
    })
    const password = await hashPassword(faker.internet.password())
    data.push({
      name: name,
      email: email,
      passwordHash: password,
      role: 'manager',
    })
  }
  //create a demo developer
  const developerPassword = await hashPassword('Developer@123!')
  data.push({
    name: 'Developer',
    email: 'developer@example.com',
    passwordHash: developerPassword,
    role: 'developer',
  })
  //lets add 10 random developers
  for (let i = 0; i < 10; i++) {
    const firstname = faker.person.firstName()
    const lastname = faker.person.lastName()
    const name = firstname + ' ' + lastname
    const email = faker.internet.exampleEmail({
      firstName: firstname,
      lastName: lastname,
    })
    const password = await hashPassword(faker.internet.password())
    data.push({
      name: name,
      email: email,
      passwordHash: password,
      role: 'developer',
    })
  }
  //create a demo general user
  const userPassword = await hashPassword('User@123!')
  data.push({
    name: 'User',
    email: 'user@example.com',
    passwordHash: userPassword,
    role: 'developer',
  })
  //lets add 4 random general users
  for (let i = 0; i < 4; i++) {
    const firstname = faker.person.firstName()
    const lastname = faker.person.lastName()
    const name = firstname + ' ' + lastname
    const email = faker.internet.exampleEmail({
      firstName: firstname,
      lastName: lastname,
    })
    const password = await hashPassword(faker.internet.password())
    data.push({
      name: name,
      email: email,
      passwordHash: password,
      role: 'member',
    })
  }
  return data
}

export async function seed(db: DB) {
  const data = await mockUsers()
  //just incase any of the random generated conflict, do nothing on insert
  await db.insert(users).values(data).onConflictDoNothing()
}
