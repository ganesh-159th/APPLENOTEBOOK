import React  from 'react'
import { Link, useLocation } from 'react-router-dom'





const Navbar = () => {
  let location = useLocation(); 
 
  return (
    
    
  <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">APPLENOTEBOOK</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/About"?   "active": " "} `}aria-current="page" to="/Home">Home</Link>
        </li>
        <li className="nav-item">
  <Link className={`nav-link ${location.pathname === "/About"?   "active": " "} `} to="/About">About</Link>
        </li>
    
        
      </ul>
      
      <form className="d-flex">
      <Link className="btn btn-outline-success" to="/login" role="button">Login</Link>
      <Link className="btn btn-outline-success mx-2" to="/sigup" role="button">Sigup</Link>



        
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar
