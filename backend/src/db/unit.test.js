const queries = require('./index')
const { db, pgp } = queries

beforeEach(async () => {
  /* Empty Test DB */
  //await db.none('TRUNCATE public.user')

  /* Create Data
   * await Promise.all(all)
   */
})

afterAll(async () => {
  /* Disconnect from pgp*/
  await pgp.end()
})

test('getAllUsers should gets all users', async () => {
  const users = await queries.getAllUsers()
  expect(users).toHaveLength(2)
})

test('** creates a user record', () => {})

test('** gets a user by ID', () => {})

test('** update the user details', () => {})

test('** removes a user from the db', () => {})
