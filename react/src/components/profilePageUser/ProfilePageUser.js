import React, { Component, PropTypes } from 'react'
import $ from 'jquery'

import DisplayRecipesContainer from '../displayRecipesContainer/DisplayRecipesContainer'
import TabBarUser from '../tabBarUser/TabBarUser'

import style from './profilePageUser-css'
import NotificationsIcon from 'material-ui/svg-icons/social/Notifications'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import Badge from 'material-ui/Badge'

import axios from 'axios'

const { dashboard, leftDashboard, rightDashboard, statsBar, profilePic, statDetail } = style

/* * state, setStateThroughProps are passed in as Props * */
const ProfilePageUser = ({ state, setStateThroughProps }) => {
  const { userID, userName, recipes, originalRecipes } = state

  // const handleClick = (recipeId) => {
  //     // redirect to /recipes/recipeId
  //   const { router } = this.context
  //   router.history.push('/recipe/' + recipeId)
  // }
  let recipeStats = {
    usersRecipes: [],
    forkedRecipes: []
  }

  // recipeStats.orderedRecipes = recipes.reverse()
  // recipes.forEach((recipe) => {
  //   recipeStats.usersRecipes.push(recipe)
  //       // if (recipe.creator === userID){
  //       //   recipeStats.usersRecipes.push(recipe)
  //       // } else {
  //   recipeStats.forkedRecipes.push(recipe)
  //       // }
  // })
  return (
    <div>
      <div style={dashboard}>
        <div style={leftDashboard}>
          <h2>{userID}</h2>
          <Paper style={profilePic} zDepth={1} circle />
        </div>
        <div style={rightDashboard}>
          <div style={rightDashboard}>
            <Paper style={statsBar} zDepth={1} >

              <Paper style={statDetail} zdepth={0}>
                <h4>User's Recipes</h4>
                <p>{recipeStats.usersRecipes.length}</p>
              </Paper>

              <Paper style={statDetail} zdepth={0}>
                <h4>Forks</h4>
                <p>{recipeStats.forkedRecipes.length}</p>
              </Paper>

              <Paper style={statDetail} zdepth={0}>
                <h4>Been Forked</h4>
                <p>17</p>
              </Paper>
            </Paper>
          </div>
        </div>
      </div>
      <div>
        <TabBarUser recipeStats={recipeStats} />
      </div>
    </div>
  )
}

ProfilePageUser.contextTypes = {
  router: React.PropTypes.object
}

export default ProfilePageUser
