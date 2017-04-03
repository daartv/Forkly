import React, { Component, PropTypes } from 'react'
/**
 * Utilities
 */
import { Link } from 'react-router-dom'
 /**
 * Styles
 */
import style from './navNonUser-css'
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

const { toolbar } = style

class NavNonUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  handleClose () {
    this.setState({open: false})
  }

  render () {
    return (
      <div>
        <Toolbar style={toolbar}>
          <ToolbarGroup>
            <IconButton tooltip='Hello World' onClick={this.handleToggle.bind(this)}>
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
    )
  }
}

NavNonUser.contextTypes = {
  router: PropTypes.object
}

export default NavNonUser
