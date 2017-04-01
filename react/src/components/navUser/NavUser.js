import React from 'react'
import ViewOwnRecipes from '../viewOwnRecipes/ViewOwnRecipes'
import SearchRecipes from '../searchRecipes/SearchRecipes'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

const NavUser = () => {
  return (
    <div>
      <Router>
        <div>
          <h1>User Navigator</h1>
          <Link to='/user/recipes'>Your recipes</Link>
          <Link to='/user/search'>Search recipes</Link>
          <Route exact path='/user/recipes' component={ViewOwnRecipes} />
          <Route exact path='/user/search' component={SearchRecipes} />
        </div>
      </Router>
    </div>
  )
}

export default NavUser
