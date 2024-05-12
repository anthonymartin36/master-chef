//Imports
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

//Server configuration

const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))

server.get('/', async (req, res) => {
  let recipes = await fsPromises.readFile(
    Path.resolve('server/data/recipes.json'),
    'UTF-8'
  )
  //Convert to object
  recipes = JSON.parse(recipes)
  res.render('index', recipes)
})

//creating a route for filters
server.get('/filter/:ingredient', async (req, res) => {
  let recipes = await fsPromises.readFile(
    Path.resolve('server/data/recipes.json'),
    'UTF-8'
  )
  //Convert to object
  recipes = JSON.parse(recipes).recipes
  let ingredient = req.params.ingredient.toLocaleLowerCase()
  //filters through ingredients, checks type of ingredient
  let results = recipes.filter((recipe) => {
    //return true if matches
    //one of the ingredients' types has to match
    //get the ingredient of the recipe and stick into a variable
    let currentIngredients = recipe.ingredients
    //map through the ingredients
    //create array of only the ingredient name
    currentIngredients = currentIngredients.map((ingredientObj) => {
      return ingredientObj.type.toLocaleLowerCase()
    })
    //checks if the ingredient is in that list
    //returns true if it is
    return currentIngredients.includes(ingredient)
  })
  let viewData = {
    recipes: results, //filtered recipes
    ingredient, //name of the common ingredient that was filtered
  }
  res.render('tagresult', viewData)
})

export default server