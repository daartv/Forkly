import React, {Component} from 'react'

/**
 * Material UI Components
 */
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

/**
 * Styles
 */
import BaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import * as mui from 'material-ui'

const diets = [
  {key: 0, name: 'low carb'},
  {key: 1, name: 'low sugar'},
  {key: 2, name: 'gluten-free'},
  {key: 3, name: 'dairy-free'},
  {key: 4, name: 'vegan'},
  {key: 5, name: 'vegetarian'}
]

const DietOptionsDropdown = ({ state, setStateThroughProps }) => {
  const selectionRenderer = (dietKeys) => {
    if (dietKeys.length === 0) {
      return ''
    }
    return dietKeys.map(key => {
      return diets[key].name
    }).join(',  ')
  }

  const menuItems = (diets) => {
    return diets.map((diet) => (
      <MenuItem
        key={diet.key}
        insetChildren
        checked={state.dietKeys.includes(diet.key)}
        value={diet.key}
        primaryText={diet.name}
      />
    ))
  }
  /**
  * Index argument is used by SelectField behind the scenes
  */
  const handleChange = (event, index, dietKeys) => {
    setStateThroughProps(event, dietKeys)
  }
  return (
    <SelectField
      multiple
      fullWidth
      hintText='dietary options'
      value={state.dietKeys}
      onChange={handleChange}
      selectionRenderer={selectionRenderer}
    >
      {menuItems(diets)}
    </SelectField>
  )
}

export default DietOptionsDropdown
