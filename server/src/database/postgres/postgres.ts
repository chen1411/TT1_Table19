import type Database from '../interface/database.interface'
import { entitySchema, entityModelName } from '../../models/entity.model'

import pgPromise, { type IMain } from 'pg-promise'

class Postgres implements Database {
  pgp: IMain = pgPromise()
  db: any

  constructor (connectionString: string) {
    this.db = this.pgp(connectionString)
  }

  async connect (): Promise<void> {
    // You might not need a separate connect method with pg-promise.
    // Connections are managed automatically by the library.
  }

  async disconnect (): Promise<void> {
    await this.db.$pool.end()
  }

  /* eslint-disable no-template-curly-in-string */

  async createEntity (data: any): Promise<any> {
    const columns = entitySchema.obj !== undefined ? Object.keys(entitySchema.obj) : []
    const values = columns.map((column) => data[column])

    const result = await this.db.one(
        `INSERT INTO ${entityModelName}s (${columns.join(', ')}) VALUES (${columns.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`,
        values
    )

    return result
  }

  async getOneEntity (_id: string): Promise<any> {
    return this.db.oneOrNone(`SELECT * FROM ${entityModelName}s WHERE _id = $1`, [_id])
  }

  async getAllEntities (params: Partial<any>): Promise<any> {
    if (params === null || params === undefined) {
      return this.db.manyOrNone(`SELECT * FROM ${entityModelName}s`)
    }

    const condition = Object.keys(params).map((key, index) => `$${index + 1}:${key}`).join(' AND ')
    const values = Object.values(params)
    return this.db.manyOrNone(`SELECT * FROM ${entityModelName}s WHERE ${condition}`, values)
  }

  async updateEntity (_id: string, newData: Partial<any>): Promise<any> {
    const updateSet = Object.keys(newData)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ')

    const values = [_id, ...Object.values(newData)]
    return this.db.oneOrNone(
        `UPDATE ${entityModelName}s SET ${updateSet} WHERE _id = $1 RETURNING *`,
        values
    )
  }

  async deleteEntity (_id: string): Promise<any> {
    return this.db.oneOrNone(`DELETE FROM ${entityModelName}s WHERE _id = $1 RETURNING *`, [_id])
  }
}

export default Postgres
