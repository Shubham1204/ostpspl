import React, {useState} from 'react';
import db from '../../firebase';
// import {Router} from 'react-router-dom';
// import Posts from '';
// import './App.css';

const AddJob = (props) => {

    // console.log('create',props.user.uid)
    const [projectname,setProjectname] = useState('');
    const [status,setStatus] = useState('');
    const [createdate,setCreatedate] = useState('');
    const [description,setDescription] = useState('');
    const [approved,setApproved] = useState('');

console.log('addproject.js',props.useremail,'role ',props.role);

    // <h1>{new Date().toLocaleString()}</h1>
    const onProjectnameChange = (event) => setProjectname(event.target.value);
    // const onEmailChange = (event) => setEmail(event.target.value);
    const onDescriptionChange = (event) =>{ setDescription(event.target.value);
        // setUserid(props.user.uid);
        setStatus('pending');
        setCreatedate(new Date().toLocaleString());
        // setLinks('no');
        setApproved('no');
        // setAssignedmanager('no');
        // setMembers('no');
        // setTasks('no');
        // console.log(date)
        // console.log('insid ecreate post ',userid);
    }
    
    const onAddProject = () => {
        
        // console.log(content);
        let postRef = db.collection('project_mst');
        let payload = {projectname,status,createdate,description,approved}
        // console.log(payload)
        // console.log(role);
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
        <h5>Job Name</h5>
        <input type="text" value={projectname} onChange={onProjectnameChange} />
        
        <h5>description</h5>
        <input type="text" value={description} onChange={onDescriptionChange} />
        <button onClick={onAddProject}>Add Manager</button>
    </div>
  );
}

export default AddJob;