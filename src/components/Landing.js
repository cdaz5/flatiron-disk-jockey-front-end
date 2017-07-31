import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Segment, Divider, Grid, Image} from 'semantic-ui-react'


const Landing = (props) => {

  return(
    <div>
      <div className="parallax ui center aligned">
      <Link to="/signup"> <Button color="grey" size="massive"> Sign Up </Button> </Link>
      <Link to="/login"> <Button color="grey" size="massive"> Login </Button> </Link>
      </div>
    </div>
  )
}

export default Landing
