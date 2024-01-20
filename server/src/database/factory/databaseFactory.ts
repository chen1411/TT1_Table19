import type Database from '../interface/database.interface'
import MongoDb from '../mongodb/mongodb'
import Postgres from '../postgres/postgres'
import { SupportedDatabases } from './supportedDatabases'

export function createDatabaseObject (selectedDatabase: number, connectionUrl: string): Database {
  switch (selectedDatabase) {
    case SupportedDatabases.MONGODB: {
      return new MongoDb(connectionUrl)
    }
    case SupportedDatabases.POSTGRES: {
      return new Postgres(connectionUrl)
    }
    default: {
      // statements
      return new MongoDb(connectionUrl)
    }
  }
}
