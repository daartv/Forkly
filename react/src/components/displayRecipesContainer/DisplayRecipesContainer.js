import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import style from './displayRecipesContainer-css'

const { container, gridList } = style

const DisplayRecipesContainer = (props) => {
  // console.log('DisplayRecipesContainer props' ,props)
  const { state, setStateThroughProps, recipes, renderSelectedRecipe } = props

  const handleClick = (event, selectedRecipe) => {
    event.preventDefault()
    const recipeID = selectedRecipe.id
    // console.log('recipe is', selectedRecipe)
    renderSelectedRecipe(recipeID)
    // console.log('DisplayRecipesContainer this', )

  }

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
            onClick={(event) => handleClick(event, recipe)}
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

export default DisplayRecipesContainer
