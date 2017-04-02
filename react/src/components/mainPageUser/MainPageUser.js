import React, { Component, PropTypes } from 'react'
/**
 * Utilities
 */
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
 /**
 * Components
 */
import ProfilePageUser from '../profilePageUser/ProfilePageUser'
import ViewOwnRecipes from '../viewOwnRecipes/ViewOwnRecipes'
import SearchRecipes from '../searchRecipes/SearchRecipes'

 /**
 * Styles
 */
import style from './mainPageUser-css'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import ActionHome from 'material-ui/svg-icons/action/home'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import Drawer from 'material-ui/Drawer'
/**
 * Mock Data
 */
import MockData from './MockData'

const { toolbar } = style

class MainPageUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      value: 1,
      /* Profile Page User */
      userID: '',
      userName: '',
      recipes: MockData,
      originalRecipes: MockData,
      /* Tab Bar User */
      selectedView: 'User',
      selectedRecipeName: '',
      selectedRecipeMethods: [],
      selectedRecipeIMG: null
    }
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  handleClose () {
    this.setState({open: false})
  }

  handleLogOut (event) {
    event.preventDefault()
    this.handleClose()
    this.context.router.history.push('/welcome')
  }

  setStateThroughProps (event, newStateValue) {
    event.preventDefault()
    this.setState({ newStateValue })
  }

  renderSelectedRecipe (recipeID) {
    axios.get('/api/recipes/methods', {
      params: { recipeID }
    })
    .then(res => {
      const { selectedRecipeName, selectedRecipeMethods, selectedRecipeIMG } = res
      this.setState({ selectedRecipeName, selectedRecipeMethods, selectedRecipeIMG }, () => {
        this.context.router.history.push('/home/viewrecipe' + recipeID)
      })
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

  renderComponentWithProps (component) {
    if (component === 'ProfilePageUser') {
      return <ProfilePageUser state={this.state} setStateThroughProps={this.setStateThroughProps} renderSelectedRecipe={this.renderSelectedRecipe} />
    }
    if (component === 'ViewOwnRecipes') {
      return <ViewOwnRecipes state={this.state} setStateThroughProps={this.setStateThroughProps} />
    }
    if (component === 'ViewSelectedRecipe') {
      return <ViewSelectedRecipe state={this.state} setStateThroughProps={this.setStateThroughProps} />
    }
    if (component === 'SearchRecipes') {
      return <SearchRecipes state={this.state} setStateThroughProps={this.setStateThroughProps} />
    }
  }

  render () {
    return (
      <Router>
        <div>
          <div>
            <Toolbar style={toolbar}>
              <ToolbarGroup>
                <IconButton tooltip='Show more' onClick={this.handleToggle.bind(this)}>
                  <ActionHome />
                </IconButton>
                <ToolbarSeparator />
                <ToolbarTitle text='Forkly' />
              </ToolbarGroup>
            </Toolbar>
            <Drawer open={this.state.open}>
              <Link to='/home'><MenuItem onClick={this.handleClose.bind(this)}>Your profile</MenuItem></Link>
              <Link to='/home/recipes'><MenuItem onClick={this.handleClose.bind(this)}>Your recipes</MenuItem></Link>
              <Link to='/home/search'><MenuItem onClick={this.handleClose.bind(this)}>Search recipes</MenuItem></Link>
              <MenuItem onClick={event => this.handleLogOut(event)}>Log Out</MenuItem>
            </Drawer>
          </div>
          <Route exact path='/home' render={() => this.renderComponentWithProps('ProfilePageUser')} />
          <Route path='/home/recipes' render={() => this.renderComponentWithProps('ViewOwnRecipes')} />
          <Route path='/home/viewrecipe' render={() => this.renderComponentWithProps('ViewSelectedRecipe')} />
          <Route path='/home/search' render={() => this.renderComponentWithProps('SearchRecipes')} />
        </div>
      </Router>
    )
  }
}

MainPageUser.contextTypes = {
  router: PropTypes.object
}

export default MainPageUser
