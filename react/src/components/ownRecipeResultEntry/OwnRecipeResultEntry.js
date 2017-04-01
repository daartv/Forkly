import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const OwnRecipeResultEntry = () => {
  return (
  	<div>
  	<Card>
  	  <CardHeader
  	    title="Username"
  	  />
  	  <CardMedia 
    	  overlay={
          <CardTitle 
    	  	  title="Example recipe" 
    	  	  subtitle="One cup of awesomeness" 
    	    />
        }
  	  >
  	    <img 
        src="http://www.niagarabanquethall.com/wp-content/gallery/banquet-hall/Niagara-Banquet-Hall-%E2%80%93-Polish-Legion-St.Catharines-6.jpg"
        />
  	  </CardMedia>
  	  <CardText>
  	    This are the awesome steps for an awesome recipe
  	  </CardText>
  	  <CardActions>
  	  	<FlatButton label='Delete'/>
  	  	<FlatButton label='Edit'/>
  	  	<FlatButton label='Show more'/>
  	  </CardActions>
  	</Card>
    </div>
  )
}

export default OwnRecipeResultEntry
