import React, {Component} from 'react';
import Search from '../components/Search'
import YouTube from 'react-youtube'
import { Button, Icon } from 'semantic-ui-react'


export default class PlayerContainer extends Component {
    constructor() {
      super();

      this.player = null
    }


  onReady = (e) => {
    const event = e
    this.player = event.target
    this.player.setVolume(50)
    this.props.onSetPlayer(event, this.props.position)

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

  renderIframe = () => {
    if(this.props.video.youtube_id){
      return (
        <YouTube id='pray'
          videoId={this.props.video.youtube_id}
          onReady={this.onReady.bind(this)}
        />
      )
    } else {

    return !!this.props.video.id ?  <YouTube id='pray'
      videoId={this.props.video.id.videoId}
      onReady={this.onReady.bind(this)}

    /> : null
   }
  }

  handleVideoClick = (result) => {
    this.props.onVideoClick(result, this.props.position)
  }

  render() {
    return (
      <div>
        <Search handleVideoClick={this.handleVideoClick} />
        <div className="videoWrapper">{this.renderIframe()}</div>
        {this.props.video.id ?
        <Button.Group labeled fluid='true' clasName='button-group'>
          <Button color='black' inverted icon='play' content='Play' onClick={this.playVideo} />
          <Button color='black' inverted icon='pause' content='Pause' onClick={this.pauseVideo} />
          <Button color='black' inverted icon='stop' content='Stop' onClick={this.stopVideo} />
        </Button.Group> : null
      }
      </div>
    )
  }
}
