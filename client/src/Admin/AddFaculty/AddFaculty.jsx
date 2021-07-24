import React, { Component,useEffect } from 'react';
import './AddFaculty.css';
import axios from 'axios';

export default function AddFaculty(props){
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Admin_Navlinks=document.getElementById('Admin_navbar').children;
        for(const links of Admin_Navlinks){
            links.style.color='white';
        }
        Admin_Navlinks[4].style.color='gray';
    },[])
    //Styling the Submit buttons whenver submit and after getting datas from backend.
    const applyButtonStyle=()=>{
        document.getElementById('submit_addfaculty').innerHTML="ADDING...";
        document.getElementById('submit_addfaculty').style.opacity='0.5';
    }
    const removeButtonStyle=()=>{
        document.getElementById('submit_addfaculty').innerHTML="Add Faculty";
        document.getElementById('submit_addfaculty').style.opacity='1';
    }
    //Remove the error message shown whenever input is changed.
    const removeAlertMessage=()=>{
        document.getElementById('addfaculty_alert').innerHTML="";
    }
    //When Submitting the ADD FACULTY then Client Side validation done and submit it to backend.
    const submit_AddFacultyForm=(e)=>{
        e.preventDefault();
        applyButtonStyle()
        const register_number=document.getElementById('addfaculty_reg_no').value;
        const name=document.getElementById('addfaculty_name').value;
        const email=document.getElementById('addfaculty_email').value;
        const contact_number=document.getElementById('addfaculty_contact_no').value;
        const designation=document.getElementById('addfaculty_designation').value;
        const dob=document.getElementById('addfaculty_dob').value;
        const address=document.getElementById('addfaculty_address').value;
        const department=document.getElementById('addfaculty_dept').value;
        const joining_year=document.getElementById('addfaculty_joiningyear').value;
        const gender=document.getElementById('addfaculty_gender').value;
        const alerter=document.getElementById('addfaculty_alert');
        alerter.innerHTML=""
        if(department==='Select Department'){
            alerter.innerHTML="Select the Department";
            removeButtonStyle()
            document.getElementById('addfaculty_dept').focus()
            return
        }
        if(gender==="Select Gender"){
            alerter.innerHTML="Select the Gender";
            removeButtonStyle()
            document.getElementById('addfaculty_gender').focus()
            return
        }
        axios.post('http://localhost:8080/AddFaculty',{
            register_number:register_number,
            name:name,
            date_of_birth:dob,
            email:email,
            contact_number:contact_number,
            gender:gender,
            department:department,
            designation:designation,
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
        <div id="adminAddFaculty_section" className='common_Section'>
            <form id="admin_addFaculty" onSubmit={submit_AddFacultyForm}>
                <div>
                    <label htmlFor="addfaculty_reg_no">Register Number</label>
                    <input type="text" id="addfaculty_reg_no" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addfaculty_name">Name</label>
                    <input type="text" id="addfaculty_name" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addfaculty_email">Email</label>
                    <input type="email" id="addfaculty_email" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addfaculty_dept">Department</label>
                    <select id="addfaculty_dept" onChange={removeAlertMessage} defaultValue={'Select Department'}>
                        <option value="Select Department" disabled>Select Department</option>
                        <option value="BioTech">BioTech</option>
                        <option value="Civil">Civil</option>
                        <option value="C.S.E">C.S.E</option>
                        <option value="E.C.E">E.C.E</option>
                        <option value="E.E.E">E.E.E</option>
                        <option value="IT">IT</option>
                        <option value="Mech">Mech</option>
                        <option value="M.B.A">M.B.A</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="addfaculty_joiningyear">Joining Year</label>
                    <input type="number" id="addfaculty_joiningyear" required></input>
                </div>
                <div>
                    <label htmlFor="addfaculty_designation">Designation</label>
                    <input type="text" id="addfaculty_designation" onChange={removeAlertMessage} required></input>
                </div>
                <div>
                    <label htmlFor="addfaculty_dob">DOB</label>
                    <input type="date" id="addfaculty_dob" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addfaculty_gender">Gender</label>
                    <select id="addfaculty_gender" onChange={removeAlertMessage} defaultValue={'Select Gender'}>
                        <option value="Select Gender" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="addfaculty_contact_no">Contact Number</label>
                    <input type="number" id="addfaculty_contact_no" onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addfaculty_address">Address</label>
                    <textarea id="addfaculty_address" onChange={removeAlertMessage}></textarea>
                </div>
                <div className="addfaculty_alert_button">
                    <button type="submit" id="submit_addfaculty" className='common_submitButton'>Add Faculty</button>
                    <div id='addfaculty_alert' className='alert_msg'></div>
                </div>
            </form>
        </div>
    )
}