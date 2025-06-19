import 'dotenv/config'

import pg from "pg"
const { Pool } = pg

export const db = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: 5432,
  host: process.env.HOST,
  database: process.env.PG_DATABASE
})

// const client = await db.connect()

// client.release()