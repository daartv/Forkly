import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import RecipeGrid from './RecipeGrid'
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
}

class PageTabs extends Component {
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
    const { stats, recipeStats, handleClick } = this.props
    console.log(recipeStats)

    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="User's Recipes" value='User'>
          <div>
            <h2 style={styles.headline} />
            <RecipeGrid handleClick={handleClick} />
          </div>
        </Tab>
        <Tab label="User's Forks" value='Fork'>
          <div>
            <h2 style={styles.headline} />
            <RecipeGrid handleClick={handleClick} />
          </div>
        </Tab>
        <Tab label='Recent Activity' value='Recent'>
          <div>
            <h2 style={styles.headline} />
            <RecipeGrid handleClick={handleClick} />
          </div>
        </Tab>
      </Tabs>
    )
  }
}
export default PageTabs
