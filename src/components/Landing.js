import React from 'react'
import {Link} from 'react-router-dom'

const Landing = (props) => {

  return(
    <div>
     <img src="string" alt="dj picture"/>
     <Link to="/signup"> Signup </Link>
     <Link to="/login"> Login </Link>
    </div>
  )
} 

export default Landing
