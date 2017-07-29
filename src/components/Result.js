import React, {Component} from 'react'
import { Grid, Image } from 'semantic-ui-react'
import YouTube from 'react-youtube'


// using a hard core of the url for a medium size thumbnail for now
// have to figure out how to pull the data and then map over it and render it
// in this format
const src = 'https://i.ytimg.com/vi/64liF2VuLxI/mqdefault.jpg'


class Result extends Component {

  renderIframe = () => {
    return !!this.props.video.id ?  <YouTube id='pray'
      videoId={this.props.video.id.videoId}
      onReady={this.onReady.bind(this)}

    /> : null
  }

  render(){
      return(
        <Grid.Column>
          <Grid textAlign='center'>
            <Grid.Row columns={2} color='olive'>
                <Grid.Column>
                  <Image src={src} />
                </Grid.Column>

                <Grid.Column>
                  <Image src={src} />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} color='grey'>
              <Grid.Column>
                <div>
                  Mashup description
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
  )
 }
}

export default Result
