import React, { useContext, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import loadingContext from "../contexts/LoadingContext";


export default function Navbar() {
    const [active,setActive] = useState(false)
    const {isLoggedIn} = useContext(loadingContext)

    console.log(active)
  return (
    <div className="nav">
      <h1 className="logo"><Link to="/">GetTheBook</Link></h1>
        <form className="search-box">
            <input type="search" placeholder="Search for books, authors..."/>
            <button className="search-btn"><MdOutlineSearch /></button>
        </form>
   <GiHamburgerMenu className="hamburger" onClick={()=>{setActive(!active)}}/>
      <ul className={ "links" + (active ? " active" : " " )}>
        <RxCross2 className="hamburger cross" onClick={()=>{setActive(!active)}}/>   
        
        {isLoggedIn && (
          <>
          <li className="link">
            <Link>Home</Link>
          </li>
          <li className="link">
            <Link>Authors</Link>
          </li>
          <li className="link">
            <Link>Genres</Link>
          </li>
          <li className="link">
            <Link>LogOut</Link>
          </li>
          </>
        )}

        {!isLoggedIn && (
          <>
          <li className="link">
            <Link to="/login">SignIn</Link>
          </li>
          <li className="link">
            <Link to="/signup">SignUp</Link>
          </li>
          </>
        )}
        
      </ul>
    </div>
  );
}
