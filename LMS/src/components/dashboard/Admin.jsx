import React, { useContext, useEffect, useState } from "react";
import "./admin.css";
import loadingContext from "../contexts/LoadingContext";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Admin() {
  const { SERVER_URL } = useContext(loadingContext);
 
  // console.log(SERVER_URL)
  const navigate = useNavigate();
  useEffect(() => {
    //get the info for the panel from the server.
    fetch(`${SERVER_URL}/admin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          alert("Unauthorized access!");
          navigate("/");
        }
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  //number of users
  //number of rentals
  //number of admins
  //total number of users

  return (
      <div className="admin-container">
        <Outlet/>
      </div>
  );
}
