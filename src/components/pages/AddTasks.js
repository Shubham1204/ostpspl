import React, {useState,useEffect, Fragment} from 'react';
import db from '../../firebase';
import {useParams,Link} from 'react-router-dom';
// import Posts from '';
// import './App.css';


const AddTasks = (props) => {

    let { id } = useParams();

    // console.log('create',props.user.uid)
    
    const [role,setRole] = useState('');
    const [assigned,setAssigned] = useState('');
    const [memberval,setMember] = useState('');
    const [projectname,setProjectname] = useState('');
    const [status,setStatus] = useState('');
    const [createdate,setCreatedate] = useState('');
      const [description,setDescription] = useState('');
      const [tags,setTags] = useState('');
      const [tasks,setTasks] = useState([]);
      const [taskval,setTaskval] = useState('');
      
    
    const onTaskChange = (event) => setTaskval(event.target.value);
    
    

    useEffect(()=> {

    

        let projectRef = db.collection('project_mst').doc(id)
        // console.log(id);
        projectRef.get().then(doc =>{
        //  console.log(doc.data());
          let {projectname,status,createdate,description,tags} = doc.data()
            setProjectname(projectname);
            setStatus(status);
            // setMembers(members);
            setCreatedate(createdate);
            setDescription(description);
            setTags(tags);
          
            // console.log(projectname,status,createdate,description,members,tags,tasks,links,approved,assignedmanager)
        })   
        
        db.collection('project_task_mapping').where("projectid","==",`${id}`)
        .onSnapshot(async tasks =>{
            let tasksData = await tasks.docs.map(task =>{
                let data = task.data()
                let {id} = task
                let payload ={
                    id,
                    ...data
                }
                return payload
            });
            setTasks(tasksData)
        })
    },[])



    // let postRef = db.collection('user_mst').where("assigned","==","no").where("role","==","manager").get().then(snap => {
    //     snap.forEach(doc => {
    //         // console.log('shubham    ',doc.data());
    //         // console.log('shubham name   ',doc.data().name);
    //         // setName(doc.data().name);
    //         // setSkill(doc.data().skill);
    //         console.log(doc.data().username);
    //     })
    // })
                                        const onAddTasks = () => {
                                            // console.log('inside assign',memberval);
        // console.log(content);
        var projectid= id;
        var taskstatus ="pending";
        var task = taskval;
        let postRef = db.collection('project_task_mapping');
        let payload = {projectid,task,taskstatus}
        // console.log(payload)
        // console.log(role);
        postRef.add(payload)
        .then(function(file){
            // updateassignedstatus();
            console.log("doc",file)
        })
        // setTitle('')
        // setContent('')
        // setUserid('')
        // navigate('/')
    }
   

  return (
    <div>
            <div class="card">
  <div class="card-body">
    <span className="float-left"><span className="font-weight-bold">Project name : </span> {projectname}</span>
    <span className="float-left text-success font-weight-bold mx-5">Status: {status}</span>
  </div>
</div>
<div className="card mt-3">
  <div className="card-body">
 <p><span className="font-weight-bold">Project name :</span>{projectname}</p>
    <p><span className="font-weight-bold">Date Created :</span> {createdate}</p>
    <p><span className="font-weight-bold">Description :</span> {description}</p>
    <p><span className="font-weight-bold my-2">Tasks : </span>
              <table class="table">
  <thead class="thead-dark table-striped">
    <tr>
      <th scope="col">Task Name</th>
      <th scope="col">Task Status</th>
    </tr>
  </thead>
  <tbody>
    {tasks.map(task =>  (
      <tr key={task.id}>
      <td>{task.task}</td>
      <td>{task.taskstatus}</td>
     </tr>
            // content={post.content}
            ))}
            </tbody>
            </table>
            </p>

            
       
        <br></br>
        <span>
        <span className="font-weight-bold mr-5">Add Task  </span>
        <input type="text" value={taskval} onChange={onTaskChange} placeholder="task name" />         
        <button className="mx-2 btn btn-primary" onClick={onAddTasks}>Add task</button> 
    </span>
    
  {/* <div class="form-group mb-2">
    <label for="inputPassword2">Password</label>
    <input type="password" class="form-control col-6" id="inputPassword2" placeholder="Password"></input>
  <button className="mx-2" onClick={onAddTasks}>Add task</button> 
  </div> */}
  {/* <button type="submit" class=" mb-2">Confirm identity</button> */}
    </div>
    </div>
            </div>
  );
}

export default AddTasks;