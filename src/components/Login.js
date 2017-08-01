import React, { Component } from 'react'
import LoginFB from './LoginFB'
import { Grid, Button, Checkbox, Form, Segment, Divider } from 'semantic-ui-react'

class LoginForm extends Component {

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
  // handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSendLogin(this.state)
    this.setState({username: '', password: ''})
  }

  render () {
    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Form onSubmit={this.handleSubmit} className='loginForm'>
            <Form.Field>
              <label>Username</label>
              <input name='username' placeholder='Username' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type='password' name='password' placeholder='Password' onChange={this.handleChange} />
            </Form.Field>
            <Button type='submit' size='huge'>Log In</Button>
            <LoginFB onSignupLoginFB={this.props.onSignupLoginFB} />
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default LoginForm
