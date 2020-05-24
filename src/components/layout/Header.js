import React, { Component, Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import db, { auth } from '../../firebase'
import './head.css'
import $ from 'jquery'

const Header = (props) => {

  console.log('header ', props.useremail, props.role)


  return (
    <div>
      {/* <header className="header"> */}
        <nav className="navbar">

          <div className="container-fluid">
            <div className="navbar-holder d-flex align-items-center justify-content-between">

              <div className="navbar-header">
                <a href="../index.html" className="navbar-brand d-none d-sm-inline-block">
                  <div className="brand-text d-none d-lg-inline-block"><span>Job</span><strong>Manager</strong></div>
                  <div className="brand-text d-none d-sm-inline-block d-lg-none"><strong>KW</strong></div></a>
                {/* <a id="toggle-btn" href="#" class="menu-btn active"><span></span><span></span><span></span></a> */}
              </div>
              Role: {props.role}
              <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                <li className="nav-item">
                  <a href="/" className="nav-link logout">
                    <span className="d-none d-sm-inline">SignIn</span>
                    <i className="fa fa-sign-in"></i>
                  </a>
                </li>
                <li className="nav-item">
                 
                </li>
                <li className="nav-item">
                  {/* <Link to="/profile" className="nav-link logout dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
  <span className="d-none d-sm-inline nav-link logout dropdown-toggle"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.useremail}</span>
                    
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  <Link to="/profile" className="logout nav-link dropdown-item"><i class="fas fa-user"></i>Profile</Link>
    <Link href="logout.php" className="nav-link logout dropdown-item">
                    <i className="fa fa-sign-out"></i>LogOut</Link>
  </div>
</li>
                
              </ul>
            </div>
          </div>

        </nav>
      {/* </header> */}

    </div>
  );
}

export default Header;