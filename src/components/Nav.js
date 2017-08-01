import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class Nav extends Component {

  render() {
    return (
      <Menu stackable className="ui inverted menu nav">
        <Menu.Item>
          <iframe src="https://giphy.com/embed/ccu9c0Iu7aGFa" width="50" height="50" frameBorder="0" class="giphy-embed"></iframe>
        </Menu.Item>
        <Menu.Item header>
          <div className="header">Flatiron-Disk-Jockey</div>
        </Menu.Item>
        <Menu.Item position="right">
        <NavLink
        to="/logout"
        >Logout</NavLink>
        </Menu.Item>
      </Menu>
    )
  }
}
