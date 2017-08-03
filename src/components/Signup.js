import React, { Component } from 'react'
import { Grid, Button, Form, Segment, Divider } from 'semantic-ui-react'
import LoginFB from './LoginFB'

class SignUpForm extends Component {

  constructor () {
    super()
    this.state = {
        username: '',
        password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSendSignUp(this.state)
    this.setState({username: '', password: ''})
  }

  render () {
    return (
      <div className='loginPage'>
        <Grid centered columns={3}>
          <Grid.Column verticalAlign='center'>
            <Form onSubmit={this.handleSubmit} className='loginForm'>
              <Form.Field>
                <input name='username' placeholder='Username' onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <input type='password' name='password' placeholder='Password' onChange={this.handleChange} />
              </Form.Field>
              <Button size='huge' type='submit'>Sign Up</Button>
              <LoginFB onSignupLoginFB={this.props.onSignupLoginFB} />
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default SignUpForm
