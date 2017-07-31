import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'




export default class SearchExampleStandard extends Component {

  state = {
    isLoading: false,
    results: [],
    searchTerm: ''
  }


  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], searchTerm: '' })

  handleResultSelect = (e, {result} ) => {
    this.props.handleVideoClick(result)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, searchTerm: value })
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyDdOG-O-9rzZJ1oiXb18yRvNvWZGqDnO9E`)
    .then(resp => resp.json())
    .then(jsonObject => {
      this.setState({
        results: jsonObject.items,
        isLoading: false
      })
    })
  }

  resultRenderer = (result) => {
    // debugger
    return (
      <div>
        <div className='image'>
          <img src={result.snippet.thumbnails.default.url} />
        </div>
        <div className='content'>
          <div className='title'>
            {result.snippet.title}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { isLoading, searchTerm, results } = this.state

    return (
          <Search
            input={{fluid: true}}
            fluid='true'
            resultRenderer={this.resultRenderer}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={searchTerm}
            {...this.props}
          />
    )
  }
}
