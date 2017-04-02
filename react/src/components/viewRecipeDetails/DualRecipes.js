import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import IngredientsDirections from './IngredientsDirections'

class CardExampleWithAvatar extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { name,  _creator, forks, directions, ingredients } = this.props.stats
    console.log(this.props.isComparison)
    const { compare } = this.props
    const recipeContent = compare ? <IngredientsDirections recipeStats={this.props.stats} /> : null
    return (
      <div>
      <div>
      <Card style={this.props.styles}>

        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="https://files.slack.com/files-tmb/T3YD9REQK-F4ST7FEV8-ec5103a4b2/cake_example_img_360.jpg" width="240px" />
        </CardMedia>
        <CardText>
        {console.log('DID THIS GET HERE', this.props.stats)}
           Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
      </div>
      <div>
        {recipeContent}
      </div>
      </div>

  );
  }
}

export default CardExampleWithAvatar