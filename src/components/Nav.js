import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class Nav extends Component {

  render() {
    return (
      <Menu stackable>
        <Menu.Item>
          <img src='/logo.png' />
        </Menu.Item>

        <Menu.Item>
        <NavLink
        to="/logout"
        >Logout</NavLink>
        </Menu.Item>
      </Menu>
    )
  }
}
