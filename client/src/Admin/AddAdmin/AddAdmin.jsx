import React, { Component,useEffect } from 'react';
import './AddAdmin.css'
import axios from 'axios';

//This Component is used to Add another Admin by Admin

export default function AddAdmin(props){
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Admin_Navlinks=document.getElementById('Admin_navbar').children;
        for(const links of Admin_Navlinks){
            links.style.color='white';
        }
        Admin_Navlinks[2].style.color='gray';
    },[])
    //When AddAdmin form is submit React perform Client Side Validation and submit it to backend.
    const submitAddAdmin_Form=(e)=>{
        e.preventDefault()
        document.getElementById('submit_addadmin').innerHTML="ADDING";
        document.getElementById('submit_addadmin').style.opacity='0.5';
        axios.post('http://localhost:8080/AddAdmin',{
            register_number:document.getElementById('addadmin_reg_no').value,
            name:document.getElementById('addadmin_name').value,
            date_of_birth:document.getElementById('addadmin_dob').value,
            email:document.getElementById('addadmin_email').value,
            phone_number:document.getElementById('addadmin_phone').value,
            type:'Admin',
            joining_year:document.getElementById('addadmin_joining_year').value
        })
        .then(res=>{
            alert("Created Successfully")
            document.getElementById('submit_addadmin').innerHTML="ADD ADMIN";
            document.getElementById('submit_addadmin').style.opacity='1';
            window.location.reload()
        })
        .catch(err=>{
            document.getElementById('alert_addadmin').innerHTML=err.response.data.Error;
            document.getElementById('submit_addadmin').innerHTML="ADD ADMIN";
            document.getElementById('submit_addadmin').style.opacity='1';
        })
    }
    //When Error Occur a message is shown and whenever onChanging the input these message should be hidden.
    const hideAddAdmin_alert=()=>{
        document.getElementById('alert_addadmin').innerHTML="";
    }
    return(
        <div className="AddAdmin_Section">
            <form id="AddAdmin_Form" onSubmit={submitAddAdmin_Form}>
                <div>
                    <label htmlFor="addadmin_name">Name</label>
                    <input id='addadmin_name' type='text' required onChange={hideAddAdmin_alert}></input>
                </div>
                <div>
                    <label htmlFor="addadmin_reg_no">Register Number</label>
                    <input id='addadmin_reg_no' type='text' required onChange={hideAddAdmin_alert}></input>
                </div>
                <div>
                    <label htmlFor="addadmin_dob">Date-Of-Birth</label>
                    <input id='addadmin_dob' type='date' required onChange={hideAddAdmin_alert}></input>
                </div>
                <div>
                    <label htmlFor="addadmin_email">Email</label>
                    <input id='addadmin_email' type='email' onChange={hideAddAdmin_alert}></input>
                </div>
                <div>
                    <label htmlFor="addadmin_phone">Phone Number</label>
                    <input id='addadmin_phone' type='number' onChange={hideAddAdmin_alert}></input>
                </div>
                <div>
                    <label htmlFor="addadmin_joining_year">Year-Of-Joining</label>
                    <input id='addadmin_joining_year' type='number' required onChange={hideAddAdmin_alert}></input>
                </div>
                <button type='submit' id="submit_addadmin" className='common_submitButton'>ADD ADMIN</button>
            </form>
            <div id="alert_addadmin" className='alert_msg'></div>
        </div>
    )
}