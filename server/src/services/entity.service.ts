// import db
import type Database from '../database/interface/database.interface'

class EntityService {
  async createNewEntity (database: Database, params: any): Promise<any> {
    const createResult = await database.createEntity(params)
    return createResult
  }

  async getEntityById (database: Database, id: string): Promise<any> {
    const getOneResult = await database.getOneEntity(id)
    return getOneResult
  }

  async getAllEntities (database: Database, params: any): Promise<any> {
    const getAllResult = await database.getAllEntities(params)
    return getAllResult
  }

  async updateEntityById (database: Database, id: any, params: any): Promise<any> {
    const updateResult = await database.updateEntity(id, params)
    return updateResult
  }

  async deleteEntityById (database: Database, id: string): Promise<any> {
    const deleteResult = await database.deleteEntity(id)
    return deleteResult
  }
}

export default EntityService
