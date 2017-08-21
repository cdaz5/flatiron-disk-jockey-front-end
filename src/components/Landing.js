import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import Result from './Result'
import SaveModal from './SaveModal'
import {Button, Segment, Divider, Grid, Image} from 'semantic-ui-react'

const BASE_URL = process.env.REACT_APP_API

class Landing extends React.Component {

  state = {
    landingMashups: []
  }

  componentDidMount = () => {
    fetch(`${BASE_URL}/mashups`, {
      headers: this.headers()
    }).then(res => res.json())
    .then(landingMashups => this.setState({
      landingMashups: landingMashups
    }))
  }

  headers () {
    return {
      'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    }
  }

  handleLanding = (event) => {
    return (
      alert("Sign Up to Play Mashups!")
    )
  }

  shouldRender = () => {
    return (
      this.state.landingMashups ?
      this.state.landingMashups.map((mashup) => < Result mashupInfo={mashup} playResult={this.handleLanding} />)
      : null
    )
  }
  render(){
  return(

    <div className="parallax">
      <Grid>
      <Grid.Row columns={3}>
        <Grid.Column>
        </Grid.Column>

        <Grid.Column>
        <div className="center">
         <Button.Group size="massive">
          <Link to="/signup"> <Button color="grey" size="massive"> Sign Up </Button> </Link>
          <Button.Or />
          <Link to="/login"> <Button positive color="grey" size="massive"> Login </Button> </Link>
         </Button.Group>
        </div>
        </Grid.Column>

        <Grid.Column>
        </Grid.Column>
      </Grid.Row>
      </Grid>
      <div className="landingResult">
        <Grid relaxed columns={4} >
          {this.shouldRender()}
        </Grid>
      </div>
    </div>
  )
 }
}

export default Landing
