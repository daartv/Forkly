import React, { Component } from 'react'
/**
 * Utilities
 */
 //Tests
import RRDOM from 'react-router-dom'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import axios from 'axios'

/**
 * Components
 */
import Main from './components/main/Main'
import MainPageUser from './components/mainPageUser/MainPageUser'
import MainPageNonUser from './components/mainPageNonUser/MainPageNonUser'
import SignUpPage from './components/signUpPage/SignUpPage'
import LoginPage from './components/loginPage/LoginPage'
import AddRecipe from './components/AddRecipe'
// Changes
import ProfilePageUser from './components/profilePageUser/ProfilePageUser'
import ViewOwnRecipes from './components/viewOwnRecipes/ViewOwnRecipes'
import SearchRecipes from './components/searchRecipes/SearchRecipes'
import ViewSelectedRecipe from './components/viewRecipeDetails/ViewRecipeDetails'
import MockData from './components/mainPageUser/MockData'
// changes

/**
 * Styles
 */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: null,
      currentRecipe: [],
      /* Changes */
      open: false,
      value: 1,
      /* Profile Page User */
      userID: '',
      userName: '',
      recipes: MockData,
      originalRecipes: MockData,
      /* Tab Bar User */
      selectedView: 'User',
      selectedRecipeName: '',
      selectedRecipeMethods: [],
      selectedRecipeIMG: null
      /* Changes  */
    }

    this.renderSelectedRecipe = this.renderSelectedRecipe.bind(this)
  }

  componentDidMount () {
    // this.getUsername()
  }

  session () {
    return true
    /* * change to true or false to 'mimic' a session * */
    /* * should return true if session is active else return false * */
  }

  checkSession () {
    if (this.session()) {
      return <Redirect to='/home/' />
    } else {
      console.log('no session')
      return <Redirect to='/welcome' />
    }
  }

  setStateThroughProps (event, newStateValue) {
    event.preventDefault()
    this.setState({ newStateValue })
  }

  renderSelectedRecipe (recipeID) {
    axios.get(`/api/recipes/${recipeID}`)
    .then(res => {
      const { selectedRecipeName, selectedRecipeMethods, selectedRecipeIMG } = res
      this.setState({ selectedRecipeName, selectedRecipeMethods, selectedRecipeIMG }, () => {
        // console.log('renderSelectedRecipe: ',this)
        // <Redirect to='/home/viewrecipe' />
        // this.props.history.push('/home/viewrecipe')
        // this.context.router.history.push('/home/viewrecipe')
        // ORIGINAL: this.context.router.history.push('/home/viewrecipe/' + recipeID)
      })
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

  renderComponentWithProps (component) {
    console.log('COMPONENT called', component)
    if (component === 'ProfilePageUser') {
      return <ProfilePageUser state={this.state} setStateThroughProps={this.setStateThroughProps} renderSelectedRecipe={this.renderSelectedRecipe} />
    }
    if (component === 'ViewOwnRecipes') {
      return <ViewOwnRecipes state={this.state} setStateThroughProps={this.setStateThroughProps} />
    }
    if (component === 'ViewSelectedRecipe') {
      return <ViewSelectedRecipe state={this.state} setStateThroughProps={this.setStateThroughProps} />
    }
    if (component === 'SearchRecipes') {
      return <SearchRecipes state={this.state} setStateThroughProps={this.setStateThroughProps} />
    }
  }

  render () {
    console.log('AddRecipe', {AddRecipe})
    console.log('this App', this)
    return (
      <Router>
        <div>
          <MainPageUser />
          <Route exact path='/' render={this.checkSession.bind(this)} />          
          <Route path='/welcome' component={Main} />
          <Route exact path='/home' render={() => this.renderComponentWithProps('ProfilePageUser')} />
          <Route path='/home/recipes' render={() => this.renderComponentWithProps('ViewOwnRecipes')} />
          <Route path='/home/viewrecipe' render={() => this.renderComponentWithProps('ViewSelectedRecipe')} />
          <Route exact path='/home/search' render={() => this.renderComponentWithProps('SearchRecipes')} />
          <Route exact path='/home/add' component={AddRecipe} />
          <Route path='/forkly' component={MainPageNonUser} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/login' component={LoginPage} />
        </div>
      </Router>
    )
  }
}

/*
Eugene
CHANGES: 
<Route exact path='/home/' render={this.checkSession.bind(this)} />
<Route path='/welcome' component={Main} />
<Route exact path='/home' component={MainPageUser} />

*/

export default App

/* * * * * * *
<div className='group'>
  <section className='floatLeft'>
    <img className='logo' src='assets/images/forkly.png' alt='FORKLY' />
    <h3 className='title username'><Login username={this.state.username} /></h3>
  </section>
  <section className='floatRight'>
    <nav>
      <div className='icon logout'>
        <img className='navButton' src='assets/images/logout.png' alt='Logout' />
        <span><Link to='/' onClick={this.logout}><br />Logout</Link></span>
      </div>
      <div className='icon addRecipe'>
        <img className='navButton' src='assets/images/addRecipe.png' alt='Add Recipe' />
        <span><Link to='/addrecipe'>Create Recipe</Link></span>
      </div>
      <div className='icon myForks'>
        <img className='navButton' src='assets/images/fork.png' alt='My Recipes' />
        <span><Link to='/myrecipes'>My Recipes</Link></span>
      </div>
      <div className='icon home'>
        <img className='navButton' src='assets/images/home.png' alt='Home' />
        <span><Link to='/'><br />Home</Link></span>
      </div>
    </nav>
  </section>
</div>
<br />
<br />
<br />
<footer>
  <br />
  <small>&copy; <a href='https://github.com/TeamForkly/Forkly'>TeamForkly</a></small>
</footer>
* * * * * * */

//           // <Route path='/signup' component={SignUpPage} />
//           // <Route path='/main' component={MainPageNonUser} />

//           // <Route path='/addrecipe' component={AddRecipe} />
//           // <Route path='/recipe' component={ViewFork} />

// // Fred, for good luck.
// // https://a248.e.akamai.net/secure.meetupstatic.com/photos/member/c/e/b/e/highres_253972926.jpeg
// // ,,,,,,,,,,,,,,,,,*,,,,,,,***************,,/(//*((/*/*/(((#(#####((((#%%%%(*,,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // ,,,,,,,,,,,,,,,,,,,,,,,,,,*************,*(#**,,*,/*/*///.**/*/(*#%%##((#(/*(#(*,,,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // *****,,,,,,,,,,,,,,,,,,,,,***,***,*****//#*(.*,,,/,**,,(#*##(#((##(*(#%##%%#(((///,,,*,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // *****,,,,,,,,,,,,,,,,,,,,****../,****,****/,(%%%/*(%(,(%(*/,%%%%#(%%//#%&&&&&%%#(/(/.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // ,****,,,,,,,,*,,,,,,,,,,,,,**,*//*/*/*,*/(//%##%(((//(%%&@&&%//(&&%%((%(#/*/((#%&&&&%%%#, ,.,,,,,,,,,,,,,,,,,*,,,,,,,,,,,,**,,,,,,,,,,,,,,,
// // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*,/(/,**(#(*(&&%%%(#(#%&%&&@@@@&&%%@@&&**#%%%%%***((%%%%(&%*..,,,,,,,,************,,,,,,,,*****,,,,,,,,,,,,
// // ,,,,,,,,,,,,,,,*,,,,,,,,,,,,,,,,,**/(#%(#%&&&&&%%&%&&@%#@#%@@@&@&%/@@#%&(#%(%&&&%*/%//,#,////#.,,,,,**************,,,,,,,,,,,,,,,,,,,,,,,
// // ,,,,,,,,,,,,*****,,,,,,,,********(%/%%%&%&&%&&&&&&@@&@@&&&@@@@@@@&%@@%////&&&(&%&%/##*,/(,%%/,,,,***************,,,,,,,,,,,,,,,,,,,,,,,
// // ******,***********************,/#%(%%#%%&&&&&&%&@@@@@@@@&&@@&@@&&@&%&&%&%(/**%&&#(&&%#&%(/(&&(/*,,************,,,,,,,,,,,,,,,,,,,,,,,,,
// // ****************************,,#(/%&%/(%%&(&&@&&&%&@@@@@@@&@@&&@&@&@@&%%%&&&&%(*&%&&#&&&%&&%#(%%#/,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // **************,,********,*//*#(#&*#%%&&&@@&@&&&@@@@@@&@@@@&&&&&&&&&&&&&&&&&&&&&&%#&%&@&@&&&%(##*,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // ,,*********************/#((/%%#%%/(#&&&@&@&&@@&&@@@&@@@@@@@&&&&&&&&&&&&&&&&&&&@&&&&&@&&%&&%&@&&@&&&(&%(,,,,,,,,,,,*******,,,,,,,,,,,,,,,,
// // **********************/#(%#(%#%#((%&&&&@@@&@@&&&&@&@@@&@@@@&@&&&&&&&&&@@&&&&&&&@@@@&@&&&&&&&&@@&@&%&%&%%*,,,,,,,,*,,,,,,,,,,,,,,,,,,,,,,,
// // *********************(#(%%(%#%%#%#%&%&&&@&@@&@@&&&&&@@&@&&&&&&&&&&&&&@@&&@@&&&&@@@&&&&@@&&@&&&&@@@&&&&%%&%(,,,,,,,,,,,,,,,,,,,,....
// // ******,,,,,*********/#(#&%##&%(%%%%&%#%&&&@&&@&&&&&&&&&&&&&&&&&&&&&&@&&@@@@@@@@@@@&&@&&@@@&@@@@@@@@&&@&%%/.
// // ****,,,,,,,,********((###(%%%##%%%%&%%&&@&&&&&&%&&@&&&%&&&&%&&%&&&&&&&&@&@@@@@@@@&@&@&&@@@@@@@@@@@@@&@@%&&%(.                 ....,,,,,,,,,
// // ******,,,,,,*******/%##%%#%####%##%((%&&&&&&&&&&&&&&%%%&%%%%&%&&&&&&&&&@@&&&@&@@@@@@@@&@@@@@@@@@@@@@@&@&%%(,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // ********,,,,*******/%((%#%%(#%#%%%(#(%&&&&&&&&&&&&&%%&&%##%%%&&&&&&&&@&&&&&&&&&@@@&@@@@@@@@@@@@@@@@@@&&&&%%%#,,,,,,,,,,,,,,,,,,,,,,,,,,,,*,
// // ,,,,,,,,,,,,,,,,,,,,(##&%%%###%#%%((#&&&&&@&%&%&&%&%%###%%%&&&&&&&&&&&&&&&&&&&&@@&@@@@@@@@@@@@@@@@@@@@@&&%%%(/,,,,,,,,,,*******************
// // ....               ./%#&%&%##%##%((##%&&&&&&%#%%&%%%##%%%%&%%%%&&&&&&&&&&&&&&&&@@@@@@@@@@@@@@@&@@@@@@@@&%&&%#(*,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// //             .......,/%##&%#(%%(##%/(#&&&%&%%(#%%##(##%(#%%#%%%%&&&&&&&&&&&&&@@@@&&@@@&@@@&@@@@&&@@@@@@@#%%%%%#/,,,,,,,,,,,,,,,,,,,,,,,,,,**
// // ....................(%%#(%##((#/##%%%%%%#/%###%###(####%#%%%%&&%&&&&&&&&&&@@&&&@@&&&&&&&@@&&&&@@@@@##%%%%#(*,,,,,,*********************
// // ..................../#%%#((#(#(##((#%##%##(#((##########%#%%%%%&&&&&&&&&&&&@&&&&&&&&&&&&&&&&&@@@&%#####%%%##(/,,*************************
// // ,,,,,,,,,,,,,,,,,,,,,###(((%/((#%(#%%%##(%%#######((#(###%#(#(#%&&&&&&&&&&&&&&&&&&&&&&&%&&&&&&&((((#####%(#%#/,,*************************
// // ,,,,,,,,,,,,,,,.....,%((/((#/(((((%##%#(%%%%##########%((((((#%&&%%%%%%######%%&&&%%%%&&%%%#((((((((((#####%#%#/,****************,,,,,,,,,,
// // ...................../(///##((/((####(#(#%####((####%#(((((##%%%%%##((((((#####(####%###((((///(((((((#####%%%#(,,,,,.............
// // .....................(#/(/##/(/#(#(#(%##(%%#(((((##%#((((((%%%%#((//******//(((((((//////////////(((#######%%%%(
// // .....................(#///((((/(#(/###(##(((////(##((((((%&&%#((//*************/*//////////////((((((#######%%%/
// // ....................,*(((((((#(###(###((#(//////(((((//%&&(//*****************/////////////////(((########%%%(
// // ....................,,/((/(#((((((##((##(///////(#(((#&&%#////***********/******/*/////////////(((((((######%%%(
// // ......................(//((#(#((((#((/##(//////////#%#(//*//**********///*//**/*////////////////((((((#####(%%%/
// // ..                    /*(//((((((#(#(##((/////////////////***//******//*/////***//////////////////(((#####((#@%,
// //                       ./(*(#(((/((%(###(/////*///////////*//*//*/**/**/////////*///////////////////(((((((//#@%
// //                        ////(((((#%%###/////*******///////*//***/********//*//////////////*/////////((((#####(&@(
// //                       ,*///(%%(####%(///////*********/**********************/*//*/////*//*///////((((#%%%&%%   ##
// //                       *(/,*((##((#@////////*******************************//////////*////////((##%&&&&@@@@@@&&&.
// //                       *(/((/((/#(*#*(&%(//////**/**/////*****************/////*////////////(#%&&@@@@&&&@@@@@@@&%&%%
// //                       ,(*/*////(##(*,,(%##(//////(#%&%%%#####%%#######(##((((((/((((#%%&&%%@@@@@@@@@&&&@@@@@@@&%%%(
// //                        /*//////((###*..*#%###(/@@@@@&&&%%&&&@@@%#@@@@@&&@@@@@@(/////(%@@@@@@@@@@@@&&&@@@@@@@#                      .*((
// //                        //*///((//##%(/*.,,%#&@@@@@@&&%%%%%@@@@%%@@@@@@@@@@@@@&%###%%&&@%&@@@@@@@@@&&@@@@@@@@%##                    ./(##&
// //                        ,/*///((//(###//*,*,@&%&&@@@@@&&%%%%%%&@@@@@@@@@@%&@@@@@@#/*///#%@%@@@@@@@@@@&&@@@@@@@&((.              .*/**/(#%#%@
// //                         /////((///(##(/****@/&&%&&@@@@&&%%%%%%&@@@@@@@@@%&@@@@@@#/*///(&@&&@@@@@@@&&&@@@@@@@&%/(              ,/((####%%%&@
// //                          ////(#/*/((#(/*****//&%%%%&&@&&&&&&%%&&@@@@@@@@&&@@@@@&(*///((%&@@@@@&&&&&&@@@@@@@&&/(             .*(#%%&&&&&&&&@
// //                           ////*/(*//((//****//%&%%#%%%&&&&&@&&&@@@@@@@@@@@@@&&&(//*//((#%%&&&&&&&&&&@@@@@&&&&*             ,/#%%&&&&@@&&&&@
// //                            ,///***,(////******/%%%%#####%%%%&&&&&&@&&&&&&&&&&&(///**//(#%#&&&&&&&&&&&&&&&&#*   .,***,.,*/#%&&&&&&@@@@@@@@
// //                              */***,/////*******/##%%%######%%%%%%&&&&&&&&&&&%(////////((#%%%#&&&&&&&&&#####/,(%%%%%#(///#%&&&&@@@@@@@@@@@
// //                               *****//////********/###%%%#######%%%%%%%%&&(////////*/(((%%%#(((((((((#######/#%&&&&&%#%%%&&&&&@@@@@@@@@@@@
// //                                **,***,/////*/*******//(%###%%%%%%%%%%#////////(/////*((##%##((((((((#######/(%&&%%%&&%%%&&&@@@@@@@@@@@@@@
// //                                 .***,**//***/***********//*//**/******//////////////////(((#%#((((((((########((###(#%&&%%&&@@@@@@@@@@@@@@@
// //                                     ,,*/*///**********/**//**/*******/////(////////////((/(#%%#(((((((######(&&%((/(#%&@%%&@@@@@@@@@@@@@@@@
// //                                     .,***////************//*********////////////(/////////((#%#(((/((((#####%&&&&&&@@@@@&%&@@@@@@@@@@@@@@@@
// //                                      ,**,**///***/****/***/*******////***///////////*****//(##(((////((####/&&&@@@@@@@@@@%&@@@@@@@@@@@@@@@@
// //                                      .,*,*/**//******************/*//******/////////*//////(#(####((/((####%&&@@@@@@@@@@@&@@@@@@@@@@@@@@@@@
// //                                       ,*******//******************/******////(/((/((///((#%%##(%####((((###&&&@@@@@@@@@@@&@@@@@@@@@@@@@@@@@
// //            ....                        *************/*********/***///////////((((((((/((#%%%%####(####(###&&@@@@@@@@@@@@@&@@@@@@@@@@@@@@@@@
// // ##(/,*/*,,%#####((/,.                .*********/***/***/******/*////////(//(/((//(((((/((#####(#######(#(%&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @&%&((%%#&&%##&&&&%##/.       .*/(#%##****//***/**///******/////////(////(////*//(((///((#((######((#%%&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@&&@&&%#%&&&&&%%&@@&&&&%#(*.   ///#%%%%#,***/*/*/*/***//****///////////////////(//////(#%%%%#########%#&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // &@@&@@@&&%&@@&&&%&@@@@@&&&&%#(*(%#(#%%%%%#**/*///////********///((((/////(#(((((((((##((##########((#&&%&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@&@@@@@&@@@&&&&@@@@@@@@@@&&%#((##%&&&&%***///((/(//***/*///(///////////////////(//((((((((((###(%%%@&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // %@@@@@@@@@@@@@@@&&&@@@@@@@@@@@@@&%(#%&&&&***///**//(/*//((/(/(/#//*//*//////(/(((/(((((((((((##%%%&@@&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // &&@@@&@@@@@@@@@@@&&@@@@@@@@@@@@@@&&%(&@&&&&///*/**/*/((///(((////////*/(////////(((((#(((((#(((##%%&@@@@&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // &&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&%&@@@&&(((///*/*(((/(((((((/(((((/////////////(//(((((#(###%%@@@@@@&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // &@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&%@@@@#(/////**/((####(/((((/(//////////////(/((((/(/(#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&@@@@(((/////**//((####(((//(////////////(///(((((##&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&@@@@%#(////////*////##((/*////*//*////(/////((/((#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&@@@@@%((////(/////(((/(/(///**/////////((//####&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&(///////(///((#(((/(/(/////((((#(((((%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(//**///////////(/////////(//(%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
