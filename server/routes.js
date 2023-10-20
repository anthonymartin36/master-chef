import express from 'express'
import * as Path from 'node:path'
import fsPromises from 'node:fs/promises'
const router = express.Router()

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  let recipes = await fsPromises.readFile(
    Path.resolve('server/data/recipes.json'),
    'UTF-8'
  )
  //Convert to object
  recipes = JSON.parse(recipes).recipes
  //finds recipe with matching id
  let recipe = recipes.find((recipe) => recipe.id === id)

  res.render('full-recipe', recipe)
})

export default router
