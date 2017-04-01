import React, { Component, PropTypes } from 'react'

import FlatButton from 'material-ui/FlatButton'

import style from './navMain-css'

class NavMain extends Component {
  handleRouting (event, route) {
    event.preventDefault()
    this.context.router.history.push(route)
  }

  render () {
    return (

      <div style={style}>
        <h1>forkly</h1>
        <FlatButton label='Join' secondary onClick={event => this.handleRouting(event, '/signup')} />
        <FlatButton label='Log In' secondary onClick={event => this.handleRouting(event, '/login')} />
        <FlatButton label='Enter' secondary onClick={event => this.handleRouting(event, '/forkly')} />
      </div>
    )
  }
}

NavMain.contextTypes = {
  router: PropTypes.object
}

export default NavMain
