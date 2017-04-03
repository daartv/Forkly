import React, { Component, PropTypes } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import style from './displayRecipesContainer-css'

const { container, gridList } = style

class DisplayRecipesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

    // this._renderSelectedRecipe = this._renderSelectedRecipe.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event, selectedRecipe) {
    // event.preventDefault()
    // const recipeID = selectedRecipe.id
    console.log('selectedRecipe is', selectedRecipe)
    // console.log('event is', event)
    this.props.setStateThroughProps(event, {activeRecipe: selectedRecipe})
    this.context.router.history.push('/home/viewrecipe')

  }
  render() {
    const { state, setRecipeState, setStateThroughProps, recipes, renderSelectedRecipe } = this.props
    // console.log(recipes)


    return (
      <div style={container}>
        <GridList
          cellHeight={240}
          style={gridList}
          cols={4}
          rows={4}
        >
          <Subheader>{}</Subheader>
          {recipes.map((recipe, idx) => (
            <GridTile
              onClick={(event) => this.handleClick(event, recipe)}
              key={idx}
              title={recipe.title}
              subtitle={<span>by <b>{recipe.author}</b></span>}
              actionIcon={<IconButton><StarBorder color='white' /></IconButton>}
            >
              <img src={recipe.img} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}

DisplayRecipesContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

export default DisplayRecipesContainer
