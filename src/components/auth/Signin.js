import React, { useState, useEffect } from 'react';
// import PostSnippet from './PostSnippet';
import db,{auth} from '../../firebase'
// import './App.css';
import {Link,useHistory } from 'react-router-dom';

const Signin = (props) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  // const [user,setUser] = useState('');
  // const [userid,setUserid] = useState('');

  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);


  const [user,setUser] = useState('');
  
  
  const history = useHistory();

  const onSignin = () =>{
    auth.signInWithEmailAndPassword(email, password)
    .then(()=>{
      console.log('done');
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      setError(errorMessage);
    });
  }

  

  return (
    <div>
      <h1>{error}</h1>
            <input type="text" placeholder="Email" value={email} onChange={onEmailChange}/>
            <input type="password" placeholder="Password" value={password} onChange={onPasswordChange}/>
            <br></br>
            
            <button onClick={onSignin}>Sign In</button>

    </div>
  );
  }

export default Signin;