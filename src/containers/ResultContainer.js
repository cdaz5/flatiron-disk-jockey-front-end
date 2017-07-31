import React, {Component} from 'react';
import YouTube from 'react-youtube'
import Result from '../components/Result'
import { Button, Icon } from 'semantic-ui-react'
import { Grid, Image } from 'semantic-ui-react'

export default class ResultContainer extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="resultBottom">
        <Grid relaxed columns={4}>
          {this.props.mashups.map((mashup) => < Result mashupInfo={mashup} playResult={this.props.handlePlayResult} />)}
        </ Grid>
      </div>
    )
  }
}
