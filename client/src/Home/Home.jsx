import React, { Component,useEffect } from 'react';
import Header from '../Header/Header';
import './Home.css';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';

//This is Home Component,it has header and login form.
export default function Home(props){
    //authenticator - Hold the Person who is going to Login
    const authenticator=useSelector(state=>state.auth);
    useEffect(()=>{
        document.getElementById('login_alert').innerHTML="";
        document.getElementById('registration_number').value="";
        document.getElementById('password').value=""
    })
    //Submit User Form
    const submitUser=()=>{
        document.getElementById('submit_login').innerHTML="LOADING......"
        document.getElementById('submit_login').style.opacity='0.5';
        setTimeout(()=>{
        const register_number=document.getElementById('registration_number');
        const password=document.getElementById('password');
        const alert_message=document.getElementById('login_alert');
        if(register_number.value===""){
            alert_message.innerHTML="Enter the Register Number";
            register_number.focus()
            document.getElementById('submit_login').innerHTML="SUBMIT"
            document.getElementById('submit_login').style.opacity='1';
            return
        }
        if(password.value===""){
            alert_message.innerHTML="Enter the Password";
            password.focus()
            document.getElementById('submit_login').innerHTML="SUBMIT"
            document.getElementById('submit_login').style.opacity='1';
            return
        }
        axios.post('http://localhost:8080/Signin',{
            _id:register_number.value,
            password:password.value,
            type:authenticator
        },{withCredentials:true})
        .then(result=>{
            console.log(result)
            document.getElementById('submit_login').innerHTML="SUBMIT"
            document.getElementById('submit_login').style.opacity='1';
            props.history.push({
                pathname:`/${authenticator}`
            })
        })
        .catch(err=>{
            if(err.response.data){
                alert_message.innerHTML=err.response.data.Error;
            }
            else{
                console.log(err)
            }
            document.getElementById('submit_login').innerHTML="SUBMIT"
            document.getElementById('submit_login').style.opacity='1';
        })
    },3000)
    }
    const changeAlertmessage=()=>{
        document.getElementById('login_alert').innerHTML=""
    }
    return(
        <>
            <Header/>
            <div id="home_page">
                <form id="login_form">
                    <h3>{authenticator} Login</h3>
                    <div>
                        <label htmlFor="registration_number">Registration Number</label>
                        <input id="registration_number"
                            name="reg_number" type="text"
                            onChange={changeAlertmessage}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password"
                             name="password" type="password"
                             onChange={changeAlertmessage} placeholder='YYYY-MM-DD'/>
                    </div>
                    <div id="login_alert"></div>
                    <button id="submit_login" type='button' onClick={submitUser}>SUBMIT</button>
                </form>
            </div>
        </>
    )
}