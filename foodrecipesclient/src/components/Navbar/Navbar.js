import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import  "./Navbar.modules.css";

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('usertoken')
    navigate("/")
  }
  
    return (
      <div>
        <div className="navbar-div">
            <header class="header">
                <a href="#" className="logo">Food Recipes </a>
                <nav className="navbar">
                    <div id="nav-close"></div>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/addRecipe">Add Recipe</NavLink>
                    <NavLink to="/uploaded">Uploaded Recipe</NavLink>
                    <NavLink to="/" onClick={handleLogout} >Logout</NavLink>
                </nav>
            </header>
            </div>
      </div>
    )
  }

  export default Navbar
