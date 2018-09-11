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

module.exports = {
  db,
  pgp,
  getAllUsers
}
