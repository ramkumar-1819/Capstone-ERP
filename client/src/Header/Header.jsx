import React, { Component } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import logo from '../JEC_logo.jpeg'
import './Header.css'

//This is Header component used in Home Page
export default function Header(){
    const dispatch=useDispatch();
    //showLoginHandler - Show the dropdown to select the Login Person
    const showLoginHandler=()=>{
        document.getElementById('login_members').classList.toggle('show')
        document.getElementsByClassName('login_button')[0].classList.toggle('changecolor')
    }
    //authenticatorHandler - Show the Login Form when Login Person Selected from Dropdown
    const authenticatorHandler=(e)=>{
        dispatch({type:e.target.innerHTML})
        showLoginHandler()
        document.getElementById('login_form').style.visibility='visible';
    }
    return(
        <div id="header">
            <img className="college_logo" src={logo} alt='college_logo'></img>
            <div className="college_name">JEPPIAAR ENGINEERING COLLEGE</div>
            <div className="login_button" onClick={showLoginHandler}>ERP Login</div>
            <div id="login_members">
                <div onClick={(e)=>authenticatorHandler(e)}>Admin</div>
                <div onClick={(e)=>authenticatorHandler(e)}>Faculty</div>
                <div onClick={(e)=>authenticatorHandler(e)}>Student</div>
                <div onClick={(e)=>authenticatorHandler(e)}>Librarian</div>
            </div>
        </div>
    )
}