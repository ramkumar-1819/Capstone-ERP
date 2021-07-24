import React, { Component,useEffect } from 'react';
import { Route,Link } from 'react-router-dom';
import FacultyProfile from './Profile/FacultyProfile';
import MainHeader from '../MainHeader/MainHeader'
import FacultyUpdateProfile from './UpdateProfile/UpdateProfile';
import MarkAttendence from './MarkAttendence/MarkAttendence';
import ViewAttendence from './ViewAttendence/ViewAttendence';
import AddResult from './Result/AddResult';
import ViewResult from './ViewResult/ViewResult';
import TimeTable from './TimeTable/TimeTable';
import ViewTimeTable from './ViewTimeTable/ViewTimeTable';
import FacultyViewEvents from './FacultyEvent';

export default function FacultyNavigation(props){
    //showNavigation is used to show NavBar in Small Screen Size.
    const showNavigations=()=>{
        document.getElementById('Faculty_navbar').classList.toggle('show_Navbar')
        const Admin_Navlinks=document.querySelectorAll('#Faculty_navbar a')
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
        <div className="Faculty_section">
                    <div id="Faculty_navbar" className='navBars'>
                        <Link to='/Faculty/Profile'>Profile</Link>
                        <Link to='/Faculty/UpdateProfile'>Update Profile</Link>
                        <Link to='/Faculty/MarkAttendence'>Mark Attendence</Link>
                        <Link to='/Faculty/ViewAttendence'>View Attendence</Link>
                        <Link to='/Faculty/AddResult'>Add Result</Link>
                        <Link to='/Faculty/ViewResult'>View Result</Link>
                        <Link to='/Faculty/TimeTable'>Add TimeTable</Link>
                        <Link to='/Faculty/ViewTimeTable'>View TimeTable</Link>
                        <Link to='/Faculty/ViewEvent'>View Events</Link>
                    </div>
                    <div className="hamburger" onClick={showNavigations}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <Route exact path='/Faculty' component={()=><FacultyProfile/>}/>
                    <Route path='/Faculty/Profile' component={()=><FacultyProfile/>}/>
                    <Route path='/Faculty/UpdateProfile' component={()=><FacultyUpdateProfile/>}/>
                    <Route path='/Faculty/MarkAttendence' component={()=><MarkAttendence/>}/>
                    <Route path='/Faculty/ViewAttendence' component={()=><ViewAttendence/>}/>
                    <Route path='/Faculty/AddResult' component={()=><AddResult/>}/>
                    <Route path='/Faculty/ViewResult' component={()=><ViewResult/>}/>
                    <Route path='/Faculty/TimeTable' component={()=><TimeTable/>}/>
                    <Route path='/Faculty/ViewTimeTable' component={()=><ViewTimeTable/>}/>
                    <Route path='/Faculty/ViewEvent' component={()=><FacultyViewEvents/>}/>
                </div>
        </>
    )
}