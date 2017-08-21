import React from 'react'
import SaveModal from '../components/SaveModal.js'
import { Button, Grid, Form, Header, Icon, Modal, Popup } from 'semantic-ui-react'

const BASE_URL = process.env.REACT_APP_API


class MixerContainer extends React.Component {

  state = {
    leftCurrent: "",
    rightCurrent: ""
  }

  handleVolumeLeft = () => {
    return this.props.leftVideoEvent ?
    (
      <div className="slider-wrapper volumeLeft">
        <Popup
          trigger={<input
            id='volume-left'
            onChange={(e)=>this.handleVolume()}
            type="range" step="5"  min="0" max="100" defaultValue="50"
          />}
          content='Volume'
          position='right center'
        />
      </div>
    )
      : null
  }

  changeVideoSpeed = (e) => {
    if (e.target.id === 'speed-left' && e.target.value > 0) {
      this.props.leftVideoEvent.setPlaybackRate(e.target.value)
    } else if (e.target.id === 'speed-left' && e.target.value == 0) {
      this.props.leftVideoEvent.setPlaybackRate(.25)
    } else if (e.target.id === 'speed-right' && e.target.value > 0) {
      this.props.rightVideoEvent.setPlaybackRate(e.target.value)
    } else if (e.target.id === 'speed-right' && e.target.value == 0) {
      this.props.rightVideoEvent.setPlaybackRate(.25)
    }
  }

  handleSpeedRight = () => {
    return this.props.rightVideoEvent ?
    (
      <div className="slider-wrapper speedRight container">
        <Popup
          trigger={<input
            id='speed-right'
            onChange={this.changeVideoSpeed}
            type="range" min="0" max="2" step='.5' defaultValue='1' list="tickmarks"
          />}
          content='Tempo Up/Down'
          position='left center'
        />
      <datalist id="tickmarks">
        <option>2</option>
        <option>1.5</option>
        <option>1</option>
        <option>.5</option>
        <option value='.25'>.25</option>
      </datalist>
      </div>
    ) : null
  }

  handleSpeedLeft = () => {
    return this.props.leftVideoEvent ?
    (
      <div className="slider-wrapper speedLeft container">
        <Popup
          trigger={<input
            id='speed-left'
            onChange={this.changeVideoSpeed}
            type="range" min="0" max="2" step='.5' defaultValue='1' list="tickmarks"
          />}
          content='Tempo Up/Down'
          position='right center'
        />
      <datalist id="tickmarks">
        <option>2</option>
        <option>1.5</option>
        <option>1</option>
        <option>.5</option>
        <option value='.25'>.25</option>
      </datalist>
      </div>
    ) : null
  }

  handleCrossfader = () => {
    return this.props.rightVideoEvent && this.props.rightVideoEvent ?
    (
      <div className="cross-fader">
        <Popup
          trigger={<input id="cross-fader"
            onChange={(e)=> this.handleVolume()}
            type="range" step="5"  min="-100" max="100" defaultValue="0"
          />}
          content='<= Crossfade =>'
          position='center top'
      />
      </div>
    )
      : null
  }

  handleVolume = () => {
    const crossFaderValue = document.getElementById('cross-fader').value
    const volumeRight = document.getElementById('volume-right').value
    const volumeLeft = document.getElementById('volume-left').value

    if (crossFaderValue > 0) {
      this.props.rightVideoEvent.setVolume(volumeRight)
      this.props.leftVideoEvent.setVolume(volumeLeft * (1 - crossFaderValue/100))
    } else if (crossFaderValue < 0) {
      this.props.leftVideoEvent.setVolume(volumeLeft)
      this.props.rightVideoEvent.setVolume(volumeRight * (1 + crossFaderValue/100))
    } else if (crossFaderValue == 0) {
      console.log("in if 0")
      this.props.rightVideoEvent.setVolume(volumeRight)
      this.props.leftVideoEvent.setVolume(volumeLeft)
    }
  }



  handleVolumeRight = () => {
    return this.props.rightVideoEvent ?
    (
      <div className="slider-wrapper volumeRight">
      <Popup
        trigger={<input
          id='volume-right'
          onChange={(e)=>this.handleVolume()}
          type="range" step="5"  min="0" max="100" defaultValue="50"
        />}
        content='Volume'
        position='left center'
      />
      </div>
    )
      : null
  }

  //code for save button/////////////////////////////////////

  headers () {
    return {
      'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    }
  }

  playBothVideos = (e) => {
    this.props.leftVideoEvent.playVideo()
    this.props.rightVideoEvent.playVideo()
    this.setState({
      leftIsPlaying: true,
      rightIsPlaying: true
    })
  }

  pauseBothVideos = (e) => {
    this.props.leftVideoEvent.pauseVideo()
    this.props.rightVideoEvent.pauseVideo()
    this.setState({

    })
  }

  handleSave = (event) => {
    let left = this.props.leftVideo
    let right = this.props.rightVideo
    let title = event.target.title.value
    let newMashup = {
      title: title,
      videos: [ {
        youtube_id: left.id.videoId,
        title: left.snippet.title,
        thumbnail: left.snippet.thumbnails.medium.url
      }, {
        youtube_id: right.id.videoId,
        title: right.snippet.title,
        thumbnail: right.snippet.thumbnails.medium.url
      } ]
    }

    fetch(`${BASE_URL}/mashups`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(newMashup)
     }).then(res => res.json())
     .then(() => this.setState({
       leftCurrent: left.id.videoId,
       rightCurrent: right.id.videoId
     })).then(this.props.updateMashups)

     event.target.title.value = ""

    }




  handleSaveDisplay = () => {

    return this.props.rightVideoEvent && this.props.leftVideoEvent
           && !this.props.leftVideo.youtube_id && !this.props.rightVideo.youtube_id?
    ( <div className="save-button">
        <Form onSubmit={this.handleSave}>
          <Form.Field>
            <input id="title" placeholder='Mashup Title' />
          </Form.Field>
          <Button positive type="submit" onClick={< SaveModal />}> Save </Button>
        </Form>
      </div>
    )
      : null
  }

  /// end code for save button //////////////////////

  render(){
    return(
      <div>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column>
              {this.handleVolumeLeft()}
            </Grid.Column>
            <Grid.Column>
              {this.props.leftVideoEvent && this.props.rightVideoEvent ?
                <div className='play-icon'>
                  <Icon.Group size='big'>
                    <Icon name='thin circle' size='big' color='green'/>
                    <Icon color='green' name='play' onClick={this.playBothVideos}/>
                  </Icon.Group>
                </div> : null }
            </Grid.Column>
            <Grid.Column>
              {this.props.leftVideoEvent && this.props.rightVideoEvent ?
                <div className='play-icon'>
                  <Icon.Group size='big'>
                    <Icon name='thin circle' size='big' color='green'/>
                    <Icon color='green' name='pause' onClick={this.pauseBothVideos} />
                  </Icon.Group>
                </div> : null}
            </Grid.Column>
            <Grid.Column>
              {this.handleVolumeRight()}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              {this.handleCrossfader()}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column width={3}>
              {this.handleSpeedLeft()}
            </Grid.Column>
            <Grid.Column width={10}>
              {this.handleSaveDisplay()}
            </Grid.Column>
            <Grid.Column width={3}>
              {this.handleSpeedRight()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default MixerContainer
