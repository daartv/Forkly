import React, { Component } from 'react'
/**
 * Utilities
 */
import renderHTML from 'react-render-html'
import axios from 'axios'
/**
 * Components
 */
import DietOptionsDropdown from '../dietOptionsDropdown/DietOptionsDropdown'
/**
 * Material UI / React Grid Components
 */
import ReactGridLayout from 'react-grid-layout'
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import ChipInput from 'material-ui-chip-input'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
/**
 * styles
 */
import {orange500, blue500} from 'material-ui/styles/colors'
import style from './searchRecipes-css'

class SearchRecipes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dish: '',
      allowedIngredient: null,
      excludedIngredient: null,
      dietKeys: [],
      readyInMinutes: null,
      recipeIMG: null,
      recipeMethods: null
    }
    this.setStateThroughProps = this.setStateThroughProps.bind(this)
  }

  handleSubmit () {
    const { dish, allowedIngredient, excludedIngredient, dietKeys } = this.state
    axios.get('/api/recipes/search', {
      params: { dish, allowedIngredient, excludedIngredient, dietKeys }
    })
    .then(res => {
      console.log(res)
      const recipes = res.data

      /**
       * res.data will be an array of indiv recipe objects { id, ingredients, recipeName }
       */
    })
    /* * implement proper error handling * */
    .catch(error => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

  /* * { target } is deconstructed from event.target * */
  handleInputChange ({ target }, key) {
    const { value } = target
    this.setState({ [key]: value })
  }

  handleChange (chips, key) {
    this.setState({ [key]: chips })
  }

  setStateThroughProps (event, dietKeys) {
    event.preventDefault()
    this.setState({ dietKeys })
  }

  render () {
    const { dish } = this.state
    const layout = [
      {i: 'a', x: 3, y: 2, w: 6, h: 3, static: true},
      {i: 'b', x: 3, y: 5, w: 3, h: 3, static: true},
      {i: 'c', x: 3, y: 8, w: 6, h: 3, static: true},
      {i: 'd', x: 3, y: 11, w: 6, h: 3, static: true},
      {i: 'e', x: 3, y: 14, w: 6, h: 3, static: true},
      {i: 'f', x: 3, y: 17, w: 6, h: 3, static: true},
      {i: 'g', x: 3, y: 20, w: 6, h: 3, static: true}
    ]

    return (
      <ReactGridLayout className='layout' layout={layout} cols={12} rowHeight={31} width={window.innerWidth}>
        <div key={'a'}>
          <div style={style.title}>
            search options
          </div>
        </div>
        <div key={'b'} />
        <div key={'c'}>
          <TextField
            hintText='name of dish'
            underlineShow
            value={dish}
            fullWidth
            onChange={(event) => this.handleInputChange(event, 'dish')}
            />
        </div>
        <div key={'d'}>
          <ChipInput
            fullWidth
            fullWidthInput
            hintText={['must include']}
            onChange={(chips) => this.handleChange(chips, 'allowedIngredient')}
          />
        </div>
        <div key={'e'}>
          <ChipInput
            fullWidth
            fullWidthInput
            hintText={['must not include']}
            onChange={(chips) => this.handleChange(chips, 'excludedIngredient')}
          />
        </div>
        <div key={'f'}>
          <DietOptionsDropdown state={this.state} setStateThroughProps={this.setStateThroughProps} />
        </div>
        <div key={'g'}>
          <FlatButton label='submit' secondary fullWidth onClick={this.handleSubmit.bind(this)} />
        </div>
      </ReactGridLayout>
    )
  }
}

//   render () {
//     return (
//       <div className='createRecipe'>
//         <Paper zDepth={2}>
//           <TextField data-role='tagsinput' hintText='Recipe Name' style={style} underlineShow={false} />
//           <Divider />
//           <TextField hintText='Ingredients' inputRef={ref => { this.Ingredients = ref }} style={style} underlineShow={false} />
//           <Divider />
//           <TextField hintText='Last name' style={style} underlineShow={false} />
//           <Divider />
//           <TextField hintText='Email address' style={style} underlineShow={false} />
//           <Divider />
//         </Paper>
//       </div>
//     )
//   }
// }

export default SearchRecipes
