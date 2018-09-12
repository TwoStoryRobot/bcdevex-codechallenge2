import { queries, db, pgp } from './index'
import { generateUser } from '../helpers'

beforeEach(async () => {
  // Start test with a clean db state
  await db.none('TRUNCATE public.user')

  const testUser1 = generateUser({ userId: '1' })
  const testUser2 = generateUser({ userId: '2' })
  const userList = [testUser1, testUser2]
  const all = userList.map(queries.insertUser)
  await Promise.all(all)
})

afterAll(async () => {
  // Return db to clean state
  await db.none('TRUNCATE public.user')

  // Close the pgp connection
  await pgp.end()
})

test('selectAllUsers should gets all users', async () => {
  const users = await queries.selectAllUsers()
  expect(users).toHaveLength(2)
})

test('selectUserById should gets a user by ID', async () => {
  const user = await queries.selectUserById('1')

  expect(user).not.toBeNull()
  expect(user.userId).toBe('1')
})

test('insertUser should create a user record', async () => {
  const user = generateUser({ userId: '3' })

  await queries.insertUser(user)

  const users = await queries.selectAllUsers()
  const userIds = users.map(u => u.userId)
  expect(users).toHaveLength(3)
  expect(userIds).toContain('3')
})

test('updateUser should update the user details', async () => {
  const updatedUser1 = generateUser({ userId: '1', firstName: 'Test1' })
  const updatedUser2 = generateUser({ userId: '2', firstName: 'Test2' })

  await queries.updateUser(updatedUser1)
  await queries.updateUser(updatedUser2)

  const users = await queries.selectAllUsers()
  const userFirstNames = users.map(u => u.firstName)
  expect(users).toHaveLength(2)
  expect(userFirstNames).toContain('Test1')
  expect(userFirstNames).toContain('Test2')
  expect(userFirstNames).not.toContain('Test')
})

test('deleteUser should removes a user from the db', async () => {
  await queries.deleteUser('1')

  const users = await queries.selectAllUsers()
  const userIds = users.map(u => u.userId)
  expect(users).toHaveLength(1)
  expect(userIds).not.toContain('1')
})
