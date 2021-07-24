import React, { Component } from 'react';
import mylogo from  './collegelogo.png';
import axios from 'axios';
import './MainHeader.css'
import { withRouter } from 'react-router';
import {useSelector,useDispatch} from 'react-redux';

function MainHeader(props){
    const dispatch=useDispatch()
    //When the logged in person logout then remove the token and redirect to home page.
    const logoutHandler=()=>{
        axios.get('http://localhost:8080/Logout',{withCredentials:true})
        .then(ok=>{
            dispatch({type:"Logout"})
            props.history.push('/Home')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <div id="header">
            <img className="college_logo" src={mylogo} alt='college_logo'></img>
            <div className="college_name mainpage_college_name">RAM'S COLLEGE OF ENGINEERING</div>
            <div className="logout_button" onClick={logoutHandler}>Logout</div>
        </div>
    )
}
export default withRouter(MainHeader)