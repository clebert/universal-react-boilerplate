import createKoaApp from 'koa'
import {createServer} from 'http'

const app = createKoaApp()

// TODO

const server = createServer(app.callback())

server.listen(3000, '0.0.0.0', error => {
  if (error) throw error

  const {port} = server.address()

  console.log(`Server listening at http://localhost:${port}`)
})
