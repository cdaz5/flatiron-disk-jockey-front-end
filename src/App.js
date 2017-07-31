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
import LoginFB from './components/LoginFB'

class App extends Component {

  state = {
    auth: {
      isLoggedIn: false,
      user: ''
    }
  }

  onSignupFB = (username) => {
    this.setState({
      auth:{
        isLoggedIn: true,
        user: username
      }
    })
  }

  onLoginFB = (username) => {
    this.setState({
      auth:{
        isLoggedIn: true,
        user: username
      }
    })
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
          <Route path="/signup" render={()=> this.state.auth.isLoggedIn ? <Redirect to="/players"/> : <div> <SignUp onSendSignUp={this.onSignup}/><br/><LoginFB status='Sign up' onSignUpFB={this.onSignupFB}/> </div> }/>
          <Route path="/logout" render={() => {
            this.handleLogout()
            return (<Redirect to="/"/>)}} />

          <Route path="/login" render={()=> this.state.auth.isLoggedIn ? <Redirect to="/players"/> : <div><Login onSendLogin={this.onLogin}/><br/><LoginFB status='Login' onLoginFB={this.onLoginFB} /> </div>} />
        </div>
      </Router>
    )
  }
}

export default App;
