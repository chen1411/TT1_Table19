import Router from 'express'
import EntityController from '../controllers/entity.controller'

const EntityRouter = Router()
const entityControllerObject = new EntityController()

EntityRouter.get('/health', entityControllerObject.getHealthStatus)

// Create new app Entity
EntityRouter.post('/', entityControllerObject.createNewEntity)

// Get all app Entity
EntityRouter.get('/', entityControllerObject.getAllEntities)

// Get app Entity by id
EntityRouter.get('/:id', entityControllerObject.getEntityById)

// Update app Entity by id
EntityRouter.patch('/:id', entityControllerObject.updateEntityById)

// Get app Entity by id
EntityRouter.delete('/:id', entityControllerObject.deleteEntityById)

export default EntityRouter
