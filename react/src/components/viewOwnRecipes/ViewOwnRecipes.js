import React from 'react'
import OwnRecipeResultEntry from '../ownRecipeResultEntry/OwnRecipeResultEntry'
import ReactGridLayout from 'react-grid-layout'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 900,
    height: 900,
    overflowY: 'auto'
  }
}

const tilesData = [
  {
    img: 'http://www.amaizeyou.com/images/galleryfull/perico_arepa.jpg',
    title: 'Perico Arepa',
    ingredients: 'arepa, perico'
  },
  {
    img: 'https://static1.squarespace.com/static/55e1863be4b00445ea1a172c/t/566ee2ed69492ec626cac84b/1450107630271/',
    title: 'Pabellon Arepa',
    ingredients: 'pabellon, arepa'
  },
  {
    img: 'http://aiesec.org.ve/wp-content/uploads/2016/09/5.-Catira.jpg',
    title: 'Catira Arepa',
    ingredients: 'arepa, chicken, cheese'
  },
  {
    img: 'https://4.bp.blogspot.com/-UUI3Ekw6unM/VvCULshx6wI/AAAAAAAAAJg/qa4Re0kbuVYdweMyLxPuNWW1afW8bVQjA/s1600/20160320_105808.jpg',
    title: 'Reina Pepiada',
    ingredients: 'arepa, avocado, chicken'
  },
  {
    img: 'http://2.bp.blogspot.com/-LBeAO-1eToA/VkDtAnaa1nI/AAAAAAAAAe4/M0bw1vteVjU/s1600/arepa_domino.jpg',
    title: 'Arepa Domino',
    ingredients: 'arepa, white cheese, black beans'
  },
  {
    img: 'http://momsla.com/wp-content/uploads/2012/10/DSC01078.jpg',
    title: 'Ham&Cheese Arepa',
    ingredients: 'ham, cheese, arepa'
  }
]

const ViewOwnRecipes = () => {
/*  return (
    <div style={styles.root}>
    <GridList
      cellHeight={400}
      style={styles.gridList}
    >
      <Subheader>Your recipes</Subheader>
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          subtitle={<span>by <b>{tile.ingredients}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
  ) */

  const layout = [
  {i: 'a', x: 0, y: 0, w: 3, h: 1.5, static: true},
  {i: 'b', x: 3, y: 0, w: 3, h: 1.5, static: true},
  {i: 'c', x: 6, y: 0, w: 3, h: 1.5, static: true},
  {i: 'd', x: 0, y: 12, w: 3, h: 1.5, static: true},
  {i: 'e', x: 3, y: 12, w: 3, h: 1.5, static: true},
  {i: 'f', x: 6, y: 12, w: 3, h: 1.5, static: true}
  ]
  return (
    <ReactGridLayout className='layout' layout={layout} cols={9} rowHeight={40} width={window.innerWidth}>
      <div key={'a'}>
        <OwnRecipeResultEntry />
      </div>
      <div key={'b'}>
        <OwnRecipeResultEntry />
      </div>
      <div key={'c'}>
        <OwnRecipeResultEntry />
      </div>
      <div key={'d'}>
        <OwnRecipeResultEntry />
      </div>
      <div key={'e'}>
        <OwnRecipeResultEntry />
      </div>
      <div key={'f'}>
        <OwnRecipeResultEntry />
      </div>
    </ReactGridLayout>
  )
}

export default ViewOwnRecipes
