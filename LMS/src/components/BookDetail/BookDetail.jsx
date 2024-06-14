import React, { useCallback, useContext, useEffect, useState } from 'react'
import "./style.css"
import { useNavigate, useParams } from 'react-router-dom'
import loadingContext from '../contexts/LoadingContext';
import { ImSpinner3 } from "react-icons/im";

export default function BookDetail() {

  const [from,setFrom] = useState('');
  const [to,setTo] = useState('');
  const [rate,setRate] = useState(5);
  const [price,setPrice] = useState(0);
  const navigate = useNavigate()
  const {id} = useParams()
  const {SERVER_URL,loading,setLoading} = useContext(loadingContext)
  const [book, setBook] = useState({})

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

  useEffect(()=>{
    //check if the local storage has the token or not to check if user is logged or not.
    const token = localStorage.getItem('token');
    if (!token)
    {
      navigate("/login")
    }

    //fetch the book from id
    setLoading(true)
    fetch(`${SERVER_URL}/book/${id}`,{
      method:"GET",
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`,
        
      }
    })
    .then(res=>{
      if(res.ok)
        {
          return res.json()
        }
      else 
      {
        alert("Error fetching the book. Please check your internet connection.")
      }
    })
    .then(book=>{
      // console.log(book.book)
      setBook(book.book)
      setLoading(false)
    })
  },[])
  return (
   <div className='detail-container'>
      
      {!loading && book && <div className="detail-card">

      <img src={book.imageUrl} alt="Image for book" className='cover-image' />
      <div className="block">
        <h2>Title</h2>
        <p>{book.title}</p>
      </div>
      <div className="block">
        <h2>Author</h2>
        <p>{book.author}</p>
      </div>
      <div className="block">
        <h2>About</h2>
        <p>{book.description}</p>
      </div>
      <div className="block">
        <h2>Rent</h2>
        <p>${book.price} / Day</p>
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
      </div>}
      
    </div>
  )
}
