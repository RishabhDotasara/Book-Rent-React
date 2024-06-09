import React, { useContext, useState } from 'react'
import "./style.css"
import loadingContext from '../contexts/LoadingContext'


export default function Card(props) {
  
  const {loading,setLoading} = useContext(loadingContext)
  console.log(loading)

  return (
    <div className='card'>
      {!loading && <img src="https://p1-ofp.static.pub//medias/25696296291_E14Gen5Black_202303220324451691991710588.png" className='thumbnail' alt="Image over here." />}
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
      <button>Rent</button>
      </div>
    </div>
  )
}
