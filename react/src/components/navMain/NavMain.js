import React, { Component, PropTypes } from 'react'

import FlatButton from 'material-ui/FlatButton'

import style from './navMain-css'

const { container, title, button } = style

class NavMain extends Component {
  handleRouting (event, route) {
    event.preventDefault()
    this.context.router.history.push(route)
  }

  render () {
    return (
      <div style={container}>
        <h1 style={title}>forkly</h1>
        <FlatButton labelStyle={button} style={button} label='Join' onClick={event => this.handleRouting(event, '/signup')} />
        <FlatButton labelStyle={button} style={button} label='Log In' onClick={event => this.handleRouting(event, '/login')} />
        <FlatButton labelStyle={button} style={button} label='Enter' onClick={event => this.handleRouting(event, '/forkly')} />
      </div>
    )
  }
}

NavMain.contextTypes = {
  router: PropTypes.object
}

export default NavMain
