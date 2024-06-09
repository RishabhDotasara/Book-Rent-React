import React from 'react'
import "./signup.css"
import { Link } from 'react-router-dom'

export default function Signup(props) {

  if (props.config == "login")
    {

      return (
        <div className='signup-container'>
          <form className='form-l'>
            <h2>Login</h2>
            <input type="text" className='input-l' placeholder='Username' required/>
            <input type="password" className='input-l' placeholder='password' required/>
            
            <button className='btn-l'>Login</button>
          </form>
          <Link to="/signup" className='link-text'>Don't have an account?</Link>
        </div>
      )
    }
  else if (props.config == "signup")
    {
      return (
        <div className='signup-container'>
          <form className='form-l'>
            <h2>SignUp</h2>
            <input type="text" className='input-l' placeholder='Username' required/>
            <input type="password" className='input-l' placeholder='password' required/>
            <input type="email" className='input-l' placeholder='email' required/>
            <button className='btn-l'>SignUp</button>
          </form>
          <Link to="/login" className='link-text'>Already have an account?</Link>
        </div>
      )
    }
}
