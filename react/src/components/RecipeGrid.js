import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '5%'
  },
  gridList: {
    width: '90%',
    height: '90%',
    overflowY: 'auto'
  },
};


class RecipeGrid extends Component {
  constructor(props){
    super(props);
    this.getRecipeInfo = this.getRecipeInfo.bind(this);
  }

  getRecipeInfo(recipeItem){
    let recipeId = recipeItem.id
    console.log(recipeId)
    this.props.handleClick(recipeId)
  }

  render() {
    let tilesData = this.props.stats

      return (
        <div style={styles.root}>
        <GridList
          cellHeight={180}
          style={styles.gridList}
          cols={4}
          rows={4}
        >
          <Subheader>{}</Subheader>
          {tilesData.map((tile, ind) => (
            <GridTile
              onClick={this.getRecipeInfo.bind(this, tile)}
              key={ind}
              title={tile.title}
              subtitle={<span>by <b>{tile.author}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={tile.img} />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default RecipeGrid