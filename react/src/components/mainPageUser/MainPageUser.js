import React, { Component, PropTypes } from 'react'
/**
 * Utilities
 */
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
 /**
 * Components
 */
import ViewOwnRecipes from '../viewOwnRecipes/ViewOwnRecipes'
import SearchRecipes from '../searchRecipes/SearchRecipes'
import ViewRecipes from '../ViewRecipes'
import NavUser from '../navUser/NavUser'
import AddRecipe from '../AddRecipe'


 /**
 * Styles
 */
import { toolbar } from './mainPageUser-css'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import ActionHome from 'material-ui/svg-icons/action/home'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import Drawer from 'material-ui/Drawer'

class MainPageUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      value: 1,
      recipeToView: ''
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
    this.context.router.history.push('/login')
  }

  setStateThroughProps(recipeToView) {
    this.setState({ recipeToView })
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
              <MenuItem onClick={this.handleClose.bind(this)}><Link to='/home/profile'>Your profile</Link></MenuItem>
              <MenuItem onClick={this.handleClose.bind(this)}><Link to='/home/search'>Search recipes</Link></MenuItem>
              <MenuItem onClick={this.handleClose.bind(this)}><Link to='/home/add'>Add a recipe</Link></MenuItem>
              <MenuItem onClick={event => this.handleLogOut(event)}>Log Out</MenuItem>
            </Drawer>
          </div>
          <Route exact path='/home/add' component={AddRecipe} />
          <Route exact path='/home/search' component={SearchRecipes} />
          <Route exact path='/home/profile' component={ViewRecipes} /> 
        </div>
      </Router>
    )
  }
}

MainPageUser.contextTypes = {
  router: PropTypes.object
}

export default MainPageUser
