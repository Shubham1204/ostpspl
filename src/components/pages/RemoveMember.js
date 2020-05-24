import React, { useState, useEffect, Fragment } from 'react';
import db from '../../firebase';
import { useParams,Link } from 'react-router-dom';
// import Posts from '';
// import './App.css';


const RemoveMember = (props) => {

  let { id } = useParams();

  // console.log('create',props.user.uid)

  const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [contact,setContact] = useState('');
    // const [role,setRole] = useState('');
    // const [assigned,setAssigned] = useState('');
  const [role, setRole] = useState('');
  const [assigned, setAssigned] = useState('');
  const [memberval, setMember] = useState('');
  const [projectname, setProjectname] = useState('');
  const [status, setStatus] = useState('');
  const [createdate, setCreatedate] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [tasks, setTasks] = useState([]);
  // const [taskval, setTaskval] = useState('');
  // const [taskstatusval, setTaskstatusval] = useState('');
  const [taskstatusval, setTaskstatusval] = useState('');

  const [taskname, setTaskname] = useState('');
  const [taskstatus, setTaskStatus] = useState('');

  const onStatusChange = (event) => setTaskstatusval(event.target.value);


  // const onStatusChange = (event) => setTaskstatusval(event.target.value);



  useEffect(() => {



    let projectRef = db.collection('project_member_mapping').doc(id)
    // console.log(id);
    projectRef.get().then(doc => {
      //  console.log(doc.data());
      let { email } = doc.data()
      setEmail(email);
    //  setUsername(username);
    //  setContact(contact);
    //  setAssigned(assigned);
      // setMembers(members);
      // setCreatedate(createdate);
      // setDescription(description);
      // setTags(tags);

      // console.log(projectname,status,createdate,description,members,tags,tasks,links,approved,assignedmanager)
    })

    // let memberRef = db.collection('user_mst').where("email","==",{email})
    // // console.log(id);
    // memberRef.get().then(doc1 => {
    //   //  console.log(doc.data());
    //   let { username,contact,assigned } = doc1.data()
    //   // setEmail(email);
    //  setUsername(username);
    //  setContact(contact);
    //  setAssigned(assigned);
    //   // setMembers(members);
    //   // setCreatedate(createdate);
    //   // setDescription(description);
    //   // setTags(tags);

    //   // console.log(projectname,status,createdate,description,members,tags,tasks,links,approved,assignedmanager)
    // })

    // console.log('email',email)
    

    // db.collection('project_task_mapping').where("projectid", "==", `${id}`)
    //   .onSnapshot(async tasks => {
    //     let tasksData = await tasks.docs.map(task => {
    //       let data = task.data()
    //       let { id } = task
    //       let payload = {
    //         id,
    //         ...data
    //       }
    //       return payload
    //     });
    //     setTasks(tasksData)
    //   })
  }, [])
  
//   const ondata = () =>{
//   let memberRef = db.collection('user_mst').where("email","==",'ram@gmail.com').get().then(snap => {
//     snap.forEach(doc => {
//       let { username,contact,assigned } = doc.data()
//         setUsername(username);
// setContact(contact);
// setAssigned(assigned);
//         console.log('shubham    ',doc.data());
//         // console.log('shubham name   ',doc.data().name);
//         // setName(doc.data().name);
//         // setSkill(doc.data().skill);
//         console.log(doc.data().username);
//     })
// })
//   }

  // let postRef = db.collection('user_mst').where("assigned","==","no").where("role","==","manager").get().then(snap => {
  //     snap.forEach(doc => {
  //         // console.log('shubham    ',doc.data());
  //         // console.log('shubham name   ',doc.data().name);
  //         // setName(doc.data().name);
  //         // setSkill(doc.data().skill);
  //         console.log(doc.data().username);
  //     })
  // })
  const onRemove = () => {
    console.log('inside task status',email);

    db.collection("project_member_mapping").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
      updateassign();
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  const updateassign = () =>{
  db.collection('user_mst').where("email","==",{email})
  .get()
  .then(function (querySnapshot) {
    // querySnapshot.forEach(function (doc) {
      //   console.log(doc.id, " => ", doc.data());
      // Build doc ref from doc.id
      db.collection("user_mst").doc().update({
        assigned:"no"
        // name: name,
        // skill: skill,
        // userid: userid
        //    skill: {skill}
      });
    // });
  })






    
  //   // console.log(content);
  //   // var projectid= id;
  //   // var taskstatus ="pending";
  //   // var task = taskval;
  //   // let postRef = db.collection('project_task_mapping');
  //   // let payload = {projectid,task,taskstatus}
  //   // // console.log(payload)
  //   // // console.log(role);
  //   // postRef.add(payload)
  //   // .then(function(file){
  //   //     // updateassignedstatus();
  //   //     console.log("doc",file)
  //   // })
  //   // setTitle('')
  //   // setContent('')
  //   // setUserid('')
  //   // navigate('/')
  }


  return (
    <div>
      
      <h1>current member email:</h1>
  
  <h4>email: {email}</h4>
  {/* <h4>conatct: {contact}</h4>
  <h4>assigned: {assigned}</h4> */}
      
      

      <button onClick={onRemove}>Remove him from project</button>
      
      {/* <h1>tasks:</h1>
      <ol>
        {tasks.map(task => (
          <Fragment key={task.task}>
            <li > {task.task}</li>
            <h5>status: {task.taskstatus}</h5>
            <button><Link to={`/updatetaskstatus/${task.id}`}>Update This task status</Link></button>
          </Fragment>
          // content={post.content}
        ))}
      </ol> */}





      {/* <h5>Name</h5>
        <input type="text" value={username} onChange={onUsernameChange} />
        <h5>Email</h5>
        <input type="email" value={email} onChange={onEmailChange} />
        <h5>contact Number</h5>
        <input type="text" value={contact} onChange={onContactChange} />
        <h5>password</h5>
        <input type="password" value={password} onChange={onPasswordChange} />
        */}








      {/* <select onChange={onStatusChange}>
        <option value="-1">Select</option>
        <option value="in progress">in progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={onUpdateTaskStatus}>UpdateTaskStatus</button> */}
    </div>
  );
}

export default RemoveMember;