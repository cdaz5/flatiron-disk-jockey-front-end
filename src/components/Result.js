import React, {Component} from 'react'
import { Grid, Image } from 'semantic-ui-react'
import YouTube from 'react-youtube'

class Result extends Component {


  render(){
      let leftVideo = this.props.mashupInfo.videos[0]
      let rightVideo = this.props.mashupInfo.videos[1]

      return(
        <Grid.Column>
          <Grid textAlign='center'>
            <Grid.Row columns={2} color='olive'>
                <Grid.Column>
                  <Image src={leftVideo.thumbnail} />
                </Grid.Column>

                <Grid.Column>
                  <Image src={rightVideo.thumbnail} />
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
          <br/>
        </Grid.Column>

  )
 }
}

export default Result
