import React from 'react'
import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react'

class MixerContainer extends React.Component {
  constructor(props){
    super(props)

  }

  handleVolumeLeft = () => {
    return this.props.leftVideoEvent ?
    (
      <div className="slider-wrapper volumeLeft">
      <input
        id='volume-left'
        onChange={(e)=>this.handleVolume()}
        type="range" step="5"  min="0" max="100" defaultValue="50"
      />
      </div>
    )
      : null
  }

  handleCrossfader = () => {
    return this.props.rightVideoEvent && this.props.rightVideoEvent ?
    (
      <div className="">
      <input id="cross-fader"
        onChange={(e)=> this.handleVolume()}
        type="range" step="5"  min="-100" max="100" defaultValue="0"
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
      <input
        id='volume-right'
        onChange={(e)=>this.handleVolume()}
        type="range" step="5"  min="0" max="100" defaultValue="50"
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

  handleSave = (event) => {

    let baseUrl = 'http://localhost:3000/api/v1'
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

    fetch(`${baseUrl}/mashups`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(newMashup)
     }).then(res => res.json())

     event.target.title.value = ""
    }


  handleSaveDisplay = () => {

    return this.props.rightVideoEvent && this.props.leftVideoEvent
           && !this.props.leftVideo.youtube_id && !this.props.rightVideo.youtube_id?
    ( <div className="save-button">
        <Form onSubmit={this.handleSave}>
          <Form.Field>
            <input id="title"placeholder='Mashup title' />
          </Form.Field>
          <Modal trigger={<Button positive type="submit"> Save </Button>} basic size='small'>
          <Header icon='archive' content='Mashup Saved!' />
          </Modal>
        </Form>
      </div>
    )
      : null
  }

  /// end code for save button //////////////////////

  render(){
    return(
      <div>
        {this.handleVolumeLeft()}
        {this.handleVolumeRight()}
        {this.handleCrossfader()}
        {this.handleSaveDisplay()}

      </div>
    )
  }
}

export default MixerContainer
