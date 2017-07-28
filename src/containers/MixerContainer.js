import React from 'react'

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

  render(){
    return(
      <div>
        {this.handleVolumeLeft()}
        {this.handleVolumeRight()}
      </div>
    )
  }
}

export default MixerContainer
