import React, {Component} from 'react';
import Nav from '../components/Nav'
import PlayerContainer from './PlayerContainer'
import { Grid, Segment } from 'semantic-ui-react'
import MixerContainer from './MixerContainer'
import ResultContainer from './ResultContainer'


export default class AppContainer extends Component {
    constructor() {
      super();

      this.state = {
      playerLeft: null,
      playerRight: null,

        leftVideo: {},
        rightVideo: {},
        results: []
      }
    }

  handleSetPlayer = (event, position) => {
    if(position === "left"){
      this.setState({
        playerLeft: event.target
      })
      console.log('hit left')
    } else {
      this.setState({
        playerRight: event.target
      })
      console.log('hit right')
    }
  }

  handleVideoClick = (result, position) => {
    if(position === "left"){
      this.setState({
        leftVideo: result
      })
    } else {
      this.setState({
        rightVideo: result
      })
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <PlayerContainer
                  video={this.state.leftVideo}
                  position="left"
                  onVideoClick={this.handleVideoClick}
                  onSetPlayer={this.handleSetPlayer}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>
                <MixerContainer
                  leftVideoEvent={this.state.playerLeft}
                  rightVideoEvent={this.state.playerRight}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <PlayerContainer
                  video={this.state.rightVideo}
                  position="right"
                  onVideoClick={this.handleVideoClick}
                  onSetPlayer={this.handleSetPlayer}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment />
              <div>
                < ResultContainer />
              </div>
              <Segment />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
