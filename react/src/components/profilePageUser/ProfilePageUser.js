import React, { Component, PropTypes } from 'react'
import TabBarUser from '../tabBarUser/TabBarUser'
import style from './profilePageUser-css'
import NotificationsIcon from 'material-ui/svg-icons/social/Notifications'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import Badge from 'material-ui/Badge'
// TEMP
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
const { dashboard, leftDashboard, rightDashboard, statsBar, profilePic, statDetail } = style
/* * state, setStateThroughProps are passed in as Props * */
/* * state = {userID, userName, recipes, originalRecipes} * */
class ProfilePageUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this._renderSelectedRecipe = this._renderSelectedRecipe.bind(this)
  }
  // Temporary fixed
  _renderSelectedRecipe(recipeID) {
    this.props.renderSelectedRecipe(recipeID)
    // console.log('_renderSelectedRecipe', this)
    this.context.router.history.push(`/home/viewrecipe/${recipeID}`)
  }
  testfunction() {
    console.log('testfunction', this)
  }
  render() {
    const { state, setStateThroughProps } = this.props
    const orderedRecipes = state.recipes.reduce((a, b) => [b, ...a], [])
    const forkedRecipes = []
    const usersRecipes = []
    state.recipes.forEach(recipe => {
      recipe.creator === state.userID && usersRecipes.push(recipe)
      recipe.creator !== state.userID && usersRecipes.push(recipe)
    })
    return (
      <div>
        <div style={dashboard}>
          <div style={leftDashboard}>
            <h2>{state.userID}</h2>
            <Paper style={profilePic} circle />
          </div>
          <div style={rightDashboard}>
            <div style={rightDashboard}>
              <Paper style={statsBar} >
                <Paper style={statDetail} >
                  <h4>User's Recipes</h4>
                  <p>{usersRecipes.length}</p>
                </Paper>
                <Paper style={statDetail}>
                  <h4>Forks</h4>
                  <p>{forkedRecipes.length}</p>
                </Paper>
                <Paper style={statDetail}>
                  <h4>Been Forked</h4>
                  <p>17</p>
                </Paper>
              </Paper>
            </div>
          </div>
        </div>
        <div>
          <TabBarUser state={state} setStateThroughProps={setStateThroughProps} recipeStats={{orderedRecipes, forkedRecipes, usersRecipes}} renderSelectedRecipe={this._renderSelectedRecipe} />
        </div>
      </div>
    )
  }
}
ProfilePageUser.contextTypes = {
  router: PropTypes.object.isRequired
};
export default ProfilePageUser