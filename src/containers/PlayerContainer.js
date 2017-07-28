import React, {Component} from 'react';
import Search from '../components/Search'
import YouTube from 'react-youtube'
import Nav from '../components/Nav'


export default class PlayerContainer extends Component {
    constructor() {
      super();

      this.player = null

      this.state = {
        leftVideo: {},
        rightVideo: {},
        leftPlayer: {}
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
