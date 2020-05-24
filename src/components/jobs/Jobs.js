import React, { useState, useEffect } from 'react';
import ProjectSnippet from './JobSnippet';
import db from '../../firebase'
// import './App.css';

const Jobs = (props) => {

    const [projects,setProjects] = useState([])
    const [search,setSearch] = useState('');
    const [results,setResults] = useState([]);

    const onSearchChange = (event) => {setSearch(event.target.value);
    console.log(search)
    }

    useEffect(()=> {

        db.collection('project_mst')
        .onSnapshot(async projects =>{
            let projectsData = await projects.docs.map(project =>{
                let data = project.data()
                let {id} = project
                let payload ={
                    id,
                    ...data
                }
                return payload
            });
            setProjects(projectsData)
        })

        const filterProjects = projects.filter(project =>{
        return project.toLowerCase().includes(search.toLowerCase())
        });
        setResults(filterProjects);
    },[])
    
    
    // useEffect(() => {
    //     // const results = people.filter(person =>
    //     //   person.toLowerCase().includes(searchTerm)
    //     // );
    //     // setSearchResults(results);
    //     setProjects(filterProjects);
    //   }, [search]);


    //     let postRef = db.collection('post_msrt')

    //     postRef.get().then(posts =>{
    //         posts.forEach(post =>{
    //         let data = post.data()
    //         let {id} = post
    //         // console.log('this is the post')
    //         // console.log(data);

    //         let payload = {
    //             id,
    //             ...data
    //         }
    //         // console.log(payload);
    //         setPosts((posts) => [...posts,payload])
    //     })
    // })


  return (
    <div>
        {<input type="text" value={search} onChange={onSearchChange} placeholder="search"></input>}
            {projects.map(project =>  (
                <ProjectSnippet key={project.id} pid={project.id} pname={project.projectname} pdate={project.createdate} pstatus={project.status} /> 
            // <h1>{project.projectname}</h1>        content={post.content}
            ))}
    </div>
  );
}

export default Jobs;
