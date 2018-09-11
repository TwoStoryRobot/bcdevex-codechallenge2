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

async function insertUser(user) {
  return await db.any('INSERT INTO public.user VALUES (${userId}, ${firstName}, ${imageUrl}, ${emailAddress}, ${lastName})', user)
}

export const queries = {
  selectAllUsers,
  insertUser
}