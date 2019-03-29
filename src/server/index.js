import fs  from 'fs'
import debug from 'debug'
import Engine from './engine'

const logerror = debug('tetris:error')
  , loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
  const {host, port} = params
  const handler = (req, res) => {
    let file
    if (req.url === '/bundle.js')
      file = '/../../build/bundle.js'
    else if (req.url === '/fonts/midnight_drive.otf')
      file = '/../../build/fonts/midnight_drive.otf'
    else if (req.url === '/fonts/Orbitron-Regular.ttf')
      file = '/../../build/fonts/Orbitron-Regular.ttf'
    else
      file = '/../../index.html'
    //const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      res.writeHead(200)
      res.end(data)
    })
  }

  app.on('request', handler)

  app.listen({host, port}, () =>{
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}


export function create(params){
  const promise = new Promise( (resolve, reject) => {
    const app = require('http').createServer()
    initApp(app, params, () =>{
      const engine = new Engine(app)
      const stop = (cb) => {
        engine.stop()
        app.close( () => {
          app.unref()
        })
        loginfo(`Engine stopped.`)
        cb()
      }

      resolve({stop})
    })
  })
  return promise
}
