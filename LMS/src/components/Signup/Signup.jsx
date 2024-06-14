import React, { useState,useContext,useEffect } from 'react'
import "./signup.css"
import { Link, useNavigate } from 'react-router-dom'
import loadingContext from '../contexts/LoadingContext'
import { ImSpinner3 } from "react-icons/im";

export default function Signup(props) {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("")
  const {SERVER_URL,setIsLoggedIn,loading,setLoading,setIsAdmin} = useContext(loadingContext)
  const navigate = useNavigate()
  // console.log(SERVER_URL)


  // console.log(SERVER_URL)

  const Signup = (e)=>{
      //make a request
      e.preventDefault();
      if(username == "" || password == "" || email == "")
        {
          alert("Fill all the details!")
        }
      else 
      {
        setLoading(true)
        fetch(`${SERVER_URL}/signup`,{
          method:"POST",
          body:JSON.stringify({
            username:username,
            password:password,  
            email:email
          }),
          headers:{
            "Content-Type":"application/json"
          } 
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          // alert("User created successfully.")
          setLoading(false)
          Login(e);
        })
    }
      }

  const Login = (e)=>{
    e.preventDefault();
    if (username == "" || password == "")
      {
        alert("Fill all the details!")
      }
    else 
    {
      setLoading(true)
      fetch(`${SERVER_URL}/login`,{
        method:"POST",
        body:JSON.stringify({
          username:username,
          password:password
        }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        localStorage.setItem("token",data.token)
        setIsLoggedIn(true)
        if (data.isAdmin)
          {
            setIsAdmin(true)
            localStorage.setItem("isAdmin",data.isAdmin)
          }
        setLoading(false)
        navigate("/") 
      })
    }
  }

  if (props.config == "login")
    {

      return (
        <div className='signup-container'>
          <form className='form-l'>
            <h2>Login</h2>
            <input type="text" className='input-l' placeholder='Username' required onChange={(e)=>{setUsername(e.target.value)}} value={username} />
            <input type="password" className='input-l' placeholder='password' required onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
            
            <button className='btn-l' onClick={(e)=>{Login(e)}}>
               Login
              {loading && <ImSpinner3 className={loading ? "spinner" : "spinner hide"}/>}
            </button>
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
            <input type="text" className='input-l' placeholder='Username' required onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
            <input type="password" className='input-l' placeholder='password' required onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
            <input type="email" className='input-l' placeholder='email' required onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
            <button className='btn-l' onClick={(e)=>{Signup(e)}}>
              SignUp
              {loading && <ImSpinner3 className={loading ? "spinner" : "spinner hide"}/>}
              </button>
          </form>
          <Link to="/login" className='link-text'>Already have an account?</Link>
        </div>
      )
    }
}
