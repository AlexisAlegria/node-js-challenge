import app from 'express'

import Home from './home_routes'
import Character from './character_routes'

const routes = app.Router()

routes.use('/api/v1/', Home)
routes.use('/api/v1/character', Character)

export default routes
