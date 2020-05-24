import React, { useState,useEffect, Fragment } from 'react';
// import './App.css';
import db from '../../firebase'
import {useParams,Link} from 'react-router-dom';

const Job = (props) => {
  // console.log("post")
  // console.log(props);
  let { id } = useParams();

  const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [contact,setContact] = useState('');
  const [projectname,setProjectname] = useState('');
  const [status,setStatus] = useState('');
  const [createdate,setCreatedate] = useState('');
    const [description,setDescription] = useState('');
    const [tags,setTags] = useState([]);
    const [tasks,setTasks] = useState([]);
    const [members,setMembers] = useState([]);
    const [managers,setManagers] = useState([]);
    const [links,setLinks] = useState([]);
    const [approved,setApproved] = useState('');
    // const [assignedmanager,setAssignedmanager] = useState('');
  // const [comment,setComment] = useState('')

  // const onCommentChange = (event) => setComment(event.target.value);

  // const onCreateComment = () => {

  //   let commentRef = db.collection('post_msrt').doc(id).collection('comment_mst');
  //   let commentpayload = {comment}
  //       // console.log(payload)
  //       commentRef.add(commentpayload)
  //       .then(function(commentfile){
  //           console.log("comment doc",commentfile)
  //       })

  // }

  useEffect(() => {
    // console.log("use effect post")
    // console.log(props)
      
    // if (id !== null && id !== undefined) {  
    let projectRef = db.collection('project_mst').doc(id)
    // console.log(id);
    projectRef.get().then(doc =>{
    //  console.log(doc.data());
      let {projectname,status,createdate,description,approved} = doc.data()
        setProjectname(projectname);
        setStatus(status);
        setCreatedate(createdate);
        setDescription(description);
        setApproved(approved);
        // setAssignedmanager(assignedmanager);
     
     
     
        // setTitle(title);
        // setContent(content);
        // setCount(count);
        // let {id} = post
        // console.log('this is the post')
        // console.log(title);
        // console.log(content);
        
  })


  db.collection('project_member_mapping').where("projectid","==",`${id}`)
  .onSnapshot(async members =>{
      let membersData = await members.docs.map(member =>{
          let data = member.data()
          let {id} = member
          let payload ={
              id,
              ...data
          }
          return payload
      });
      setMembers(membersData)
  })


  db.collection('project_manager_mapping').where("projectid","==",`${id}`)
  .onSnapshot(async managers =>{
      let managersData = await managers.docs.map(manager =>{
          let data = manager.data()
          let {id} = manager
          let payload ={
              id,
              ...data
          }
          return payload
      });
      setManagers(managersData)
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

  db.collection('project_tag_mapping').where("projectid","==",`${id}`)
        .onSnapshot(async tags =>{
            let tagsData = await tags.docs.map(tag =>{
                let data = tag.data()
                let {id} = tag
                let payload ={
                    id,
                    ...data
                }
                return payload
            });
            setTags(tagsData)
        })

        db.collection('project_link_mapping').where("projectid","==",`${id}`)
        .onSnapshot(async links =>{
            let linksData = await links.docs.map(link =>{
                let data = link.data()
                let {id} = link
                let payload ={
                    id,
                    ...data
                }
                return payload
            });
            setLinks(linksData)
        })
      },[])

  
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
 <p><span className="font-weight-bold">Job name :</span>{projectname}</p>
    <p><span className="font-weight-bold">Date Created :</span> {createdate}</p>
    <p><span className="font-weight-bold">Description :</span> {description}</p>
    <p><span className="font-weight-bold">Is Job Approved : </span>
            {approved=="no"?" Not yet ! ":" Yes the project is approved !! "}
            </p>
    <p><span className="font-weight-bold">Tags : </span>
    {tags.map(tag =>  (
              <span className="btn btn-outline-secondary mx-2" key={tag.tag}> {tag.tag}</span>        
              // content={post.content}
              ))}
              </p>
            <p><span className="font-weight-bold">Links : </span>
    <ol className="ml-5">
    {links.map(link =>  (
      <Fragment key={link.link}>
              <li > {link.linkname} </li>
              <h6>Link: {link.link}</h6>
              </Fragment>
            // content={post.content}
            ))}
            </ol>
            </p>
              <p><span className="font-weight-bold my-2">Tasks : </span>
              <table class="table">
  <thead class="thead-dark table-striped">
    <tr>
      <th scope="col">Task Name</th>
      <th scope="col">Task Status</th>
      <th scope="col">Operation</th>
    </tr>
  </thead>
  <tbody>
    {tasks.map(task =>  (
      <tr key={task.id}>
      <td>{task.task}</td>
      <td>{task.taskstatus}</td>
      <td><button className="btn btn-info my-2"><Link to={`../taskstatus/${task.id}`} className="text-white text-capitalize">update tasks stauts</Link></button></td>
</tr>
            // content={post.content}
            ))}
            </tbody>
            </table>
            </p>

            
            <p><span className="font-weight-bold">Managers : </span>
    {managers.length?
    managers.map(manager =>  (
      <span className="ml-2" key={manager.email}> {manager.email}</span>        
      // content={post.content}
      ))
    
            :
            <Fragment>
            <span className="ml-2"><h4>no manager asssigned yet</h4><button><Link to={`../assignmanager/${id}`}>assign manager</Link></button></span>
            </Fragment>
            }
            </p>
            <p><span className="font-weight-bold">Members : </span>
            <ol className="ml-5">
     {/* <h1>{count}</h1> */}
    {members.map(member =>  (
      <Fragment key={member.id}>
              <li> {member.email}        
              <Link className="ml-4" to={`/removemember/${member.id}`}>Remove</Link>
              </li>
            </Fragment>
            // content={post.content}
            ))}
            </ol>
            </p>

           
    {/* <h1>assignedmanager: {assignedmanager}</h1> */}

    {/* <h4>Comments</h4> */}
    {/* <input type="text" value={comment} onChange={onCommentChange} placeholder="Type your Comments" /> */}
    {/* <button onClick={onCreateComment}>Submit Comment</button> */}
    
    <button className="btn btn-primary mx-2"><Link className="text-white text-capitalize" to={`../assignmember/${id}`}>assign member</Link></button>
    <button className="btn btn-warning mx-2"><Link className="text-white text-capitalize" to={`../addtags/${id}`}>add tags</Link></button>
    <button className="btn btn-info mx-2"><Link className="text-white text-capitalize" to={`../addtasks/${id}`}>add tasks</Link></button>
    
    <button className="btn btn-info mx-2"><Link className="text-white text-capitalize" to={`../addlinks/${id}`}>add link</Link></button>
    </div>
            </div>
          </div>
  );
}

export default Job;