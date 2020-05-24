import React, {useState} from 'react';
import db from '../../firebase';
// import {Router} from 'react-router-dom';
// import Posts from '';
// import './App.css';

const UpdateStatus = (props) => {

    // console.log('create',props.user.uid)
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [contact,setContact] = useState('');
    const [role,setRole] = useState('');
    const [assigned,setAssigned] = useState('');

    const onUsernameChange = (event) => setUsername(event.target.value);
    const onEmailChange = (event) => setEmail(event.target.value);
    const onPasswordChange = (event) => setPassword(event.target.value);
    const onContactChange = (event) =>{ setContact(event.target.value);
        // setUserid(props.user.uid);
        setRole('member');
        setAssigned('no');
        console.log(role)
        // console.log('insid ecreate post ',userid);
    }
    
    const onAddMember = () => {
        
        // console.log(content);
        let postRef = db.collection('user_mst');
        let payload = {username,email,password,contact,role,assigned}
        // console.log(payload)
        console.log(role);
        postRef.add(payload)
        .then(function(file){
            console.log("doc",file)
        })
        // setTitle('')
        // setContent('')
        // setUserid('')
        // navigate('/')
    }

  return (
    <div>
        {/* <h5>Name</h5>
        <input type="text" value={username} onChange={onUsernameChange} />
        <h5>Email</h5>
        <input type="email" value={email} onChange={onEmailChange} />
        <h5>contact Number</h5>
        <input type="text" value={contact} onChange={onContactChange} />
        <h5>password</h5>
        <input type="password" value={password} onChange={onPasswordChange} />
        
        <button onClick={onAddMember}>Add member</button> */}
        <h1>Assign Update UpdateStatus</h1>
    </div>
  );
}

export default UpdateStatus;