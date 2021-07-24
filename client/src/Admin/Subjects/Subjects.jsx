import React, { Component,useEffect } from 'react';
import './Subjects.css'
import {Link,Route} from 'react-router-dom';
import ViewSubjects from './ViewSubjects';
import AddSubjects from './AddSubjects';

export default function Subjects(props){
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Admin_Navlinks=document.getElementById('Admin_navbar').children;
        for(const links of Admin_Navlinks){
            links.style.color='white';
        }
        Admin_Navlinks[10].style.color='gray';
    },[])
    return(
    <div id='Subjects_Section'>
        <div className='subjects_navlinks'>
            <Link to='/Admin/Subjects/ViewSubjects'><button className='common_submitButton'>View Subjects</button></Link>
            <Link to='/Admin/Subjects/AddSubjects'><button className='common_submitButton'>Add Subjects</button></Link>
        </div>
        <Route exact path='/Admin/Subjects' component={ViewSubjects}/>
        <Route path='/Admin/Subjects/ViewSubjects' component={ViewSubjects}/>
        <Route path='/Admin/Subjects/AddSubjects' component={AddSubjects}/>
    </div>
)
}