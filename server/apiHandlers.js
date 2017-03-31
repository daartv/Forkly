const querystring = require('querystring')
const { yummlyAPICreds } = require('./setup')
const axios = require('axios')

/**
 * Yummy API Search Recipe Helpers
 */
const { appID, appKEY } = yummlyAPICreds
const yummlyURL = 'http://api.yummly.com/v1/api/'
const diets = {
  0: 'nutrition^nutrition-low-carb',
  1: 'nutrition^nutrition-low-sugar',
  2: '393^Gluten-Free',
  3: '396^Dairy-Free',
  4: '390^Vegan',
  5: '385^Lacto-ovo+vegetarian'
}

const searchParams = {
  _app_id: appID,
  _app_key: appKEY,
  q: null,
  'allowedIngredient[]': null,
  'excludedIngredient[]': null,
  'allowedAttribute[]': [],
  'allowedAllergy[]': [],
  'allowedDiet[]': []
}

const composeRequest = (params) => {
  /**
   * If params = recipeID, we compose a Get Recipe request
   */
  if (typeof params === 'string') {
    const queryString = yummlyURL + `recipe/${params}?_app_id=${appID}&_app_key=${appKEY}`
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
  searchParams['allowedIngredient[]'] = allowedIngredient
  searchParams['excludedIngredient[]'] = excludedIngredient
  dietKeys.forEach(key => {
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
  const params = req.body
  const request = composeRequest(params)
  axios.get(request)
  .then(results => {
    const recipe = results.data.matches[0]
    const { id, ingredients, recipeName } = recipe
    const data = { id, ingredients, recipeName }
    res.status(200).send(data)
  })
/* * implement proper error handling * */
  .catch(error => console.log(error))
}

