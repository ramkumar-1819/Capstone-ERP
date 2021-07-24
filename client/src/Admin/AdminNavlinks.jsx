import React, { Component,useEffect } from 'react';
import { Route,Link } from 'react-router-dom';
import AdminProfile from './AdminProfile/AdminProfile';
import MainHeader from '../MainHeader/MainHeader';
import AdminUpdateProfile from './Admin_UpdateProfile/UpdateProfile';
import AddAdmin from './AddAdmin/AddAdmin';
import AddStudent from './AddStudent/AddStudent';
import AddFaculty from './AddFaculty/AddFaculty';
import AddLibrarian from './AddLibrarian/AddLibrarian';
import OurStudents from './OurStudents/OurStudents';
import OurFaculties from './OurFaculties/OurFaculties';
import OurLibrarians from './OurLibrarians/OurLibrarians';
import AddEvent from './AddEvent/AddEvent';
import Subjects from './Subjects/Subjects';

export default function AdminNavigation(props){
    //showNavigation is used to show NavBar in Small Screen Size.
    const showNavigations=()=>{
        document.getElementById('Admin_navbar').classList.toggle('show_Navbar')
        const Admin_Navlinks=document.querySelectorAll('#Admin_navbar a')
        Admin_Navlinks.forEach((value,index)=>{
            if(value.style.animation){
                value.style.animation=""
            }
            else{
                value.style.animation=`navLinkAnimation 0.5s ease forwards ${index/7}s `;
            }
        })
        document.getElementsByClassName('hamburger')[0].classList.toggle('cross_hamburger')
    }
    //This Component Hold NavLinks and render different Component Based on Route.
    return(
        <>
        <MainHeader/>
        <div className="Admin_section">
                    <div id="Admin_navbar" className="navBars">
                        <Link to='/Admin/Profile'>Profile</Link>
                        <Link to='/Admin/UpdateProfile'>Update Profile</Link>
                        <Link to='/Admin/AddAdmin'>Add Admin</Link>
                        <Link to='/Admin/AddStudent'>Add Student</Link>
                        <Link to='/Admin/AddFaculty'>Add Faculty</Link>
                        <Link to='/Admin/AddLibrarian'>Add Librarian</Link>
                        <Link to='/Admin/OurStudents'>Our Students</Link>
                        <Link to='/Admin/OurFaculties'>Our Faculties</Link>
                        <Link to='/Admin/OurLibrarians'>Our Librarians</Link>
                        <Link to='/Admin/AddEvent'>Add Events</Link>
                        <Link to='/Admin/Subjects'>Subjects</Link>
                    </div>
                    <div className="hamburger" onClick={showNavigations}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <Route exact path='/Admin' component={()=><AdminProfile/>}/>
                    <Route path='/Admin/Profile' component={()=><AdminProfile/>}/>
                    <Route path='/Admin/UpdateProfile' component={()=><AdminUpdateProfile/>}/>
                    <Route path='/Admin/AddAdmin' component={()=><AddAdmin/>}/>
                    <Route path='/Admin/AddStudent' component={()=><AddStudent/>}/>
                    <Route path='/Admin/AddFaculty' component={()=><AddFaculty/>}/>
                    <Route path='/Admin/AddLibrarian' component={()=><AddLibrarian/>}/>
                    <Route path='/Admin/OurStudents' component={()=><OurStudents/>}/>
                    <Route path='/Admin/OurFaculties' component={()=><OurFaculties/>}/>
                    <Route path='/Admin/OurLibrarians' component={()=><OurLibrarians/>}/>
                    <Route path='/Admin/AddEvent' component={()=><AddEvent/>}/>
                    <Route path='/Admin/Subjects' component={()=><Subjects/>}/>
                </div>
        </>
    )
}