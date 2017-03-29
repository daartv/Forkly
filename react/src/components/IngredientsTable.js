//Ingredients Table
import React, { Component } from 'react'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'

import EditTable from './editTableDev'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import {orange500, blue500} from 'material-ui/styles/colors'

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
  propContainer: {
    width: 200,
    overflow: 'wrap',
    margin: '5px auto 0',
  },
  propToggleHeader: {
    margin: '5px auto 5px',
  },
  ingredientsContainer: {
    width: '100%',
    maxWidth: 700, 
    margin: '0 auto'
  },
  ingredientsHeader: {
    fontSize: '2em',
    fontWeight: '600',
    color: '#000',
    textAlign: 'center'
   },
   ingredientsRow : {
    width: '100%',
    backgroundColor: '#009688'
  },
  colHeader: {
    fontSize: '1.2em',
    fontWeight: '200', 
    color: '#000', 
    textAlign: 'center'
  }
}


const containerStyle = {
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'Roboto, sans-serif'
}

const buttonStyle = {
  display: 'flex',
  flexFlow: 'row nowrap',
  marginTop: 10
}



class AddIngredientsTable extends Component {
constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onChange(row) {
    const ingredientInd = row.id
    let updatedIngredient = row.columns.reduce((accum, column) => {
      accum[column.ref] = column.value;
      return accum;
    },{})

    console.log(row.id, updatedIngredient);
    this.props.handleChange(ingredientInd, updatedIngredient);
  }

  handleChange(event){
  let value = event.target.value
  let field = event.target.ref
   this.props.handleInputChange(field, value);
  };

  render() {
    let { recipeName, ingredients, directions, forking } = this.props
    recipeName = recipeName || ''
    directions = directions || ''

    let rows = ingredients.map((ingredient, ind) => {

    console.log(ingredientInd, updatedIngredient)
    this.props.handleChange(ingredientInd, updatedIngredient);
  }
  handleToggle(event, toggled){
    console.log(444)
  };

  handleChange(event){
    console.log('d');
  };

  render() {
    let rows = this.props.ingredients.map((ingredient, ind) => {
      let col = {columns: [], index: ind}
      Object.keys(ingredient).forEach(key => {
        col.columns.push({value: ingredient[key], ref: key})
      })
      return col;
    })

      const fieldType = this.props.edit === true ? 'TextField' : 'ReadOnly'

      const headers = [
        {value: 'Units', type: fieldType, width: 200},
        {value: 'Amount', type: fieldType, width: 200},
        {value: 'Ingredient', type: fieldType, width: 200} 
      ]
    return (
      <div>
      <div style={{margin: '0 auto'}}>


      <TextField ref="name" defaultValue={recipeName} onChange={this.handleChange} style={{width: 200}}

      <TextField style={{width: 200}}
       />
      </div>
      <div>

        <EditTable forking={this.props.forking}
        <EditTable style={{colspan: 3}}

        onChange={this.onChange}
        rows={rows}
        headerColumns={headers}
      />
      </div>
      <div style={{margin: '0 auto'}}>

      <TextField ref="directions" defaultValue={directions} style={{width: 500, height: 200, border: '1px'}}
      <TextField style={{width: 500, height: 200, border: '1px'}}
      floatingLabelText="Directions"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
    />
      </div>
      </div>
    );
  }
}


export default AddIngredientsTable


/*<Table  
          height={this.props.styleProps.height}
          fixedHeader={this.props.styleProps.fixedHeader}
          fixedFooter={this.props.styleProps.fixedFooter}
          selectable={this.props.styleProps.selectable}
          multiSelectable={this.props.styleProps.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.props.styleProps.showCheckboxes}
            adjustForCheckbox={this.props.styleProps.showCheckboxes}
            enableSelectAll={this.props.styleProps.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="4" style={styles.ingredientsHeader}>
                Ingredients
              </TableHeaderColumn>
            </TableRow>
            <TableRow style={styles.ingredientsRow}>
              <TableHeaderColumn tooltip="Quantity">Quantity</TableHeaderColumn>
              <TableHeaderColumn tooltip="Units">Units</TableHeaderColumn>
              <TableHeaderColumn tooltip="Ingredient">Ingredient</TableHeaderColumn>
              <TableHeaderColumn tooltip="Remove Ingredient">Remove Ingredient</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.props.styleProps.showCheckboxes}
            deselectOnClickaway={this.props.styleProps.deselectOnClickaway}
            showRowHover={this.props.styleProps.showRowHover}
            stripedRows={this.props.styleProps.stripedRows}
          >
            {ingredients.map( (ingredient, index) => (
              <TableRow key={index}>
                <TableRowColumn readonly="false">{ingredient.quantity}</TableRowColumn>
                <TableRowColumn readonly="false">{ingredient.units}</TableRowColumn>
                <TableRowColumn readonly="false">{ingredient.ingredient}</TableRowColumn>
                <TableRowColumn readonly="true"></TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter>
          </TableFooter>
        </Table>*/
>>>>>>> 30ffc8e42b4163a0da1f54f7b964850de4f323ee
