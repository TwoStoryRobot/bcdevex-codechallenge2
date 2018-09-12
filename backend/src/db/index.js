import pgPromise from 'pg-promise'

export const pgp = pgPromise()

export const db = pgp({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'code_challenge',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgresadmin'
})

async function selectAllUsers() {
  return await db.any('SELECT * FROM public.user')
}

async function selectUserById(userId) {
  return await db.oneOrNone(
    'SELECT * FROM public.user WHERE "userId" = $/userId/',
    { userId }
  )
}

async function insertUser(user) {
  await db.any(
    `INSERT INTO public.user
     VALUES ($/userId/, $/firstName/, $/imageURL/, $/emailAddress/, $/lastName/)`,
    user
  )
}

async function updateUser(user) {
  await db.any(
    `UPDATE public.user
     SET
       ("userId", "firstName", "imageURL", "emailAddress", "lastName") =
       ($/userId/, $/firstName/, $/imageURL/, $/emailAddress/, $/lastName/)
     WHERE "userId" = $/userId/`,
    user
  )
}

async function deleteUser(userId) {
  await db.any('DELETE FROM public.user WHERE "userId" = $/userId/', { userId })
}

export const queries = {
  selectAllUsers,
  selectUserById,
  insertUser,
  updateUser,
  deleteUser
}
