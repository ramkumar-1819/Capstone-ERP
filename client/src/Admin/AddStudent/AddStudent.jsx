import React, { Component,useEffect,useState } from 'react';
import './AddStudent.css';
import axios from 'axios';

export default function AddStudent(props){
    const[semester,setSemester]=useState([])
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Admin_Navlinks=document.getElementById('Admin_navbar').children;
        for(const links of Admin_Navlinks){
            links.style.color='white';
        }
        Admin_Navlinks[3].style.color='gray';
    },[])
    //Styling the Submit buttons whenver submit and after getting datas from backend.
    const applyButtonStyle=()=>{
        document.getElementById('submit_addstudent').innerHTML="ADDING...";
        document.getElementById('submit_addstudent').style.opacity='0.5';
    }
    const removeButtonStyle=()=>{
        document.getElementById('submit_addstudent').innerHTML="Add Student";
        document.getElementById('submit_addstudent').style.opacity='1';
    }

    const submit_AddStudentForm=(e)=>{
        e.preventDefault();
        applyButtonStyle()
        const register_number=document.getElementById('addstudent_reg_no').value;
        const name=document.getElementById('addstudent_name').value;
        const email=document.getElementById('addstudent_email').value;
        const contact_number=document.getElementById('addstudent_contact_no').value;
        const section=document.getElementById('addstudent_section').value;
        const dob=document.getElementById('addstudent_dob').value;
        const address=document.getElementById('addstudent_address').value;
        const father_name=document.getElementById('addstudent_fathername').value;
        const department=document.getElementById('addstudent_dept').value;
        const year=document.getElementById('addstudent_year').value;
        const sem=document.getElementById('SelectSemester').value;
        const gender=document.getElementById('addstudent_gender').value;
        const alerter=document.getElementById('addstudent_alert');
        alerter.innerHTML=""
        if(department==='Select Department'){
            alerter.innerHTML="Select the Department";
            removeButtonStyle()
            document.getElementById('addstudent_dept').focus()
            return
        }
        if(year==="Select Year"){
            alerter.innerHTML="Select the Year";
            removeButtonStyle()
            document.getElementById('addstudent_year').focus()
            return
        }
        if(sem==='Select Semester'){
            alerter.innerHTML='Select Semester';
            removeButtonStyle()
            document.getElementById('SelectSemester').focus()
            return
        }
        if(gender==="Select Gender"){
            alerter.innerHTML="Select the Gender";
            removeButtonStyle()
            document.getElementById('addstudent_gender').focus()
            return
        }
        //When Submitting the ADD STUDENT then Client Side validation done and submit it to backend.
        axios.post('http://localhost:8080/AddStudent',{
            register_number:register_number,
            name:name,
            date_of_birth:dob,
            email:email,
            contact_number:contact_number,
            gender:gender,
            department:department,
            year:year,
            semester:sem,
            section:section,
            address:address,
            fathername:father_name
        })
        .then(result=>{
            alert('Created Successfully')
            window.location.reload()
            removeButtonStyle()
        })
        .catch(err=>{
            alerter.innerHTML=err.response.data;
            removeButtonStyle()
        })
    }
    //Remove the error message shown whenever input is changed.
    const removeAlertMessage=()=>{
        document.getElementById('addstudent_alert').innerHTML="";
    }
    //getSemester() - used to get semesters whenever year field is Changed.
    const getSemester=(value)=>{
        const sem=Number(value)+(Number(value)-1);
        setSemester([sem,sem+1])
    }
    const alert_getSem=(e)=>{
        getSemester(e.target.value)
        removeAlertMessage()
    }
    return(
        <div id="Admin_addStudent_Section" className='common_Section'>
            <form id="admin_addStudent" onSubmit={submit_AddStudentForm}>
                <div>
                    <label htmlFor="addstudent_reg_no">Register Number</label>
                    <input type="text" id="addstudent_reg_no" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addstudent_name">Name</label>
                    <input type="text" id="addstudent_name" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addstudent_email">Email</label>
                    <input type="email" id="addstudent_email" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addstudent_dept">Department</label>
                    <select id="addstudent_dept" onChange={removeAlertMessage}>
                        <option value="Select Department" disabled selected>Select Department</option>
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
                    <label htmlFor="addstudent_year">Year</label>
                    <select id="addstudent_year" onChange={alert_getSem} >
                        <option value="Select Year" disabled selected >Select Year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="SelectSemester">Select Semester</label>
                    <select id="SelectSemester" defaultValue={'Select Semester'} onChange={removeAlertMessage}>
                        <option value="Select Semester" disabled>Select Semester</option>
                        {semester.map((sem,index)=><option value={sem}>{sem}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="addstudent_section">Section</label>
                    <input type="text" id="addstudent_section" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addstudent_dob">DOB</label>
                    <input type="date" id="addstudent_dob" required onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addstudent_gender">Gender</label>
                    <select id="addstudent_gender" onChange={removeAlertMessage}>
                        <option value="Select Gender" disabled selected>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="addstudent_contact_no">Contact Number</label>
                    <input type="number" id="addstudent_contact_no" onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addstudent_fathername">Father Name</label>
                    <input type="text" id="addstudent_fathername" onChange={removeAlertMessage}></input>
                </div>
                <div>
                    <label htmlFor="addstudent_address">Address</label>
                    <textarea id="addstudent_address" onChange={removeAlertMessage}></textarea>
                </div>
                <div className="addstudent_alert_button">
                    <div id='addstudent_alert'  className='alert_msg'></div>
                    <button type="submit" id="submit_addstudent" className='common_submitButton'>Add Student</button>
                </div>
            </form>
        </div>
    )
}