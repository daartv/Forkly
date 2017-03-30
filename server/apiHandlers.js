// INCLUDE IN SETUP.js
// X-Yummly-App-ID = 'app-id'
// X-Yummly-App-Key = 'app-key'

const composeRequest = (filters) => {
  const { dish, allowedIngredient, excludedIngredient, dietKeys } = filters
  // construct base url for yummly GET request
  // return
}

exports.yummlySearchRecipes = (req, res) => {
  const { filters } = req
  const request = composeRequest(filters)
  // make api call with constructed request
  // .then(results => {
  // res.status(200)
  // send result
  })
/* * implement proper error handling * */
.catch(error => console.log(error))
}