import React, { Component } from 'react'
/**
 * Utilities
 */
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
/**
 * Components
 */
import NavNonUser from '../navNonUser/NavNonUser'
import SearchRecipes from '../searchRecipes/SearchRecipes'
import RecipeResultsNonUser from '../recipeResultsNonUser/RecipeResultsNonUser'

class MainPageNonUser extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  renderResultsWithProps () {
    return <RecipeResultsNonUser />
  }

  render () {
    return (
      <Router>
        <div>
          <NavNonUser />
          <Route exact path='/forkly' component={SearchRecipes} />
          <Route path='/forkly/results' render={this.renderResultsWithProps.bind(this)} />
        </div>
      </Router>

    )
  }
}

export default MainPageNonUser
