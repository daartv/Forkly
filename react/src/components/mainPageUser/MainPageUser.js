import React from 'react'
import NavUser from '../navUser/NavUser'

const MainPageUser = () => {
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

export default MainPageUser
