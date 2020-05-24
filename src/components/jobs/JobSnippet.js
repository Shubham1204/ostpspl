import React from 'react';
// import Post from './Post';
// import './App.css';
import {Link} from 'react-router-dom';

const JobSnippet = (props) => {
  return (
    <div>
      
       <div className="card">
  <div className="card-header">
   Project Name: {props.pname}
  </div>
  <div className="card-body">
    
    <p className="card-text float-left" >
    create date: {props.pdate}
    <br></br>
    status: {props.pstatus}
   </p>
  
    {/* { console.log('inside post')} */}
    {/* {props.pid} */}
    <Link to={`job/${props.pid}`} className="btn btn-primary btn-lg float-right">View Details</Link>
  </div>
</div>
    </div>
  );
}

export default JobSnippet;