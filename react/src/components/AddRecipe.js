import React from 'react'
import AddRecipeIngredients from './AddRecipeIngredients'
import AddIngredientsTable from './IngredientsTable'
import $ from 'jquery'
import axios from 'Axios'


    const styleProps = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false
    }

class AddRecipe extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      recipeName: 'Sugar Recipe',
      recipeDirections: '',
      ingredients: [{quantity: 1, units: 'spoonful', ingredient: 'sugar'}, {quantity: 1, units: 'spoonful', ingredient: 'sugar'}],
      creator: '',
      forking: false,
      edit: false
    }
    // this.addRow = this.addRow.bind(this)
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRecipeSave = this.handleRecipeSave.bind(this)
  }

  componentDidMount () {
    var forked = this.context.router.history.location.pathname
    let forkedId = forked.slice(forked.lastIndexOf('/') + 1)
    let boundThis = this
    // if history has url at end
    if (forkedId.length > 0) {
      console.log('hi')
      $.ajax({
        url: '/getRecipeById',
        type: 'POST',
        data: JSON.stringify({id: forkedId}),
        contentType: 'application/json',
        success: function (data) {
          boundThis.setState({
            recipeName: data.recipeName,
            recipeDirections: data.recipeDirections,
            ingredients: data.ingredients
          })
        },
        error: function (err) {
          console.error('could not retrieve any recipes for user')
        }
      })
    }
  }

  handleRecipeSave() {
    const { router } = this.context

    axios.post('/api/addRecipe' , this.state)
    .then(function(recipeId){
      router.history.push('/recipe/' + recipeId)
    })
    .catch(function(error){
      console.log(error)
    });
}
//jQUERY METHOD FOR REFERENCE
  //     function()
  //   $.ajax({
  //     url: '/api/addRecipe',
  //     data: JSON.stringify(this.state),
  //     method: 'POST',
  //     contentType: 'application/JSON',
  //     success: (recipeId) => {
  //       router.history.push('/recipe/' + recipeId)
  //     }
  //   })
  //   event.preventDefault()
  // }


//OG ADD ROW FOR REFERENCE 
  // addRow () {
  //   let myIngredients = this.state.ingredients
  //   myIngredients[myIngredients.length - 1].showButton = false
  //   myIngredients.push({quantity: 0, units: '', ingredient: ''})
  //   this.setState({ingredients: myIngredients})
  // }

  handleIngredientsChange (ingredientInd, updatedIngredient) {

    if(this.state.ingredients[ingredientInd] === undefined){
      let newIngredients = {
        quantity: updatedIngredient.quantity, 
        units: updatedIngredient.units, 
        ingredient: updatedIngredient.ingredient
      }
      console.log('NEW INGREDIENTS', newIngredients);
      this.setState( (state) => {
        state.ingredients = state.ingredients.concat([newIngredients]);
        return state;
     })
    } 
    else {
      let revisedIngredients = this.state.ingredients;
      Object.keys(updatedIngredient).forEach(ingKey => {
        revisedIngredients[ingKey] = updatedIngredient[ingKey];
      })

      this.setState({ingredients: revisedIngredients}, function(){
      console.log(this.state.ingredients);
      })
    }
  }

  handleInputChange (field, value) {
    console.log(field, value)
    this.setState({
      field: value
    })
  }

  render () {
    const  { forking, name } = this.state
    const recipeHeader = forking ? 'Fork the Recipe' : 'Add Your Recipe'

    return (

      <div className='createRecipe'>
          <h1>{recipeHeader}</h1>
        <br />
        <img className='recipeImage' src='assets/images/sushi.jpg' alt='sushi' />
        <br />
        <form onSubmit={this.handleSubmit}>

            <AddIngredientsTable handleRecipeSave={this.handleRecipeSave} stats={this.state} isDisabled={this.state.edit} handleChange={this.handleIngredientsChange} handleInputChange={this.handleInputChange} styleProps={styleProps} />
         
          <br />

          <div>
            
           
          </div>
        </form>
      </div>
    )
  }
}

AddRecipe.contextTypes = {
  router: React.PropTypes.object
}

export default AddRecipe

/*              
<div className='createRecipe'>
          <h1>{recipeHeader}</h1>
        <br />
        <img className='recipeImage' src='assets/images/sushi.jpg' alt='sushi' />
        <br />
        <form onSubmit={this.handleSubmit}>

            <AddIngredientsTable stats={this.state} edit={forking} handleChange={this.handleIngredientsChange} handleInputChange={this.handleInputChange} styleProps={styleProps} />
         
          <br />

          <h3 className='title'> Directions: </h3>
          <textarea name='directions' value={this.state.directions} onChange={this.handleInputChange} />

          <br />

          <div>
            <input type='submit' name='addRecipeSave' value='Save' />
            <input type='button' name='addRecipeCancel' value='Cancel' />
          </div>
        </form>
        <br />
        <br />
        <br />
        <br />
      </div><table className='ingredients'>
            <thead>
              <tr>
                <td>Quantity</td>
                <td>Units</td>
                <td>Ingredient</td>
              </tr>
            </thead>
             </table>     

   {this.state.ingredients.map(function (val, index) {
              return <AddRecipeIngredients key={index} index={index} quantity={val.quantity} units={val.units} ingredient={val.ingredient} showButton={val.showButton} addRow={this.addRow} handleIngredientsChange={this.handleIngredientsChange} />
            }, this)}*/
