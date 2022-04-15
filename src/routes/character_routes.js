import app from 'express'
// import asyncHandler from 'express-async-handler'

import CharacterController from '../controllers/character_controller'

const routes = app.Router()

routes.get('/:id', new CharacterController().get)
routes.get('/', new CharacterController().getMultipleChar)
routes.get('/name/:name', new CharacterController().getCharByName)
routes.get('/nametwo/:name', new CharacterController().getCharByNameFromPostgres)
routes.post('/', new CharacterController().create)

export default routes
