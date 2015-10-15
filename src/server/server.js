import createApp from 'express'
import {createServer} from 'http'
import router from './app/router'

const app = createApp()

app.use(router)

const server = createServer(app)

server.listen(8080, error => {
  if (error) throw error

  const {port} = server.address()

  console.log(`Server listening at http://localhost:${port}`)
})
