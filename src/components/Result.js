import React, {Component} from 'react'
import { Grid, Image, Button } from 'semantic-ui-react'
import YouTube from 'react-youtube'

class Result extends Component {

  constructor(){
    super()

    this.state = {
      hover: false
    }
  }

  handleMouseEnter = (event) => {
    event.stopPropagation()
    this.setState({
      hover: true
    })
  }

  handleMouseLeave = (event) => {
    event.stopPropagation()
    this.setState({
      hover: false
    })
  }

  handlePlay = (event) => {
    let leftVideo = this.props.mashupInfo.videos[0]
    let rightVideo = this.props.mashupInfo.videos[1]
    this.props.playResult(leftVideo, rightVideo)
  } 

  render(){
      let leftVideo = this.props.mashupInfo.videos[0]
      let rightVideo = this.props.mashupInfo.videos[1]

      return(

        <Grid.Column onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} >
          <Grid textAlign='center' >
            <Grid.Row columns={2} color='olive' >
                <Grid.Column>
                  <Image src={leftVideo.thumbnail} />
                </Grid.Column>

                <Grid.Column>
                  <Image src={rightVideo.thumbnail} />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} color='grey'>
              <Grid.Column>
              {this.state.hover ?
                <div>
                  < Button primary onClick={this.handlePlay}> Play </ Button>
                </div>
                :
                <div>
                  Mashup Info
                </div>
              }
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br/>
        </Grid.Column>

       )
    }
}

export default Result
