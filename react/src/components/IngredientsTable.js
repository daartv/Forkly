// Ingredients Table
import React, { Component } from 'react'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import ErrorDialog from './ReqFieldErrorDialog'
// import EditTable from './editTableDev'

import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import Dialog from 'material-ui/Dialog'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {orange500, blue500} from 'material-ui/styles/colors'

const styles = {

  containerStyle: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Roboto, sans-serif'
  },
  formContainer: {
    margin: '0 auto',
    display: 'block',
    padding: '10px',
    margin: '5% 0 10%',
    clear: 'both'
  },
  directionsBox: {
    width: 500,
    border: '1px'
  },
  ingredientsGrid: {
    margin: '10px 0px'
  },
  errorStyle: {
    color: orange500
  },
  underlineStyle: {
    borderColor: orange500
  },
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  },
  propContainer: {
    width: 200,
    overflow: 'wrap',
    margin: '5px auto 0'
  },
  propToggleHeader: {
    margin: '5px auto 5px'
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
  ingredientsRow: {
    width: '100%',
    backgroundColor: '#009688'
  },
  colHeader: {
    fontSize: '1.2em',
    fontWeight: '200',
    color: '#000',
    textAlign: 'center'
  },
  fabButton: {
    marginRight: 20,
    cursor: 'pointer'
  },
  uploadButton: {
    verticalAlign: 'middle'
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  },
  aligner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0px 10px 0px',
    display: '-ms-flexbox',
    display: '-webkit-flex'
  },
  headerH2: {

  },
  headerContainer: {
    display: 'inline-block',
    // borderBottom: '2px solid #cccccc',
    padding: '2px',
    margin: '10px'
  },
  recipeNameBox: {
    display: 'inlineBlock',
    marginRight: 'auto'
  },
  imageLocal: {
    display: 'inlineBlock',
    marginLeft: 'auto'
  },
  recipeName: {
    width: 200,
    marginBottom: '5px'
  },
  buttonStyle: {
    display: 'flex',
    flexFlow: 'row nowrap',
    marginTop: 10
  }
}

class AddIngredientsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      alertError: false
    }
    this.onChange = this.onChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onRecipeSave = this.onRecipeSave.bind(this)
  }
  onChange (row) {
    const ingredientInd = row.id

    let updatedIngredient = {
      quantity: row.columns[0].value,
      units: row.columns[1].value,
      ingredient: row.columns[2].value
    }

    this.props.handleChange(ingredientInd, updatedIngredient)
  }

  onRecipeSave (event) {
    event.preventDefault()
    this.props.handleRecipeSave()
  }

  handleChange (event) {
    let value = event.target.value
    let field = event.target.name
    this.props.handleInputChange(field, value)
  };

  render () {
    let { recipeName, ingredients, recipeDirections, forking } = this.props.stats
    const recipeImage = this.props.stats.recipeImage || 'https://lh3.googleusercontent.com/TgEXw13nhbMEVLiMedgYdTdG--B45cR-TlT3nQY-zlovuCs95Uq0JK3vRuVe-KA7MDCeR_tqT2ZO9_WFFWwTvW4=s730-e365'

    const isDisabled = this.props.isDisabled
    const fieldType = isDisabled ? 'ReadOnly' : 'TextField'

    recipeName = recipeName || ''
    recipeDirections = recipeDirections || ''

    let rows = this.props.ingredients.map((ingredient, ind) => {
      let col = {columns: [], index: ind}
      Object.keys(ingredient).forEach(key => {
        col.columns.push({value: ingredient[key], ref: key})
      })
      return col
    })

    const headers = [
        {value: 'Units', type: fieldType, width: 200},
        {value: 'Amount', type: fieldType, width: 200},
        {value: 'Ingredient', type: fieldType, width: 200}
    ]

    return (

      <div style={styles.formContainer}>
        <div style={{backgroundImage: `url('${recipeImage}')`, backgroundSize: 'cover', width: '100%', height: '30vh'}}>
        e
        </div>
        <div style={styles.headerContainer}>
          <h2 style={styles.headerH2}>Recipe:</h2>
        </div>
        <div style={styles.aligner}>
          <div style={styles.recipeNameBox}>
            <TextField multiLine disabled={isDisabled} name='recipeName' defaultValue={recipeName} onChange={this.handleChange} style={styles.recipeName}
              floatingLabelText='Recipe Name'
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
             />
          </div>
          <div style={styles.imageLocal}>

            <FlatButton
              label='+ Choose an Image'
              labelPosition='before'
              style={styles.uploadButton}
              containerElement='label'
            >
              <input type='file' style={styles.uploadInput} />
            </FlatButton>

          </div>
        </div>

        <div style={styles.ingredientsGrid}>
          <div style={styles.headerContainer}>
            <h2 style={styles.headerH2}>Ingredients:</h2>
          </div>
          <EditTable forking={forking}
            onChange={this.onChange}
            rows={rows}
            headerColumns={headers}
          />
        </div>
        <div style={{margin: '0 auto'}}>
          <h2 style={styles.headerH2}>Directions:</h2>
          <TextField multiLine name='recipeDirections' defaultValue={recipeDirections} disabled={isDisabled} style={styles.directionsBox} onChange={this.handleChange}
            floatingLabelText='Directions'
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            />
        </div>
        <div>
          <RaisedButton type='submit' onClick={this.onRecipeSave} label='Save Recipe' className='addRecipeSaveButton' primary />
        </div>
      </div>
    )
  }
}

export default AddIngredientsTable

/* <Table
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
        </Table> */
