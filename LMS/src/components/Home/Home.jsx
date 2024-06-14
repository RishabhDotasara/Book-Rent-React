import React, { useContext, useEffect, useState } from 'react'
import "./style.css"
import Card from './Card'
import loadingContext from '../contexts/LoadingContext'

export default function Home() {

  const {SERVER_URL,setLoading,loading} = useContext(loadingContext)
  const [books, setBooks] = useState([])

  //fetch the books from the database
  useEffect(()=>{
    setLoading(true)
    fetch(`${SERVER_URL}/books`)
    .then(res=>{
      if (res.ok)
        {

          return res.json()
        }
      else
      {
        alert("Error getting books, please check your internet connection!")
      }
    
    })
    .then(data=>{
      console.log(data.books)
      setBooks(data.books)
      setLoading(false)
    })
  },[])

  return (
    <div className='home-container'>
      {books.map((book)=>{
        return (
          <Card
            id={book._id}
            title={book.title}
            tags={book.tags}
            imageURL={book.imageUrl}
          />
        )
      })}
      
    </div>
  )
}
