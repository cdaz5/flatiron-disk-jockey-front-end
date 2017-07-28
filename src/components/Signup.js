import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

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
  // handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSendSignUp(this.state)
    this.setState({username: '', password: ''})
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input name='username' placeholder='Username' onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' name='password' placeholder='Password' onChange={this.handleChange} />
        </Form.Field>
        <Button type='submit'>Sign Up</Button>
      </Form>

    )
  }
}

export default SignUpForm
