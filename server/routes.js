import express from 'express'
import fsPromises from 'node:fs/promises'
const router = express.Router()

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const recipes = await fsPromises.readFile(
    Path.resolve('server/data/recipes.json'),
    'UTF-8'
  )
  //Convert to object
  recipes = JSON.parse(recipes)

  res.render('full-recipe', {})
})

export default router
