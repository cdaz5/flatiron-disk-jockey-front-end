import React, { Component } from 'react';
import Search from './components/Search'
import AuthAdapter from './authAdapter'
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Authorize from './Authorize'
import Nav from './components/Nav'
import Landing from './components/Landing'
import Login from './components/Login'
import SignUp from './components/Signup'
import AppContainer from './containers/AppContainer'

class App extends Component {

  state = {
    auth: {
      isLoggedIn: false,
      user: ''
    }
  }

  onLogin = (loginParams) => {
  AuthAdapter.login(loginParams)
    .then( res => {
      //check for an error message
      if( res.error ){
         console.log(res.error)
      }else{
        localStorage.setItem('jwt', res.jwt)
        this.setState({
          auth:{
            isLoggedIn: true,
            user: res.username
          }
        })
      }
      //if error render login again
      //else set the jwt token and forward user to /giphs
    })
  }

  onSignup = (signUpParams) => {
  AuthAdapter.signUp(signUpParams)
    .then( res => {
      //check for an error message
      if( res.error ){
        console.log("do nothing")
      }else{
        localStorage.setItem('jwt', res.jwt)
        this.setState({
          auth:{
            isLoggedIn: true,
            user: res.username
          }
        })
      }
      //if error render login again
      //else set the jwt token and forward user to /giphs
    })
  }


  handleLogout = () => {
    localStorage.clear()
    this.setState({auth: {
      isLoggedIn:false,
      user: ''
    }})
  }


  render() {
    return (
      <Router>
        <div>
          <Nav/> 
          <Route exact path="/" render={() => this.state.auth.isLoggedIn ? <Redirect to="/players"/> : <Landing />} />
          <Route path="/players" component={Authorize(AppContainer)} />
          <Route path="/signup" render={()=> this.state.auth.isLoggedIn ? <Redirect to="/players"/> : <SignUp onSendSignUp={this.onSignup}/> } />
          <Route path="/logout" render={() => {
            this.handleLogout()
            return (<Redirect to="/"/>)}} />

          <Route path='/login' render={()=> this.state.auth.isLoggedIn ? <Redirect to="/players"/> : <Login onSendLogin={this.onLogin}/> } />
        </div>
      </Router>
    )
  }
}

export default App;
