import React, {useState,useEffect, Fragment} from 'react';
import db from '../../firebase';
import {useParams,useHistory} from 'react-router-dom';
// import Posts from '';
// import './App.css';


const AddLinks = (props) => {

    let { id } = useParams();
    const history = useHistory();
    // console.log('create',props.user.uid)
    
    const [role,setRole] = useState('');
    const [assigned,setAssigned] = useState('');
    const [memberval,setMember] = useState('');
    const [projectname,setProjectname] = useState('');
    const [status,setStatus] = useState('');
    const [createdate,setCreatedate] = useState('');
      const [description,setDescription] = useState('');
      const [links,setLinks] = useState([]);
      const [linkval,setLinkval] = useState('');
      const [linknameval,setLinknameval] = useState('');
    
      const onLinknameChange = (event) => setLinknameval(event.target.value);
    const onLinkChange = (event) => setLinkval(event.target.value);
    

    useEffect(()=> {

    

        let projectRef = db.collection('project_mst').doc(id)
        // console.log(id);
        projectRef.get().then(doc =>{
        //  console.log(doc.data());
          let {projectname,status,createdate,description} = doc.data()
            setProjectname(projectname);
            setStatus(status);
            // setMembers(members);
            setCreatedate(createdate);
            setDescription(description);
          
          
            // console.log(projectname,status,createdate,description,members,tags,tasks,links,approved,assignedmanager)
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



    // let postRef = db.collection('user_mst').where("assigned","==","no").where("role","==","manager").get().then(snap => {
    //     snap.forEach(doc => {
    //         // console.log('shubham    ',doc.data());
    //         // console.log('shubham name   ',doc.data().name);
    //         // setName(doc.data().name);
    //         // setSkill(doc.data().skill);
    //         console.log(doc.data().username);
    //     })
    // })
                                        const onAddLinks = () => {
                                            // console.log('inside assign',memberval);
        // console.log(content);
        var projectid= id;
        var linkname= linknameval;
        var link = linkval;
        let postRef = db.collection('project_link_mapping');
        let payload = {projectid,linkname,link}
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

   <span>
        <span className="font-weight-bold mr-5">Add Link  </span>
        <input type="text" className="mx-2" value={linknameval} onChange={onLinknameChange} placeholder="link name" />         
        <input type="text" value={linkval} onChange={onLinkChange} placeholder="web address" />       
        <button className="mx-2 btn btn-primary" onClick={onAddLinks}>Add Link</button> 
    </span> 
   </div>
   </div>
   
      
    </div>
  );
}

export default AddLinks;