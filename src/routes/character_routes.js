import app from 'express'
// import asyncHandler from 'express-async-handler'

import CharacterController from '../controllers/character_controller'

const routes = app.Router()

routes.get('/listofcharacters/:numberOfChar', new CharacterController().getMultipleChar)
routes.get('/name/:name', new CharacterController().getCharByName)
routes.post('/', new CharacterController().create)

export default routes
