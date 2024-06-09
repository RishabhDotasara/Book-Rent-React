import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";


export default function Navbar() {
    const [active,setActive] = useState(false)
    console.log(active)
  return (
    <div className="nav">
      <h1 className="logo">GetTheBook</h1>
        <form className="search-box">
            <input type="search" placeholder="Search for books, authors..."/>
            <button className="search-btn"><MdOutlineSearch /></button>
        </form>
   <GiHamburgerMenu className="hamburger" onClick={()=>{setActive(!active)}}/>
      <ul className={ "links" + (active ? " active" : " " )}>
        <RxCross2 className="hamburger cross" onClick={()=>{setActive(!active)}}/>   
        
          <li className="link">
            <Link>Home</Link>
          </li>
          <li className="link">
            <Link>Books</Link>
          </li>
          <li className="link">
            <Link>Authors</Link>
          </li>
          <li className="link">
            <Link>Genres</Link>
          </li>
        
      </ul>
    </div>
  );
}
