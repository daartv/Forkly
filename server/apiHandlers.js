const querystring = require('querystring')
const { YUMMLY_APP_ID, YUMMLY_APP_KEY, SPOONACULAR_KEY } = require('./setup')
const axios = require('axios')

/**
 * API Search Helpers
 */
const yummlyURL = 'http://api.yummly.com/v1/api/'
const spoonacularURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract'
const diets = {
  0: 'nutrition^nutrition-low-carb',
  1: 'nutrition^nutrition-low-sugar',
  2: '393^Gluten-Free',
  3: '396^Dairy-Free',
  4: '390^Vegan',
  5: '385^Lacto-ovo+vegetarian'
}
const searchParams = {
  _app_id: YUMMLY_APP_ID,
  _app_key: YUMMLY_APP_KEY,
  q: null
}

const composeRequest = (params) => {
  /**
   * If params = recipeID, we compose a Get Recipe request
   */
  if (typeof params === 'string') {
    const queryString = yummlyURL + `recipe/${params}?_app_id=${YUMMLY_APP_ID}&_app_key=${YUMMLY_APP_KEY}`
    return queryString
  }
  /**
   * If params = object of search filters, we compose a Search Recipes request
   */
  const { dish, allowedIngredient, excludedIngredient, dietKeys } = params
  const dishName = dish.split(' ').join('+')
  // /**
  //  * Converting search filters to required format, to set on object and stringify
  //  */
  searchParams.q = dishName
  allowedIngredient && searchParams['allowedIngredient[]']
  excludedIngredient && searchParams['excludedIngredient[]']
  dietKeys && dietKeys.forEach(key => {
    const diet = diets[key];
    (key === 0 || key === 1) && searchParams['allowedAttribute[]'].push(diet);
    (key === 2 || key === 3) && searchParams['allowedAllergy[]'].push(diet);
    (key === 4 || key === 5) && searchParams['allowedDiet[]'].push(diet)
  })
  // /**
  //  * Using querystring to stringify the search paramaters and compose a query URL
  //  */
  const searchParamsString = querystring.stringify(searchParams)
  const queryString = yummlyURL + `recipes?` + searchParamsString
  return queryString
}

exports.yummlySearchRecipes = (req, res) => {
  const params = req.query
  // /**
  //  * GET request to Yummly, to search all recipes (note: does not return recipe methods)
  //  */
  axios.get(composeRequest(params))
  .then(({ data }) => {
    const recipes = data.matches
    const response = recipes.map(({ id, ingredients, recipeName }) => {
      return { id, ingredients, recipeName }
    })
    res.status(200).send(response)
  })
/* * implement Erik error handling * */
  .catch(error => console.log(error))
}

exports.spoonacularGetRecipe = (req, res) => {
  const { recipeID } = req.body
  // /**
  //  * GET request to Yummly, to get recipe's source URL and large image (using recipe ID)
  //  */
  axios.get(composeRequest(recipeID))
  .then(results => {
    const recipeURL = results.data.source.sourceRecipeUrl
    const recipeIMG = results.data.images[0].hostedLargeUrl
    // /**
    //  * GET request to Spoonacular, to get recipe's methods from source URL
    //  */
    axios.get(spoonacularURL, {
      params: {
        url: recipeURL,
        forceExtraction: 'false'
      },
      headers: {
        'x-mashape-key': SPOONACULAR_KEY
      }
    })
    .then(({ data }) => {
      // /**
      //  * send methods and image to client
      //  */
      const { instructions } = data
      const recipeMethods = instructions.split('\n').slice(2, -2).map((line) => {
        return line.slice(4, -5)
      })
      const response = { recipeMethods, recipeIMG }
      res.status(200).send(response)
    })
    /* * implement Erik error handling * */
    .catch(error => console.log(error))
  })
  /* * implement Erik error handling * */
  .catch(error => console.log(error))
}
