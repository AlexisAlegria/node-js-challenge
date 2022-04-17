import express from 'express'
import './config/environment'
import routes from './routes'
import './models'

const app = express()
app.use(express.json())
app.use('/', routes)

const port = process.env.PORT || 5000
const startServer = () => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`API running on http://127.0.0.1:${port}/`)
    })
  }
}

startServer()

export default app
