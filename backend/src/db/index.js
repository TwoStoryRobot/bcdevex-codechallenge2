import pgPromise from 'pg-promise'

export const pgp = pgPromise()

export const db = pgp({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'code_challenge',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgresadmin'
})

const columnNames = '("userId", "firstName", "imageURL", "emailAddress", "lastName")'
const columnInserts = '(${userId}, ${firstName}, ${imageURL}, ${emailAddress}, ${lastName})'

async function selectAllUsers() {
  return await db.any('SELECT * FROM public.user')
}

async function selectUserById(id) {
  return await db.one(`SELECT * FROM public.user WHERE "userId" = '${id}'`)
}

async function insertUser(user) {
  await db.any(`INSERT INTO public.user VALUES ${columnInserts}`, user)
}

async function updateUser(user) {
  await db.any(`UPDATE public.user SET ${columnNames} = ${columnInserts} WHERE "userId" = '${user.userId}'`, user)
}

async function deleteUser(id) {
  await db.any(`DELETE FROM public.user WHERE "userId" = '${id}'`)
}

export const queries = {
  selectAllUsers,
  selectUserById,
  insertUser,
  updateUser,
  deleteUser
}
