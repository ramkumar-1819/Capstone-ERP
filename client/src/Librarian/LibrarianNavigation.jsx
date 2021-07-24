import React, { Component,useEffect } from 'react';
import { Route,Link } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import LibrarianProfile from './LibrarianProfile/Profile';
import LibrarianUpdateProfile from './LibrarianUpdateProfile/UpdateProfile';
import LibraianViewEvents from './LibrarianViewEvents';
import IssueBook from './IssueBook/IssueBook';
import ViewBook from './ViewBooks/ViewBooks';
import ReturnBook from './ReturnBook/ReturnBook';

export default function LibrarianNavigation(props){
    //showNavigation is used to show NavBar in Small Screen Size.
    const showNavigations=()=>{
        document.getElementById('Librarian_navbar').classList.toggle('show_Navbar')
        const Librarian_Navlinks=document.querySelectorAll('#Librarian_navbar a')
        Librarian_Navlinks.forEach((value,index)=>{
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
        <div className="Librarian_section">
                    <div id="Librarian_navbar" className='navBars'>
                        <Link to='/Librarian/Profile'>Profile</Link>
                        <Link to='/Librarian/UpdateProfile'>Update Profile</Link>
                        <Link to='/Librarian/IssueBook'>Book Issuing</Link>
                        <Link to='/Librarian/ViewBook'>View/Update Book</Link>
                        <Link to='/Librarian/ReturnBook'>Return Book</Link>
                        <Link to='/Librarian/ViewEvents'>View Events</Link>
                    </div>
                    <div className="hamburger" onClick={showNavigations}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <Route exact path='/Librarian' component={()=><LibrarianProfile/>}/>
                    <Route path='/Librarian/Profile' component={()=><LibrarianProfile/>}/>
                    <Route path='/Librarian/UpdateProfile' component={()=><LibrarianUpdateProfile/>}/>
                    <Route path='/Librarian/ViewEvents' component={()=><LibraianViewEvents/>}/>
                    <Route path='/Librarian/IssueBook' component={()=><IssueBook/>}/>
                    <Route path='/Librarian/ViewBook' component={()=><ViewBook/>}/>
                    <Route path='/Librarian/ReturnBook' component={()=><ReturnBook/>}/>
                </div>
        </>
    )
}