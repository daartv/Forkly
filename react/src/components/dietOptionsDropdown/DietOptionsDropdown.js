import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import BaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import * as mui from 'material-ui'

const diets = [
  {key: 0, name: 'low carb'},
  {key: 1, name: 'high fat'},
  {key: 2, name: 'gluten-free'},
  {key: 3, name: 'dairy-free'},
  {key: 4, name: 'vegan'},
  {key: 5, name: 'vegetarian'}
]

class DietOptionsDropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dietKeys: []
    }
  }

  handleChange (event, index, dietKeys) {
    const { getDiets } = this.props
    this.setState({dietKeys})
    this.setState((prevState) => {
      getDiets(prevState.dietKeys)
    })
  }

  selectionRenderer (dietKeys) {
    if (dietKeys.length === 0) {
      return ''
    }
    return dietKeys.map(key => {
      return diets[key].name
    }).join(',  ')
  }

  menuItems (diets) {
    return diets.map((diet) => (
      <MenuItem
        key={diet.key}
        insetChildren
        checked={this.state.dietKeys.includes(diet.key)}
        value={diet.key}
        primaryText={diet.name}
      />
    ))
  }

  render () {
    return (
      <SelectField
        multiple
        fullWidth
        hintText='dietary options'
        value={this.state.dietKeys}
        onChange={this.handleChange.bind(this)}
        selectionRenderer={this.selectionRenderer}
      >
        {this.menuItems(diets)}
      </SelectField>
    )
  }
}

export default DietOptionsDropdown
