import express from 'express'
import hbs from 'express-handlebars'
import * as Path from 'node:path'
import fsPromises from 'node:fs/promises'
import routes from './routes.js'

//Middleware

const server = express()
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))
server.use(express.urlencoded({ extended: true }))
server.use('/recipe', routes)

server.get('/', async (req, res) => {
  const recipes = await fsPromises.readFile(
    Path.resolve('server/data/recipes.json'),
    'UTF-8'
  )
  //Convert to object
  recipes = JSON.parse(recipes)
  res.render('index', recipes)
})

export default server