import React, { Component } from 'react'
import Subheader from 'material-ui/Subheader'
import style from './viewRecipeDetails-css'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ActionGrade from 'material-ui/svg-icons/action/grade'

class IngredientsDirections extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    console.log('this.props', this.props)
  }

  render() {
    return (
      <div style={style.detailsContainer} >
        <Subheader inset={true}>Recipe Details</Subheader>
        <Divider />
        <List>
          {          
            this.props.ingredients
            .map((detail, index) => {
              return <ListItem 
                key={index}
                primaryText={`${detail.quantity} ${detail.units} ${detail.ingredient}`}
                leftIcon={<ActionGrade color='B3E5FC' />}
              />
            })
          }
        </List>
      </div>
    )
  }
}

export default IngredientsDirections