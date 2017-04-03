import React, { Component } from 'react'
import axios from 'axios'

import style from './viewRecipeDetails-css'
import {pinkA200, transparent} from 'material-ui/styles/colors'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import IngredientsDirections from './IngredientsDirections'
import DualRecipes from './DualRecipes'
import ForkList from './ForksList.js'
const styles = {

}


class ViewRecipeDetails extends Component {
  constructor(props) {
    super(props)
    // TODO: Make the image dynamic.
    
  }

  componentDidMount() {
  //   console.log('component mounted yo')
  //   // const id = this.props.params.recipeId
  //   const id = '58e02f58e71032728ea46fcd' //|| this.props.params.id // remove this line and uncomment the one on top when ready to use 
    axios.get(`api/recipes/${id}`)
    .then(result => {
      this.setState({
        recipe: result.data,
        activeRecipe: result.data, 
        compareRecipe: result.data
      }), () => console.log('hello world component will mount')})
    .catch(err => console.log('ViewRecipeDetails.js - error: ', err))
  }

  createRecipeCard(recipe, isComparison) {
    return (<div style={{padding: '10px', display: 'table-cell'}}>
      <DualRecipes compare={isComparison} stats={recipe} styles={style.dualRecipesLayout} />
    </div>)
  }

  componentWillMount() {
    console.log('ViewRecipeDetails this', this)
  }
  
  shouldComponentUpdate(){
    return true;
  }
  

  render() {
  const { activeRecipe, compareRecipe } = this.props.state
  // const isComparison = true //original
  const isComparison = false
  const hasMounted = !!activeRecipe.name
  const { name,  _creator, forks, directions, ingredients } = activeRecipe

  const recipeDetails = (
    <IngredientsDirections recipeStats={activeRecipe} />
  )

  const contentLeft = isComparison ? this.createRecipeCard(compareRecipe, isComparison) : recipeDetails 

    return (
      <div style={style.mainContainer}>
        <div style={style.topContainer}>
          {contentLeft}
          {this.createRecipeCard(activeRecipe, isComparison)}
        </div>
        

        <div style={{width: '100%'}}>
        <Divider />
          <ForkList forks={forks}/>
        </div>


      </div>
    )
  }
}

export default ViewRecipeDetails

