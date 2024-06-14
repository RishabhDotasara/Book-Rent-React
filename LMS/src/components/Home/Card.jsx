import React, { useContext, useState } from 'react'
import "./style.css"
import loadingContext from '../contexts/LoadingContext'
import { Link } from 'react-router-dom'


export default function Card(props) {
  
  const {loading,setLoading,isLoggedIn} = useContext(loadingContext)
  console.log(loading)

  return (
    <div className='card'>
      {!loading && <img src={props.imageURL} className='thumbnail' alt={props.title} />}
      {loading && <div className='thumbnail load'></div>}
      <div className="desc">

      {!loading && <h2 className='title'>{props.title}</h2>}
      {loading && <div className='title load'></div>}
      <div className="info">
        {props.tags.map((tag,index) => {
          return (
            <>
                {!loading && <span key={index} className='tag'>{tag}</span>}
                {loading && <span key={index} className='tag load'></span>}
            </>
        )
        })}
        
      </div>
      <Link className='rent-btn' to={isLoggedIn ? `/book/${props.id}` : "/login"}>Rent</Link>
      </div>
    </div>
  )
}
