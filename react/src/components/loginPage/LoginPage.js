import React, {Component} from 'react'
import $ from 'jquery'
import SignUpPage from '../signUpPage/SignUpPage'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // username: '',
      // password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    console.log('username: ', this.state.username)

    var user = {
      username: this.state.username,
      password: this.state.password
    }

    $.ajax({
      url: '/login',
      type: 'POST',
      // contentType: 'application/JSON',
      data: JSON.stringify(user),
      success: function (data) {
        console.log('successful login post')
      },
      error: function (err) {
        console.log('login error')
      }
    })
  }

  componentDidMount () {
    $.ajax({
      url: '/verifylogin',
      type: 'GET',
      success: function (user) {
        console.log('req.user object: ', user)
      },
      error: function (err) {
      }
    })
  }

  render () {
    if (this.props.username === null) {
      return (
        <div>
          <a className='loginFacebook' href='/auth/facebook'>Login with Facebook</a>
          <Link to='signup'>Sign up for an account</Link>
        </div>
      )
    } else {
      return (
        <div>Welcome, {this.props.username}
          <Link to='/home/'> Go to your page</Link>
        </div>
      )
    }
    // return (
    //   <div>
    //     <h1>Login</h1>
    //     <form onSubmit={this.handleSubmit}>
    //       <label>
    //         Username:
    //         <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange}/>
    //       </label>
    //       <label>
    //         Password:
    //         <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
    //       </label>
    //       <input type="submit"/>
    //     </form>
    //   </div>
    // )
  }
}

export default LoginPage
