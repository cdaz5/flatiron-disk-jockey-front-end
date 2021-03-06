import React, {Component} from 'react';
import Nav from '../components/Nav'
import PlayerContainer from './PlayerContainer'
import { Grid, Segment, Divider } from 'semantic-ui-react'
import MixerContainer from './MixerContainer'
import ResultContainer from './ResultContainer'

const BASE_URL = process.env.REACT_APP_API

export default class AppContainer extends Component {
  constructor() {
    super();

    this.state = {
    playerLeft: null,
    playerRight: null,

      leftVideo: {},
      rightVideo: {},
      allMashups: []
    }
  }


  componentDidMount = () => {
    fetch(`${BASE_URL}/mashups`, {
      headers: this.headers()
    }).then(res => res.json())
    .then(allMashups => this.setState({
      allMashups: allMashups
    }))
  }

  updateMashups = () => {
    fetch(`${BASE_URL}/mashups`, {
      headers: this.headers()
    }).then(res => res.json())
    .then(allMashups => this.setState({
      allMashups: allMashups
    }))
  }

  headers () {
    return {
      'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    }
  }

  handleSetPlayer = (event, position) => {
    console.log(event.target)
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

  handlePlayResult = (leftVideo, rightVideo) => {
    console.log(leftVideo, rightVideo)
    this.setState({
      leftVideo: leftVideo,
      rightVideo: rightVideo
    })
  }

  render() {
    return (
      <div className="parallax">
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column stretched>
              <Segment className='player-container'>
                <PlayerContainer
                  video={this.state.leftVideo}
                  position="left"
                  onVideoClick={this.handleVideoClick}
                  onSetPlayer={this.handleSetPlayer}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column width={4} stretched>
              <Segment className='mixer-container'>
                <MixerContainer
                  updateMashups={this.updateMashups}
                  leftVideoEvent={this.state.playerLeft}
                  rightVideoEvent={this.state.playerRight}
                  leftVideo={this.state.leftVideo}
                  rightVideo={this.state.rightVideo}
                  allMashups={this.state.allMashups}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column stretched>
              <Segment className='player-container'>
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

              <div>
                < ResultContainer handlePlayResult={this.handlePlayResult} mashups={this.state.allMashups}/>
              </div>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
