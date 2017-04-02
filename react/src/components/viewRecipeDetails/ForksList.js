import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

const tilesData = [
 {
    img: 'https://files.slack.com/files-tmb/T3YD9REQK-F4ST7FEV8-ec5103a4b2/cake_example_img_360.jpg',
    title: 'Breakfast',
    author: 'jill111',
    id: 555
  },
  {
    img: 'https://www.chowstatic.com/assets/recipe_photos/30175_easy_pumpkin_pie.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
    id: 556

  },
  {
    img: 'https://files.slack.com/files-tmb/T3YD9REQK-F4ST7FEV8-ec5103a4b2/cake_example_img_360.jpg',
    title: 'Breakfast',
    author: 'jill111',
    id: 557
  },
  {
    img: 'https://www.chowstatic.com/assets/recipe_photos/30175_easy_pumpkin_pie.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
    id: 558

  },
  {
    img: 'https://files.slack.com/files-tmb/T3YD9REQK-F4ST7FEV8-ec5103a4b2/cake_example_img_360.jpg',
    title: 'Breakfast',
    author: 'jill111',
    id: 559
  },
  {
    img: 'https://www.chowstatic.com/assets/recipe_photos/30175_easy_pumpkin_pie.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
    id: 556

  }
];

/**
 * This example demonstrates the horizontal scrollable single-line grid list of images.
 */
const GridListExampleSingleLine = () => (
  <div style={styles.root}>
    <GridList style={styles.gridList} cols={2.2}>
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default GridListExampleSingleLine;