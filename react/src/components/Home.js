import React from 'react'
import $ from 'jquery'
import SearchRecipes from './searchRecipes/SearchRecipes'
import RecipeSearchResults from './RecipeSearchResults'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: null,
      recipes: []
    }
  }

  setSearchTerm (searchTerm) {
    this.setState({searchTerm: searchTerm})
  }

  searchRecipes (searchTerm) {
    // send ajax request to server, which then searches db for searchTerm
    // searchTermForAjax was 'searchTerm' which wasn't accepted as it was a duplicate search term
    let searchTermForAjax = {searchTerm: this.state.searchTerm}
    const context = this

    $.ajax({
      url: '/searchRecipes',
      type: 'POST',
      data: JSON.stringify(searchTermForAjax),
      // type: 'GET',
      // data: searchTerm,
      contentType: 'application/json',
      // upon success, adds results to this.state.recipes
      success: function (data) {
        console.log('ajax request to search recipes was successful!')
        console.log('response', data)
        context.setState({recipes: data})
      },
      error: function (err) {
        console.log('ajax request to search recipes failed')
      }
    })
  };

  render () {
    return (
      <div>
      <Link to='Login'>Log in to your account</Link>
      <SearchRecipes />
        <div className='results'>
          <ul>
            {this.state.recipes.map((recipe, index) => <RecipeSearchResults recipe={recipe} key={index} />)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
