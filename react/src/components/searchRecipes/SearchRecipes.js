import React, { Component } from 'react'
/**
 * Components
 */
import DietOptionsDropdown from '../dietOptionsDropdown/DietOptionsDropdown'
import AddRecipeIngredients from '../AddRecipeIngredients'

/**
 * Material UI Components
 */
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import ChipInput from 'material-ui-chip-input'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

/**
 * Grid Layout
 */
import ReactGridLayout from 'react-grid-layout'

/**
 * Styles
 */
import {orange500, blue500} from 'material-ui/styles/colors'
import styles from './searchRecipes-css'

/**
 * Utilities
 */
import axios from 'axios'

class SearchRecipes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dish: '',
      allowedIngredient: '',
      excludedIngredient: '',
      dietKeys: []
    }
    this.setStateThroughProps = this.setStateThroughProps.bind(this)
  }

  handleSubmit () {
    const filters = {
      recipeID: 'Earthquake-Cake-1386793'
    }
    axios.post('/api/recipes/methods', filters)
    .then(res => {
      console.log(res)
      // const { id, ingredients, recipeName } = res.data

      /* * do the things with the response * */
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
      {i: 'a', x: 3, y: 0, w: 6, h: 3, static: true},
      {i: 'b', x: 3, y: 3, w: 6, h: 3, static: true},
      {i: 'c', x: 3, y: 6, w: 6, h: 3, static: true},
      {i: 'd', x: 3, y: 9, w: 6, h: 3, static: true},
      {i: 'e', x: 3, y: 12, w: 6, h: 3, static: true},
      {i: 'f', x: 3, y: 15, w: 6, h: 3, static: true},
      {i: 'g', x: 3, y: 18, w: 6, h: 3, static: true}
    ]
    return (
      <ReactGridLayout className='layout' layout={layout} cols={12} rowHeight={31} width={window.innerWidth}>
        <div key={'a'}>
          <div style={styles.title}>
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
