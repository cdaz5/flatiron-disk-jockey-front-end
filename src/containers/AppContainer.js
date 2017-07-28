import React, {Component} from 'react';
import Nav from '../components/Nav'


export default class AppContainer extends Component {
    constructor() {
      super();

      this.playerLeft = null
      this.playerRight = null

      this.state = {
        leftVideo: {},
        rightVideo: {},
        results: []
      }
    }

  handleVideoClick = (result) => {
    this.setState({
      leftVideo: result
    })
  }

  onReady = (e) => {
    this.player = e.target
  }

  playVideo = () => {
    this.player.playVideo()
  }

  stopVideo = () => {
    this.player.stopVideo()
  }

  pauseVideo = () => {
    this.player.pauseVideo()
  }


  fetchVideo = () => {

  }
  renderIframe = () => {
    return !!this.state.leftVideo.id ?  <YouTube id='pray'
      videoId={this.state.leftVideo.id.videoId}
      opts={{
        height: '390',
          width: '640'}}
      onReady={this.onReady.bind(this)}

    /> : null
  }

  render() {
    return (
      <div>
        <Nav />
        <Search handleVideoClick={this.handleVideoClick} />
        {this.renderIframe()}
        <button type='button' onClick={this.playVideo}>Play</button>
        <button type='button' onClick={this.stopVideo}>Stop</button>
        <button type='button' onClick={this.pauseVideo}>Pause</button>

      </div>
    )
  }
}
