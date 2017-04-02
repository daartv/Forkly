import React, { Component } from 'react'
import $ from 'jquery'
import RecipeGrid from './RecipeGrid'
import PageTabs from './PageTabs'
import axios from 'axios'
import Paper from 'material-ui/Paper'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/Notifications'


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
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Camera',
    author: 'Danson67',
    id: 557
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Morning',
    author: 'fancycrave1',
    id: 558
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'dsakhfdjhasf',
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Cadsfdsafdasmera',
    author: 'Dadsklfjhdshfnson67',
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Mfdsg34fewforning',
    author: 'fancycrave1',
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hatewfeswasas',
    author: 'Hans',
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Hondsfdsafaey',
    author: 'fancycravel',
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegeewr3 tables',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water pdsafdsalant',
    author: 'BkrmadtyaKarki',
  },
]
    const styles = {
      dashboard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '0 10%',
        alignItems: 'center'
      },

      leftDashboard: {
        flexDirection: 'column',
        width: '30%',
        padding: '0 20px'
      },

      rightDashboard: {
        flexDirection: 'column',
        width: '60%',
        padding: '0 20px',
        wrap: 'nowrap'
      },
      statsBar: {
        width: '100%',
        margin: 20,
        display: 'table',
        padding: '2% 5%',
        borderSpacing: '10px',
        tableLayout: 'fixed'
      },

      profilePic: {
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
      },

       statDetail: {
        textAlign: 'center',
        display: 'table-cell',
        // justifyContent: 'space-around',
        padding: '2% 5%',
        wordWrap: 'break-word'
      }
    }

class ViewRecipes extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userID: '',
      userName: '',
      recipes: tilesData,
      originalRecipes: tilesData
    }
    this.handleClick = this.handleClick.bind(this);
  }

/*===================================
LOGIC TO WRITE
===================================*/
/*

Getting Recipe Info:
 - getRequest for all recipe ID's from the recipes array
    - get both current and original
    - map current to recipes
    - map original to original

User's Recipes:
  - filter the array of recipes and find any recipes where creator = userID

User's Forks:
  - can use same function to determine the forks

User's Latest: 
  - reverse the recipes array - make sure to keep same relation to the original recipes
    - best option is to simply keep same map function then run a reverse() so we can still have reference to the original recipe info.

Mapping the grid:
  - Array of objects: {img: recipe.img, ingredients: recipe.ingredients, directions, recipe.directions, recipe.orig = recipe.id}
    - make sure to add a <Link> around each</Link>
    - ref to original recipe location in the array

*/
  // before initial render, use ajax call to retrieve all recipes belonging to usercomponentDidUpdate(prevProps, prevState) {
  // only update chart if the data has changed
  // updateRecipeCategories() {
  //   const { recipes } = this.state
  //     let recipeCategories = {
  //       usersRecipes: [],
  //       forkedRecipes: []
  //     }
  //     recipeCategories[orderedRecipes] = recipes.reverse()
  //     recipes.forEach((recipe) => {
  //       if (recipe.creator === userID){
  //         recipeCategories.usersRecipes.push(recipe)
  //       } else {
  //         recipeCategories.forkedRecipes.push(recipe)
  //       }
  //     })
  //     this.setState({recipeStats: recipeStats})
  // }

  // componentDidMount() {
  //   const context = this

  //   axios.get('/getUserRecipes')
  //   .then((userInfo) => {
  //     let { id, name, recipes, originalRecipes } = userInfo
  //     context.setState({
  //       userID: id,
  //       userName: name,
  //       recipes: recipes,
  //       originalRecipes: originalRecipes
  //     })
  //   })
  // }


  // componentDidUpdate(prevProps, prevState){
  //   if (prevState.recipes.length !== this.state.recipes.length) {
  //   const { recipes } = this.state
  //     let recipeCategories = {
  //       usersRecipes: [],
  //       forkedRecipes: []
  //     }
  //     recipeCategories[orderedRecipes] = recipes.reverse()
  //     recipes.forEach((recipe) => {
  //       if (recipe.creator === userID){
  //         recipeCategories.usersRecipes.push(recipe)
  //       } else {
  //         recipeCategories.forkedRecipes.push(recipe)
  //       }
  //     })
  //     this.setState({recipeStats: recipeStats})
  //   } 
  // }
  
  

  handleClick (recipeId) {
    // redirect to /recipes/recipeId
    const { router } = this.context
    router.history.push('/recipe/' + recipeId)
  }

  render () {
    const { userID, userName, recipes, originalRecipes } = this.state

      let recipeStats = {
        usersRecipes: [],
        forkedRecipes: []
      }
      recipeStats.orderedRecipes = recipes.reverse()
      recipes.forEach((recipe) => {
        recipeStats.usersRecipes.push(recipe);
        // if (recipe.creator === userID){
        //   recipeStats.usersRecipes.push(recipe)
        // } else {
          recipeStats.forkedRecipes.push(recipe)
        // }
      })

    return (
      <div>
        <div style={styles.dashboard}>
          <div style={styles.leftDashboard}>
              <h2>{userID}</h2>
              <Paper style={styles.profilePic} zDepth={1} circle={true} />
          </div>
          <div style={styles.rightDashboard}>
            <div style={styles.rightDashboardRow}>
            <Paper style={styles.statsBar} zDepth={1} >
             
                <Paper style={styles.statDetail} zdepth={0}>
                 <h4>User's Recipes</h4>
                <p>{recipeStats.usersRecipes.length}</p>
                </Paper>
              
              
                <Paper style={styles.statDetail} zdepth={0}>
                 <h4>Forks</h4>
                <p>{recipeStats.forkedRecipes.length}</p>
                </Paper>
             
              
                <Paper style={styles.statDetail} zdepth={0}>
                 <h4>Been Forked</h4>
                <p>{5}</p>
                </Paper>
              
            </Paper>
            </div>
          </div>
        </div>
          <div>
            <PageTabs stats={tilesData} recipeStats={recipeStats} handleClick={this.handleClick} />
          </div>
      </div>
    )
  }

}

ViewRecipes.contextTypes = {
  router: React.PropTypes.object
}

export default ViewRecipes
