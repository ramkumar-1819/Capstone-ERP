import React, { Component,useEffect } from 'react';
import './AddLibrarian.css';
import axios from 'axios';

export default function AddLibrarian(props){
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Admin_Navlinks=document.getElementById('Admin_navbar').children;
        for(const links of Admin_Navlinks){
            links.style.color='white';
        }
        Admin_Navlinks[5].style.color='gray';
    },[])
    //Button Style apply Styles to button whenever Submitting and got datas back from backend.
    const applyButtonStyle=()=>{
        document.getElementById('submit_addlibrarian').innerHTML="ADDING...";
        document.getElementById('submit_addlibrarian').style.opacity='0.5';
    }
    const removeButtonStyle=()=>{
        document.getElementById('submit_addlibrarian').innerHTML="Add Librarian";
        document.getElementById('submit_addlibrarian').style.opacity='1';
    }
    //Remove the error message shown whenever input is changed.
    const removeAlertMessage=()=>{
        document.getElementById('addlibrarian_alert').innerHTML="";
    }
    //When Submitting the ADD LIBRARIAN then Client Side validation done and submit it to backend.
    const submit_AddLibrarianForm=(e)=>{
        e.preventDefault();
        applyButtonStyle()
        const register_number=document.getElementById('addlibrarian_reg_no').value;
        const name=document.getElementById('addlibrarian_name').value;
        const email=document.getElementById('addlibrarian_email').value;
        const contact_number=document.getElementById('addlibrarian_contact_no').value;
        const dob=document.getElementById('addlibrarian_dob').value;
        const address=document.getElementById('addlibrarian_address').value;
        const joining_year=document.getElementById('addlibrarian_joiningyear').value;
        const gender=document.getElementById('addlibrarian_gender').value;
        const alerter=document.getElementById('addlibrarian_alert');
        alerter.innerHTML=""

        if(gender==="Select Gender"){
            alerter.innerHTML="Select the Gender";
            removeButtonStyle()
            document.getElementById('addlibrarian_gender').focus()
            return
        }
        axios.post('http://localhost:8080/AddLibrarian',{
            register_number:register_number,
            name:name,
            date_of_birth:dob,
            email:email,
            contact_number:contact_number,
            gender:gender,
            joining_year:joining_year,
            address:address
        })
        .then(result=>{
            alert('Created Successfully')
            window.location.reload()
            removeButtonStyle()
        })
        .catch(err=>{
            alerter.innerHTML=err.response.data.Error;
            removeButtonStyle()
        })
    }
    return(
        <div id="adminAddLibrarian_section" className='common_Section'>
            <form id="admin_addLibrarian" onSubmit={submit_AddLibrarianForm}>
                <div>
                    <label htmlFor="addlibrarian_reg_no">Register Number</label>
                    <input type="text" id="addlibrarian_reg_no" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addlibrarian_name">Name</label>
                    <input type="text" id="addlibrarian_name" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addlibrarian_email">Email</label>
                    <input type="email" id="addlibrarian_email" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addlibrarian_joiningyear">Joining Year</label>
                    <input type="number" id="addlibrarian_joiningyear" required></input>
                </div>
                <div>
                    <label htmlFor="addlibrarian_dob">DOB</label>
                    <input type="date" id="addlibrarian_dob" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addlibrarian_gender">Gender</label>
                    <select id="addlibrarian_gender" onChange={removeAlertMessage} defaultValue={'Select Gender'}>
                        <option value="Select Gender" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="addlibrarian_contact_no">Contact Number</label>
                    <input type="number" id="addlibrarian_contact_no" onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addlibrarian_address">Address</label>
                    <textarea id="addlibrarian_address" onChange={removeAlertMessage}></textarea>
                </div>
                <div className="addlibrarian_alert_button">
                    <button type="submit" id="submit_addlibrarian" className='common_submitButton'>Add Librarian</button>
                    <div id='addlibrarian_alert' className='alert_msg'></div>
                </div>
            </form>
        </div>
    )
}