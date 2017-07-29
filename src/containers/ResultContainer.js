import React, {Component} from 'react';
import YouTube from 'react-youtube'
import Result from '../components/Result'
import { Button, Icon } from 'semantic-ui-react'
import { Grid, Image } from 'semantic-ui-react'

const src = 'http://d3n1j8rr5smgk8.cloudfront.net/wp-content/uploads/Proboscis_monkey.jpg'

export default class ResultContainer extends Component {

  constructor() {
    super();
    this.state = {
      mashups: []
    }
  }

  componentDidMount() {
    let baseUrl = 'http://localhost:3000/api/v1'
    fetch(`${baseUrl}/mashups`, {
      headers: this.headers()
    }).then(res => res.json())
    .then(allMashups => this.setState({
      mashups: allMashups
    }))
  }

  headers () {
    return {
      'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    }
  }

  render() {
    return (
      <div className="resultBottom">
        <Grid relaxed columns={4}>
          {this.state.mashups.map((mashup) => < Result mashupInfo={mashup} />)}
        </ Grid>
      </div>
    )
  }
}
