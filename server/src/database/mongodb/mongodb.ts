import type Database from '../interface/database.interface'
import mongoose from 'mongoose'
import { entitySchema, entityModelName } from '../../models/entity.model'

const newDocumentConfig = { new: true }

class MongoDb implements Database {
  schema: mongoose.Schema
  ModelObject: any
  connectionString: string

  constructor (connectionString: string) {
    this.schema = new mongoose.Schema(entitySchema)
    this.ModelObject = mongoose.model(entityModelName, this.schema)
    this.connectionString = connectionString
  }

  async connect (): Promise<void> {
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB database successfully!')
    })

    mongoose.connection.on('error', (err) => {
      console.error(err)
      throw new Error('Failed to connect to MongoDB database!')
    })

    await mongoose.connect(this.connectionString)
  }

  async disconnect (): Promise<void> {
    await mongoose.disconnect()
  }

  async createEntity (data: any): Promise<any> {
    const collection = new this.ModelObject(data)
    return collection.save()
  }

  async getOneEntity (_id: string): Promise<any> {
    return this.ModelObject.findOne({ _id }).exec()
  }

  async getAllEntities (params: Partial<any>): Promise<any> {
    return this.ModelObject.find({ params }).exec()
  }

  async updateEntity (_id: string, newData: Partial<any>): Promise<any> {
    return this.ModelObject.findOneAndUpdate({ _id }, newData, newDocumentConfig).exec()
  }

  async deleteEntity (_id: string): Promise<any> {
    return this.ModelObject.deleteOne({ _id }).exec()
  }
}

export default MongoDb
