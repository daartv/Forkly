import React from 'react'
import AddRecipeIngredients from './AddRecipeIngredients'
import AddIngredientsTable from './IngredientsTable'
import $ from 'jquery'

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
      name: '',
      directions: '',
      ingredients: [{quantity: 1, units: 'spoonful', ingredient: 'sugar'}],
      creator: ''
    }
    this.addRow = this.addRow.bind(this)
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

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
            name: data.name,
            directions: data.directions,
            ingredients: data.ingredients
          })
        },
        error: function (err) {
          console.error('could not retrieve any recipes for user')
        }
      })
    }
  }

  handleSubmit (event) {
    const { router } = this.context
    $.ajax({
      url: '/api/addRecipe',
      data: JSON.stringify(this.state),
      method: 'POST',
      contentType: 'application/JSON',
      success: (recipeId) => {
        router.history.push('/recipe/' + recipeId)
      }
    })
    event.preventDefault()
  }

  addRow () {
    let myIngredients = this.state.ingredients
    myIngredients[myIngredients.length - 1].showButton = false
    myIngredients.push({quantity: 0, units: '', ingredient: ''})
    this.setState({ingredients: myIngredients})
  }

  handleIngredientsChange (ingredientInd, updatedIngredient) {

    console.log('hello')


    if(this.state.ingredients[ingredientInd] === undefined){
      let newIngredients = {
        quantity: updatedIngredient.quantity, 
        units: updatedIngredient.unit, 
        ingredient: updatedIngredient.ingredient
      }
      console.log('NEW INGREDIENTS', newIngredients);
      this.setState( (state) => {
        state.ingredients = state.ingredients.concat([newIngredients]);
        return state;
     })
    } else {
    let revisedIngredients = this.state.ingredients;
    Object.keys(updatedIngredient).forEach(ingKey => {
      revisedIngredients[ingKey] = updatedIngredient[ingKey];
    })

    this.setState({ingredients: revisedIngredients}, function(){
      

    // this.setState({
    //   ingredients: ing
    // })
    if(this.state.ingredients[ingredientInd] === undefined){
      let newIngredients = {
        quantity: updatedIngredient.quantity, 
        units: updatedIngredient.unit, 
        ingredient: updatedIngredient.ingredient
      }
      console.log('NEW INGREDIENTS', newIngredients);
      this.setState( (state) => {
        state.ingredients = state.ingredients.concat([newIngredients]);
        return state;
     })
    } else {
    let revisedIngredients = this.state.ingredients;
    Object.keys(updatedIngredient).forEach(ingKey => {
      revisedIngredients[ingKey] = updatedIngredient[ingKey];
    })

    this.setState({ingredients: revisedIngredients}, function(){
      
    })
    }
    console.log(this.state.ingredients);
  }

  handleInputChange (field, value) {
    console.log(field, value)
    this.setState({
      field: value
    })
  }

  render () {
    return (
      <div className='createRecipe'>
        <header>
          <h1 className='recipeHeader'>Create a Recipe</h1>
        </header>
        <br />
        <img className='recipeImage' src='assets/images/sushi.jpg' alt='sushi' />
        <br />
        <form onSubmit={this.handleSubmit}>

          <h3 className='recipeName'>Recipe Name:</h3>
          <input type='text' value={this.state.name} name='name' onChange={this.handleInputChange} />
          <br />
          <br />

          <h3 className='title'>Ingredients:</h3>
          <table className='ingredients'>
            <thead>
              <tr>
                <td>Quantity</td>
                <td>Units</td>
                <td>Ingredient</td>
              </tr>
            </thead>
            <AddIngredientsTable recipeName={this.state.name} directions={this.state.directions} ingredients={this.state.ingredients} edit={true} handleChange={this.handleIngredientsChange} handleInputChange={this.handleInputChange} styleProps={styleProps} />
          </table>
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
      </div>
    )
  }
}

AddRecipe.contextTypes = {
  router: React.PropTypes.object
}

export default AddRecipe

/*            {this.state.ingredients.map(function (val, index) {
              return <AddRecipeIngredients key={index} index={index} quantity={val.quantity} units={val.units} ingredient={val.ingredient} showButton={val.showButton} addRow={this.addRow} handleIngredientsChange={this.handleIngredientsChange} />
            }, this)}*/
