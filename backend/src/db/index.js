const pgp = require('pg-promise')()

const db = pgp({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'code_challenge',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgresadmin'
})


async function getAllUsers() {
  return await db.any('SELECT * FROM public.user')
}

async function addUser(user) {
  return await db.any('INSERT INTO public.user VALUES (${userId}, ${firstName}, ${imageUrl}, ${emailAddress}, ${lastName})', user)
}

module.exports = {
  db,
  pgp,
  getAllUsers,
  addUser
}
