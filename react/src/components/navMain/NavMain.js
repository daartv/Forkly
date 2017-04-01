import React, { Component, PropTypes } from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

class NavMain extends Component {
  handleRouting (event, route) {
    event.preventDefault()
    this.context.router.history.push(route)
  }

  render () {
    return (
      <div>
        <Router>
          <div>
            <FlatButton label='Join' secondary onClick={event => this.handleRouting(event, '/signup')} />
            <FlatButton label='Log In' secondary onClick={event => this.handleRouting(event, '/login')} />
            <FlatButton label='Enter' secondary onClick={event => this.handleRouting(event, '/forkly')} />
          </div>
        </Router>
      </div>
    )
  }
}

NavMain.contextTypes = {
  router: PropTypes.object
}

export default NavMain
