interface Database {
  connect: () => Promise<void>

  disconnect: () => Promise<void>

  createEntity: (data: any) => Promise<any>

  getOneEntity: (id: string) => Promise<any>

  getAllEntities: (params: Partial<any>) => Promise<any>

  updateEntity: (id: string, newData: Partial<any>) => Promise<any>

  deleteEntity: (id: string) => Promise<any>
}

export default Database
