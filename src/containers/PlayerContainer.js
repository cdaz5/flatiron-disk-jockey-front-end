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
    console.log(this.props.video)
    return !!this.props.video.id ?  <YouTube id='pray'
      videoId={this.props.video.id.videoId}
      onReady={this.onReady.bind(this)}

    /> : null
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
        <Button.Group labeled>
          <Button icon='play' content='Play' onClick={this.playVideo} />
          <Button icon='pause' content='Pause' onClick={this.pauseVideo} />
          <Button icon='stop' content='Stop' onClick={this.stopVideo} />
        </Button.Group> : null
      }
      </div>
    )
  }
}
