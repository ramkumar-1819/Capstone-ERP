import React, { Component,useEffect } from 'react';
import { Route,Link } from 'react-router-dom';
import StudentProfile from './Profile/StudentProfile';
import MainHeader from '../MainHeader/MainHeader';
import StudentUpdateProfile from './UpdateProfile/UpdateProfile';
import ViewTimeTable from './ViewTimeTable/ViewTimeTable';
import ViewMarks from './ViewMarks/ViewMarks';
import ViewAttendence from './ViewAttendence/ViewAttendence';
import StudentViewEvents from './StudentEvent';
import StudentViewBook from './ViewBooks/ViewBook';
import ViewSubjects from './ViewSubjects/ViewSubjects';

export default function FacultyNavigation(props){
    //showNavigation is used to show NavBar in Small Screen Size.
    const showNavigations=()=>{
        document.getElementById('Student_navbar').classList.toggle('show_Navbar')
        const Admin_Navlinks=document.querySelectorAll('#Student_navbar a')
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
        <div className="Student_section">
                    <div id="Student_navbar" className='navBars'>
                        <Link to='/Student/Profile'>Profile</Link>
                        <Link to='/Student/UpdateProfile'>Update Profile</Link>
                        <Link to='/Student/ViewTimeTable'>View TimeTable</Link>
                        <Link to='/Student/ViewMarks'>View Marks</Link>
                        <Link to='/Student/ViewAttendence'>View Attendence</Link>
                        <Link to='/Student/ViewBooks'>View Books</Link>
                        <Link to='/Student/ViewSubjects'>View Subjects</Link>
                        <Link to='/Student/ViewEvents'>View Events</Link>
                    </div>
                    <div className="hamburger" onClick={showNavigations}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <Route exact path='/Student' component={()=><StudentProfile/>}/>
                    <Route path='/Student/Profile' component={()=><StudentProfile/>}/>
                    <Route path='/Student/UpdateProfile' component={()=><StudentUpdateProfile/>}/>
                    <Route path='/Student/ViewTimeTable' component={()=><ViewTimeTable/>}/>
                    <Route path='/Student/ViewMarks' component={()=><ViewMarks/>}/>
                    <Route path='/Student/ViewAttendence' component={()=><ViewAttendence/>}/>
                    <Route path='/Student/ViewEvents' component={()=><StudentViewEvents/>}/>
                    <Route path='/Student/ViewBooks' component={()=><StudentViewBook/>}/>
                    <Route path='/Student/ViewSubjects' component={()=><ViewSubjects/>}/>
                </div>
        </>
    )
}