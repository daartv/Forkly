import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import BaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import * as mui from 'material-ui'

const diets = [
  {value: 0, name: 'low carb'},
  {value: 1, name: 'high fat'},
  {value: 2, name: 'gluten-free'},
  {value: 3, name: 'dairy-free'},
  {value: 4, name: 'vegan'},
  {value: 5, name: 'vegetarian'}
]

class DietOptionsDropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      values: []
    }
  }

  handleChange (event, index, values) {
    this.setState({values})
  }

  selectionRenderer (values) {
    if (values.length === 0) {
      return ''
    }
    return values.map(value => {
      return diets[value].name
    }).join(',  ')
  }

  menuItems (diets) {
    return diets.map((diet) => (
      <MenuItem
        key={diet.value}
        insetChildren
        checked={this.state.values.includes(diet.value)}
        value={diet.value}
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
        value={this.state.values}
        onChange={this.handleChange.bind(this)}
        selectionRenderer={this.selectionRenderer}
      >
        {this.menuItems(diets)}
      </SelectField>
    )
  }
}

export default DietOptionsDropdown
