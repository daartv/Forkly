import React, { Component, PropTypes } from 'react'
import NavUser from '../navUser/NavUser'
import Drawer from 'material-ui/Drawer';
import ViewOwnRecipes from '../viewOwnRecipes/ViewOwnRecipes'
import SearchRecipes from '../searchRecipes/SearchRecipes'
import MenuItem from 'material-ui/MenuItem'
import Home from '../Home'
import Login from '../Login'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import FontIcon from 'material-ui/FontIcon'

import {
  Toolbar, 
  ToolbarGroup, 
  ToolbarSeparator, 
  ToolbarTitle
} from 'material-ui/Toolbar'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class MainPageUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      open:false,
      value: 1
    };
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  handleClose() {
    this.setState({open:false})
  }

  handleLogOut(event) {
    event.preventDefault()
    this.handleClose()
    this.context.router.history.push('/')
  }

  render() {
    return (
      <Router>
      	<div>
            <div>
              <Toolbar style={{backgroundColor: '#FF8C00', position: 'fixed', top: 0, width: '100%', zIndex: 999}}>
                <ToolbarGroup>
                  <IconButton tooltip='Show more' onClick={this.handleToggle.bind(this)}>
                    <ActionHome />
                  </IconButton>
                  <ToolbarSeparator />
                  <ToolbarTitle text='Forkly' />
                </ToolbarGroup>
              </Toolbar>
              <Drawer open={this.state.open}>
                <Link to='/user/recipes'><MenuItem onClick={this.handleClose.bind(this)}>Your recipes</MenuItem></Link>
                <Link to='/user/search'><MenuItem onClick={this.handleClose.bind(this)}>Search recipes</MenuItem></Link>
                <MenuItem onClick={event => this.handleLogOut(event)}>Log Out</MenuItem>
              </Drawer>
            </div>
            <Route exact path='/user/recipes' component={ViewOwnRecipes}/>
            <Route exact path='/user/search' component={SearchRecipes}/>
        </div>
      </Router>
    )
  }
}

MainPageUser.contextTypes = {
  router: PropTypes.object
  
/* const MainPageUser = () => {
  return (
    <Router>
      <div>
        <h1>Main Page User</h1>
        <NavUser />
        <Route exact path='/user/recipes' component={ViewOwnRecipes} />
        <Route exact path='/user/search' component={SearchRecipes} />
      </div>
    </Router>
  )
}
*/
export default MainPageUser

