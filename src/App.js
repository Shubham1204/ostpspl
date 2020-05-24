import React,{Component, useState} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import AddManager from './components/pages/AddManager';
import AddMember from './components/pages/AddMember';
import AssignMember from './components/pages/AssignMember';
import AssignManager from './components/pages/AssignManager';
import Signin from './components/auth/Signin';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import AddProject from './components/jobs/AddJob';
import Jobs from './components/jobs/Jobs';
import AddTasks from './components/pages/AddTasks';
import AddTags from './components/pages/AddTags';
import AddLinks from './components/pages/AddLinks';
import UpdateStatus from './components/pages/UpdateStatus';
import db,{auth} from './firebase'
// import UpdateTaskStatus from './components/pages/TaskStatus';
import TaskStatus from './components/pages/TaskStatus';
import RemoveMember from './components/pages/RemoveMember';
import Profile from './components/pages/Profile';
import Job from './components/jobs/Job';
// import './App.css';

function App() {
 
  const [user,setUser] = useState(false);
  const [role,setRole] = useState('');
  
  auth.onAuthStateChanged(function(user) {
    if (user) {
      setUser(user)
      // User is signed in.
      console.log('app.js user: ',user.email)
    } else {
      console.log('no user')
      // No user is signed in.
    }
  });

  db.collection('user_mst').where("email","==",`${user.email}`).get().then(snap => {
    snap.forEach(doc => {
        // console.log('shubham    ',doc.data());
        // console.log('shubham name   ',doc.data().name);
        setRole(doc.data().role);
        // setSkill(doc.data().skill);
        
    })
})
console.log(role)
  
  return (
      <Router>
        <Header useremail={user.email} role={role} />
        <Sidebar />
      <div id="main">
      <Route default exact path="/" ><Signin /></Route>
      <Route path="/addmember" ><AddMember /></Route>
      <Route path="/addmanager" ><AddManager /></Route>
      <Route path="/addjob" ><AddProject useremail={user.email} role={role} /></Route>
      <Route path="/jobs" ><Jobs /></Route>
      <Route path="/profile" ><Profile /></Route>
      <Route path="/job/:id" ><Job /></Route>
            <Route path="/assignmember/:id" ><AssignMember /></Route>
      <Route path="/assignmanager/:id" ><AssignManager /></Route>
      <Route path="/addtasks/:id" ><AddTasks /></Route>
      <Route path="/taskstatus/:id" ><TaskStatus /></Route>
      <Route path="/removemember/:id" ><RemoveMember /></Route>
      <Route path="/addtags/:id" ><AddTags /></Route>
      <Route path="/addlinks/:id" ><AddLinks /></Route>
      
      <Route path="/updatestatus/:id" ><UpdateStatus /></Route>
     {/* <AddManager /> */}
     {/* <AddMember /> */}
    </div>
     </Router>
  );
}

export default App;
