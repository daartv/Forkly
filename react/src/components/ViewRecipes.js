import React, { Component } from 'react'
import $ from 'jquery'
import RecipeGrid from './RecipeGrid'
import PageTabs from './PageTabs'
import axios from 'axios'
import Paper from 'material-ui/Paper'
const tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Morning',
    author: 'fancycrave1',
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
        padding: '0 20px',
        alignItems: 'center'
      },

      leftDashboard: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        padding: '0 20px'
      },

      rightDashboard: {
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
        padding: '0 20px'
      },
      statsBar: {
        height: 40,
        width: '100%',
        margin: 20,
        textAlign: 'center',
        display: 'block'
      },
      profilePic: {
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
      }
    }

class ViewRecipes extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userID: 'Test',
      userName: '',
      recipes: '',
      originalRecipes: ''
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
  // before initial render, use ajax call to retrieve all recipes belonging to user

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
   


  handleClick (recipeId) {
    // redirect to /recipes/recipeId
    const { router } = this.context
    router.history.push('/recipe/' + recipeId)
  }

  render () {
    const { userID, userName, recipes, originalRecipes } = this.state
    return (
      <div>
        <div style={styles.dashboard}>
          <div style={styles.leftDashboard}>
              <h2>{userID}</h2>
              <Paper style={styles.profilePic} zDepth={1} circle={true} />
          </div>
          <div style={styles.rightDashboard}>
            <Paper style={styles.statsBar} zDepth={1} />
          </div>
        </div>
          <div>
            <PageTabs stats={tilesData} handleClick={this.handleClick} />
          </div>
      </div>
    )
  }

}

ViewRecipes.contextTypes = {
  router: React.PropTypes.object
}

export default ViewRecipes

/*
//     if (this.state) {
//       this.state.recipes.forEach((recipe, index) => {
//         recipesArray.push(
//           <li className='recipeSingle'
//             key={index}
//             value={recipe}
//             onClick={() => this.handleClick(recipe._id)}>
//             {recipe.name}
//           </li>)
//       })

//       template =
//         <div className='myRecipes'>
//           <img className='myRecipeImage' src='assets/images/salmon.jpg' />
//           <h1 className='myRecipesTitle'>My Recipes</h1>
//           <ul className='recipesArray'>
//             {recipesArray}
//           </ul>
//           <br />
//           <br />
//         </div>
//     } else {
//       template =
//         <div >
//           <img className='myRecipeImage' src='assets/images/salmon.jpg' />
//           <h1 className='myRecipesTitle'>My Recipes</h1>
//           <div className='loadingText'>
//             <h3>Loading...</h3>
//             <br />
//             <h3>Please login or create your first recipe!</h3>
//             <br />
//             <br />
//           </div>
//         </div>
//     }
//     return (
//       template
//     )
//   }
// }*/