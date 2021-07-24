import React, { Component,useEffect,useState } from 'react';
import './TimeTable.css';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';

export default function TimeTable(){
    //semester - hold the sem values based on year.
    //facultyId - loged in faculty ID.
    //facultyDepartment - hold the dept of student.
    //timetablefile - hold the timetable file ie(image / pdf / docs)
    const[semester,setSemester]=useState([])
    const facultyId=useSelector(state=>state.user.data._id);
    const[timetableFile,setTimeTableFile]=useState([])
    const[facultyDepartment,setFacultyDepartment]=useState('loading')
    //UseEffect - to change navigation bar color and set department.
    useEffect(()=>{
        const Faculty_Navlinks=document.getElementById('Faculty_navbar').children;
        for(const links of Faculty_Navlinks){
            links.style.color='white';
        }
        Faculty_Navlinks[6].style.color='gray';
        axios.get(`http://localhost:8080/FacultyProfile/${facultyId}`)
        .then(department=>{
            setFacultyDepartment({department:department.data.department})
        })
        .catch(err=>{
            alert(err.response.data);
        })
    },[])
    //uploadTimeTable() - used to upload a timetable in Server.
    const uploadTimeTable=(e)=>{
        e.preventDefault()
        const alerter=document.getElementById('timetableAlert');
        alerter.innerHTML=""
        const department=document.getElementById('department');
        const year=document.getElementById('year');
        const semester=document.getElementById('facultySelectSemester');
        const testName=document.getElementById('testName');
        if(department.value==='Select Department'){
            alerter.innerHTML='Select Department';
            department.focus()
            return
        }
        if(year.value==='Select Year'){
            alerter.innerHTML='Select Year';
            year.focus()
            return
        }
        if(semester.value==='Select Semester'){
            alerter.innerHTML='Select Semester';
            semester.focus()
            return
        }
        if(testName.value==='Select Test'){
            alerter.innerHTML='Select Test';
            testName.focus()
            return
        }
        const formData = new FormData();
        formData.append('department',department.value);
        formData.append('year', year.value);
        formData.append('semester',semester.value);
        formData.append('testName', testName.value);
        formData.append('timetable', timetableFile);
        axios.post('http://localhost:8080/addTimeTable',formData)
        .then(ok=>{
            alert(ok.data)
            department.value='Select Department';
            year.value='Select Year';
            semester.value='Select Semester';
            testName.value='Select Test';
            document.getElementById('newTimeTable').value="";
        })
        .catch(err=>alert(err.response.data))
    }
    //getTimeTable() - hold the timetable file.
    const getTimeTable=(e)=>{
        setTimeTableFile(e.target.files[0])
    }
    //getSemester() - hold the semester based on year.
    const getSemester=(e)=>{
        const sem=Number(e.target.value)+(Number(e.target.value)-1);
        document.getElementById('facultySelectSemester').value='Select Semester';
        setSemester([sem,sem+1])
    }
    return(
        <div id='AddTimeTable_Section'>
            <form id='addTimeTable_Form' onSubmit={uploadTimeTable} encType='multipart/form-data'>
                <div>Upload TimeTable</div>
                <div>
                    <label htmlFor="newTimeTable">Select TimeTable</label>
                    <input type='file' id='newTimeTable' required onChange={getTimeTable}></input>
                </div>
                <div>
                    <label htmlFor="department">Select Department</label>
                    <select id="department" defaultValue='Select Department' required>
                        <option value="Select Department" disabled>Select Department</option>
                        <option value={facultyDepartment.department}>{facultyDepartment.department}</option>
                    </select>
                    </div>
                    <div>
                        <label htmlFor="year">Select Year</label>
                        <select id='year' defaultValue='Select Year' required onChange={getSemester}>
                            <option value="Select Year" disabled>Select Year</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="facultySelectSemester">Select Semester</label>
                        <select id="facultySelectSemester" defaultValue={'Select Semester'}>
                            <option value="Select Semester" disabled>Select Semester</option>
                            {semester.map((sem,index)=><option key={index} value={sem}>{sem}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="testName">Select Test</label>
                        <select id="testName" defaultValue='Select Test' required>
                            <option value="Select Test" disabled>Select Test</option>
                            <option value="CycleTest1">Cycle Test 1</option>
                            <option value="CycleTest2">Cycle Test 2</option>
                            <option value='CycleTest3'>Cycle Test 3</option>
                            <option value='ModelExam1'>Model Exam 1</option>
                            <option value='ModelExam2'>Model Exam 2</option>
                            <option value='Semester'>Semester</option>
                        </select>
                    </div>
                    <div>
                        <div className='alert_msg' id='timetableAlert'></div>
                        <button type='submit' className='common_submitButton'>UPLOAD</button>
                    </div>
            </form>
        </div>
    )
}