import axios from 'axios';
import React, { Component,useState } from 'react';

export default function AddSubjects(){
    //semester - hold sem values based on year.
    const[semester,setSemester]=useState([])
    //Apply button styles to SUBMIT button.
    const applyButtonStyle=()=>{
        document.getElementById('addSubjectButton').innerHTML="ADDING...";
        document.getElementById('addSubjectButton').style.opacity='0.5';
    }
    const removeButtonStyle=()=>{
        document.getElementById('addSubjectButton').innerHTML="Add Subject";
        document.getElementById('addSubjectButton').style.opacity='1';
    }
    //submit_addSubject() - used to add a subjects for a sem.
    const submit_addSubject=(e)=>{
        e.preventDefault()
        applyButtonStyle()
        const subjectName=document.getElementById('subjectName');
        const subjectCode=document.getElementById('subjectCode');
        const subjectDepartment=document.getElementById('subjectDepartment');
        const subjectYear=document.getElementById('subjectSelectYear');
        const subjectSemester=document.getElementById('subjectSelectSemester');
        const alerter=document.getElementById('subject_alert');
        alerter.innerHTML=""
        if(subjectDepartment.value==='Select Department'){
            alerter.innerHTML="Select Department"
            subjectDepartment.focus()
            removeButtonStyle()
            return
        }
        if(subjectYear.value==='Select Year'){
            alerter.innerHTML="Select Year"
            subjectYear.focus()
            removeButtonStyle()
            return
        }
        if(subjectSemester.value==='Select Semester'){
            alerter.innerHTML='Select Semester';
            subjectSemester.focus()
            removeButtonStyle()
            return
        }
        axios.post('http://localhost:8080/addSubject',{
            subjectName:subjectName.value,
            subjectCode:subjectCode.value,
            subjectDepartment:subjectDepartment.value,
            subjectYear:Number(subjectYear.value),
            subjectSemester:Number(subjectSemester.value)
        })
        .then(result=>{
            alert("Added Successfully")
            removeButtonStyle()
            subjectName.value='';
            subjectCode.value='';
            subjectDepartment.value='Select Department';
            subjectYear.value='Select Year';
            subjectSemester.value='Select Semester'
        })
        .catch(err=>{
            alerter.innerHTML=err.response.data
            removeButtonStyle()
        })
    }
    const getSemester=(e)=>{
        const sem=Number(e.target.value)+(Number(e.target.value)-1);
        setSemester([sem,sem+1])
    }
    return(
    <form id='addSubjects_Section' onSubmit={submit_addSubject}>
        <div>
            <label htmlFor="subjectName">Subject Name</label>
            <input type="text" id='subjectName' required />
        </div>
        <div>
            <label htmlFor="subjectCode">Subject Code</label>
            <input type="text" id='subjectCode' required />
        </div>
        <div>
        <label htmlFor="subjectDepartment">Department</label>
        <select id="subjectDepartment" defaultValue={'Select Department'} >
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
            <label htmlFor="subjectSelectYear">Select Year</label>
            <select id="subjectSelectYear" defaultValue={'Select Year'} onChange={getSemester}>
                <option value="Select Year" disabled>Select Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
        </select>
        </div>
        <div>
            <label htmlFor="subjectSelectSemester">Select Semester</label>
            <select id="subjectSelectSemester" defaultValue={'Select Semester'}>
                <option value="Select Semester" disabled>Select Semester</option>
                {semester.map((sem,index)=><option value={sem}>{sem}</option>)}
            </select>
        </div>
        <div id='subject_alert' className='alert_msg'></div>
        <button type='submit' id='addSubjectButton'className='common_submitButton'>Add Subject</button>
    </form>)
}