import React, { Component} from 'react';
import FacebookProvider, { Login } from 'react-facebook';
import AuthAdapter from '../authAdapter'
import Authorize from '../Authorize'

export default class LoginFB extends Component {
  handleResponse = (data) => {
    const signUpParams = {
      username: data.profile.email,
      password: data.profile.id
    }
    if (document.URL.includes('signup')) {
      AuthAdapter.signUp(signUpParams)
        .then( res => {
          //check for an error message
          if( res.error ){
            console.log("do nothing")
          }else{
            localStorage.setItem('jwt', res.jwt)
            this.props.onSignupLoginFB(res.username)

          }
        })
      } else if (document.URL.includes('login')) {
        AuthAdapter.login(signUpParams)
          .then( res => {
            //check for an error message
            if( res.error ){
              console.log("do nothing")
            }else{
              localStorage.setItem('jwt', res.jwt)
              this.props.onSignupLoginFB(res.username)
            }
          })
      }

    }

  handleError = (error) => {
    this.setState({ error });
  }

  render() {
    return (
      <FacebookProvider appId="1728368384131341">
        <Login
          scope="email"
          onResponse={this.handleResponse}
          onError={this.handleError}
        >
          <span className='facebook'>{`${this.props.status} with Facebook`}</span>
        </Login>
      </FacebookProvider>
    );
  }
}
