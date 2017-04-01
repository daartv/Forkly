import React, { Component } from 'react'
import axios from 'axios'

import style from './viewRecipeDetails-css'
import {pinkA200, transparent} from 'material-ui/styles/colors'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import IngredientsDirections from './IngredientsDirections'


class ViewRecipeDetails extends Component {
  constructor(props) {
    super(props)
    // TODO: Make the image dynamic.
    this.state = {
      recipe: '',
      fork: ''
    }

  }

  componentDidMount() {
    const id = this.props.params.recipeId
    // const id = '58dfe5133fd7fc02104c621a' //|| this.props.params.id // remove this line and uncomment the one on top when ready to use 
    axios.get(`api/recipes/${id}`)
    .then(result => {
      this.setState({recipe: result.data}, () => console.log('this.state:', this.state))
    })
    .catch(err => console.log('ViewRecipeDetails.js - error: ', err))
  }

  render() {
    const { name,  _creator, forks, directions, ingredients } = this.state.recipe
    console.log(this.state.recipe)
    return (

      <div style={style.mainContainer}>
        <div style={style.shortDetailContainer} >
          <Subheader inset={true}> { name } </Subheader>
          <Divider />
          <ul style={style.shortDetailList}>
            <li>{`Recipe by: ${_creator ? _creator.name : ''}`}</li>
            <li>{'Short information of recipe.'}</li>
            <li>{`Forked ${forks ? forks.length : ''} times.`}</li>          
          </ul>
        </div>

        <div style={style.imageContainer}>
          <img src={this.state.recipe.image} style={style.recipeImage} />
        </div>

        {
          ingredients ? <IngredientsDirections ingredients={ingredients} /> : ''
        }
        
        {
          /*ingredients ? <IngredientsDirections ingredients={ingredients} /> : ''*/
        }

        <div className='FORKS_TABLES'>
        </div>


      </div>
    )
  }
}

export default ViewRecipeDetails

