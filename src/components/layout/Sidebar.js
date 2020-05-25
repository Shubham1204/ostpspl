import React,{Component, Fragment,useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import db,{auth} from '../../firebase'
import './sidebar.css'
import $ from 'jquery'

const Sidebar = (props) => {
  
  console.log('header ',props.useremail,props.role)
  const [mini, setMini] = useState(true);
  // var mini = true;

const  toggleSidebar = () => {
  if (mini) {
    console.log("opening sidebar");
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    // this.mini = false;
    setMini(false);
  } else {
    console.log("closing sidebar");
    document.getElementById("mySidebar").style.width = "85px";
    document.getElementById("main").style.marginLeft = "85px";
    // this.mini = true;
    setMini(true);
  }
}

  return (
    <div>
      <div id="mySidebar" class="sidebar bg-white" onMouseOver={toggleSidebar} onMouseOut={toggleSidebar}>
        <h1>Menu</h1>
      <Link to="/jobs"><span><i class="material-icons">info</i><span class="icon-text">Jobs</span></span></Link>
  <Link to="/addmember"><i class="material-icons">spa</i><span class="icon-text"></span>Add Member</Link>
  <Link to="/addmanager"><i class="material-icons">monetization_on</i><span class="icon-text"></span>Add Manager</Link>
  <Link to="/addjob" ><i class="material-icons">email</i><span class="icon-text"></span>Add Job<span></span></Link>
      </div>



    </div>
  );
}


export default Sidebar;
