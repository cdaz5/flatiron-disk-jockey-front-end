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
        onChange={(e)=>this.props.leftVideoEvent.setVolume(e.target.value)}
        type="range" step="5"  min="0" max="100" defaultValue="100"
      />
      </div>
    )
      : null
  }

  handleVolumeRight = () => {
    return this.props.rightVideoEvent ?
    (
      <div className="slider-wrapper volumeRight">
      <input

        onChange={(e)=>this.props.rightVideoEvent.setVolume(e.target.value)}
        type="range" step="5"  min="0" max="100" defaultValue="100"
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
      title: 'test',
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
          <Header icon='archive' content='Mashup has been Saved!' />
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
        {this.handleSaveDisplay()}
      </div>
    )
  }
}

export default MixerContainer
