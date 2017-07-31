import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class Nav extends Component {

  render() {
    return (
      <Menu stackable className="ui inverted menu">
        <Menu.Item>
          <img src='https://s-media-cache-ak0.pinimg.com/236x/51/b1/7b/51b17b6c91ae5d128d19eb9353f530d5--recording-studio-turntable.jpg' />
        </Menu.Item>
        <Menu.Item header>
          <div className="header">Flatiron-Disk-Jockey</div>
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
