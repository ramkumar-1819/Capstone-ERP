import React, { Component,useEffect,useState } from 'react';
import './ViewTimeTable.css';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';

export default function ViewTimeTable(){
    //semester - hold the sem values based on year.
    //facultyId - loged in faculty ID.
    //timetable -  hold all timetable added based on sem and year.
    //facultyDepartment - hold the dept of faculty.
    const[semester,setSemester]=useState([])
    const facultyId=useSelector(state=>state.user.data._id);
    const[timeTable,setTimeTable]=useState(['loading'])
    const[facultyDepartment,setFacultyDepartment]=useState('loading')    
    //useEffect - Change style in Navigation Bar and set faculty department.
    useEffect(()=>{
        const Faculty_Navlinks=document.getElementById('Faculty_navbar').children;
        for(const links of Faculty_Navlinks){
            links.style.color='white';
        }
        Faculty_Navlinks[7].style.color='gray';
        axios.get(`http://localhost:8080/FacultyProfile/${facultyId}`)
        .then(department=>{
            setFacultyDepartment({department:department.data.department})
        })
        .catch(err=>{
            alert(err.response.data);
        })
    },[])
    //When form is Submited then based on form data timetables are shown.
    const viewTimeTable=(e)=>{
        e.preventDefault()
        const alerter=document.getElementById('viewtimetableAlert');
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
        axios.post('http://localhost:8080/getTimeTable',{
            department:department.value,
            year:year.value,
            semester:semester.value,
            testName:testName.value
        })
        .then(timetable=>{
            console.log(timetable.data)
            setTimeTable(timetable.data)
        })
        .catch(err=>{
            console.log(err)
            alert(err.response.data)
        })
    }
    //Used to get sem values based on year.
    const getSemester=(e)=>{
        const sem=Number(e.target.value)+(Number(e.target.value)-1);
        document.getElementById('facultySelectSemester').value='Select Semester';
        setSemester([sem,sem+1])
    }
    //deleteTimeTable() - used to delete the timetable.
    const deleteTimeTable=(id,index)=>{
        axios.delete(`http://localhost:8080/TimeTable/${id}`)
        .then(result=>{
            alert(result.data)
            document.getElementById('department').value='Select Department';
            document.getElementById('year').value='Select Year';
            document.getElementById('facultySelectSemester').value='Select Semester';
            document.getElementById('testName').value='Select Test';
            setTimeTable(['loading'])
        })
        .catch(err=>alert(err.response.data))
    }
    return(
        <div id='ViewTimeTable_Section'>
            <form id='viewTimeTable_Form' onSubmit={viewTimeTable} >
                <div>View TimeTable</div>
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
                        <div className='alert_msg' id='viewtimetableAlert'></div>
                        <button type='submit' className='common_submitButton'>VIEW</button>
                    </div>
            </form>
            <div id='view'>
                {(timeTable.length>0 && timeTable[0]!=='loading') &&
                    <>
                    <h1>TimeTables</h1>
                    {timeTable.map((data,index)=>{
                        return(
                            <div id='timeTables' key={index}>
                                <div>{index+1} .</div>
                                <div>{data.testName}</div>
                                <a href={`http://localhost:8080/${data.timetable}`} target='blank'>Click here to view</a>
                                <button type='button' className='common_submitButton' onClick={()=>deleteTimeTable(data._id,index)}>DELETE</button>
                            </div>
                        )
                    })}
                    </>
                }
                {timeTable.length===0 &&
                    <div id='emptyTimeTable'>Empty</div>
                }
            </div>
        </div>
    )
}