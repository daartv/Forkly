import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import DisplayRecipesContainer from '../displayRecipesContainer/DisplayRecipesContainer'
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
}

class TabBarUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'User'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      value: event.value
    })
  }

  render () {
    const { recipeStats, handleClick } = this.props
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="User's Recipes" value='User'>
          <div>
            <h2 style={styles.headline} />
            <DisplayRecipesContainer handleClick={handleClick} stats={recipeStats.usersRecipes} />
          </div>
        </Tab>
        <Tab label="User's Forks" value='Fork'>
          <div>
            <h2 style={styles.headline} />
            <DisplayRecipesContainer handleClick={handleClick} stats={recipeStats.forkedRecipes} />
          </div>
        </Tab>
        <Tab label='Recent Activity' value='Recent'>
          <div>
            <h2 style={styles.headline} />
            <DisplayRecipesContainer handleClick={handleClick} stats={recipeStats.orderedRecipes} />
          </div>
        </Tab>
      </Tabs>
    )
  }
}
export default TabBarUser
