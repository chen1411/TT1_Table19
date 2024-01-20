import express, { type Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import EntityRouter from './routes/entity.route'

import type Database from './database/interface/database.interface'
import { createDatabaseObject } from './database/factory/databaseFactory'

dotenv.config()

const app: Express = express()
const port = process.env.PORT ?? 4000 // Recommended: change default port, do not use 4000, 4001 and 4002

const database: Database = createDatabaseObject(Number(process.env.DATABASE_TYPE), String(process.env.DATABASE_CONNECTION_URL))

database.connect()
  .catch((error) => {
    console.log(error)
  })
app.set('database', database)

app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/product/', EntityRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
