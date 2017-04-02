import React, { Component } from 'react'
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

const tilesData = [
  {
    img: 'https://files.slack.com/files-tmb/T3YD9REQK-F4ST7FEV8-ec5103a4b2/cake_example_img_360.jpg',
    title: 'Breakfast',
    author: 'jill111',
    id: 555
  },
  {
    img: 'https://www.chowstatic.com/assets/recipe_photos/30175_easy_pumpkin_pie.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
    id: 556

  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Camera',
    author: 'Danson67',
    id: 557
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Morning',
    author: 'fancycrave1',
    id: 558
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hats',
    author: 'Hans'
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Honey',
    author: 'fancycravel'
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegetables',
    author: 'jill111'
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki'
  },
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111'
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'dsakhfdjhasf'
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Cadsfdsafdasmera',
    author: 'Dadsklfjhdshfnson67'
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Mfdsg34fewforning',
    author: 'fancycrave1'
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hatewfeswasas',
    author: 'Hans'
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Hondsfdsafaey',
    author: 'fancycravel'
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegeewr3 tables',
    author: 'jill111'
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water pdsafdsalant',
    author: 'BkrmadtyaKarki'
  }
]

class ProfilePageUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userID: '',
      userName: '',
      recipes: tilesData,
      originalRecipes: tilesData
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (recipeId) {
    // redirect to /recipes/recipeId
    const { router } = this.context
    router.history.push('/recipe/' + recipeId)
  }

  render () {
    const { userID, userName, recipes, originalRecipes } = this.state

    let recipeStats = {
      usersRecipes: [],
      forkedRecipes: []
    }
    recipeStats.orderedRecipes = recipes.reverse()
    recipes.forEach((recipe) => {
      recipeStats.usersRecipes.push(recipe)
        // if (recipe.creator === userID){
        //   recipeStats.usersRecipes.push(recipe)
        // } else {
      recipeStats.forkedRecipes.push(recipe)
        // }
    })
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
          <TabBarUser recipeStats={recipeStats} handleClick={this.handleClick} />
        </div>
      </div>
    )
  }
}

ProfilePageUser.contextTypes = {
  router: React.PropTypes.object
}

export default ProfilePageUser
