import React, { useCallback, useEffect, useState } from 'react'
import "./style.css"
import { useParams } from 'react-router-dom'

export default function BookDetail() {

  const [from,setFrom] = useState('');
  const [to,setTo] = useState('');
  const [rate,setRate] = useState(5);
  const [price,setPrice] = useState(0);

  useEffect(()=>{

    //this logic here is to show the user the price he need to pay, however this thing will be recalculated on the server side to avoid breaching the security.
    //else the user can simply change the DOM from the source, thereby changing the price.

    const date1 = new Date(from);
    const date2 = new Date(to);
  
    if (date2 > date1)
      {

        const diffTime = Math.abs(date2 - date1); //this is difference in ms
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); //this is difference in days
        setPrice(diffDays*rate);
      }
    else 
    {
      setPrice("Choose valid dates!")
    }

  },[from,to])

  const {id} = useParams()
  return (
    <div className='detail-container'>
      
      <div className="detail-card">

      <img src="https://p1-ofp.static.pub//medias/25696296291_E14Gen5Black_202303220324451691991710588.png" alt="Image for book" className='cover-image' />
      <div className="block">
        <h2>Title</h2>
        <p>Death Note</p>
      </div>
      <div className="block">
        <h2>Author</h2>
        <p>Rishabh Dotasara | Dippu</p>
      </div>
      <div className="block">
        <h2>About</h2>
        <p>This is the official manga version of the anime Death Note.</p>
      </div>
      <div className="block">
        <h2>Rent</h2>
        <p>$5 / Day</p>
        <form className='rent-form'>
          <h3>From</h3>
          <input type="date" onChange={(e)=>{setFrom(e.target.value)}}/>
          <h3>To</h3>
          <input type="date" onChange={(e)=>{setTo(e.target.value)}}/>
          <h3>Price</h3>
          <input type="text" read-only="true" placeholder='0' value={price}/>
          <button>Pay</button>
        </form>
      </div>
      </div>
    </div>
  )
}
