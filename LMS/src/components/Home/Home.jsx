import React from 'react'
import "./style.css"
import Card from './Card'

export default function Home() {
  return (
    <div className='home-container'>
      <Card title="This is the card" tags={['Horror','Thriller','anime']}/>
      
    </div>
  )
}
