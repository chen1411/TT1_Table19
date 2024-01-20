import express, { type Express } from 'express'
import dotenv from 'dotenv'

import EntityRouter from '../src/routes/entity.route'
import { createDatabaseObject } from '../src/database/factory/databaseFactory'

import type Database from '../src/database/interface/database.interface'

export const app: Express = express()

dotenv.config()

const database: Database = createDatabaseObject(Number(process.env.DATABASE_TYPE), String(process.env.DATABASE_CONNECTION_URL))
console.log(process.env.DATABASE_CONNECTION_URL)

database.connect()
  .catch((error) => {
    console.log(error)
  })
app.set('database', database)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/product/', EntityRouter)
