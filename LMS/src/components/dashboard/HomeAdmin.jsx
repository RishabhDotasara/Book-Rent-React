import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function HomeAdmin() {
    const [online, setOnline] = useState(true)
  return (
    <>
      <section>
        <h1>Statistics</h1>
        <div className="block-admin sales-info">
          <h3>Sales Info</h3>
          <ul className="info">
            <li>
              <h4>Total Sales</h4>
              <span>$1000</span>
            </li>
            <li>
              <h4>Number of Rentals</h4>
              <span>50</span>
            </li>
            
          </ul>
        </div>
        <div className="block-admin web-info">
          <h3>Admins</h3>
          {/* sort of want a card where clicking takes to the user profile. */}
          <div className="card-admin">
            <span>Rishabh</span>
            <div className="status-div">

              {online && <span className="status">Online</span>}
              {!online && <span className="status">Offline</span>}
              <span className="indicator" style={{background:online ? "lightgreen" : "red"}}></span>
            </div>
          </div>
          <div className="card-admin">
            <span>Harshit</span>
            <div className="status-div">

              {online && <span className="status">Online</span>}
              {!online && <span className="status">Offline</span>}
              <span className="indicator" style={{background:online ? "lightgreen" : "red"}}></span>
            </div>
          </div>
        </div>
      </section>

      {/* DATABASE SECTION */}
      <section>
        <h1>Database</h1>
        <div className="block-admin quantity-info">
          <h3>Sales Info</h3>
          <ul className="info">
            <li>
              <h4>Total Users</h4>
              <span>50</span>
            </li>
            <li>
              <h4>Total Books</h4>
              <span>500</span>
            </li>
            
          </ul>
        </div>
        <div className="block-admin quantity-info">
          <h3>Edit</h3>
          <ul className="info">
            <li>
              <Link to="/admin/book"><h4>Add a Book</h4></Link>
            </li>
            <li>
              <Link to="/admin/user"><h4>Add a Admin</h4></Link>
      
            </li>
            
          </ul>
        </div>
      </section>
    </>
  )
}
