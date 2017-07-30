import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Segment, Divider, Grid, Image} from 'semantic-ui-react'


const Landing = (props) => {

  return(
    <div>
      <Segment inverted>
        <Divider horizontal inverted> <div className="header"> Flatiron-Disk-Jockey </div> </Divider>
      </Segment>
     <Grid textAlign="center" columns={3} className="parallax">
     <Grid.Row columns={1}>


       <Grid.Column>

       </Grid.Column>


     </Grid.Row>
     
     <Grid.Row>
       <Grid.Column>
       </Grid.Column>

       <Grid.Column>
         <Link to="/signup"> <Button color="grey" size="massive"> Sign Up </Button> </Link>
         <Link to="/login"> <Button color="grey" size="massive"> Login </Button> </Link>
       </Grid.Column>

       <Grid.Column>
       </Grid.Column>
     </Grid.Row>

     </Grid>
    </div>
  )
}

export default Landing
