import React, { Component,useEffect,useState } from 'react';
import './MarkAttendence.css';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import ReactLoading from 'react-loading';
import ShowStudents from './ShowStudents';


export default function MarkAttendence(props){
    //semester - hold the sem values based on year.
    //facultyId - loged in faculty ID.
    //studentInfoList -  hold all students info based on search.
    //facultyDepartment - hold the dept of student.
    //facultySection - hold the student Seaction.
    const facultyId=useSelector(state=>state.user.data._id);
    const[semester,setSemester]=useState([])
    const[facultyDepartment,setFacultyDepartment]=useState('loading')
    const[facultySection,setFacultySection]=useState([])
    const[studentInfoList,setStudentInfoList]=useState([])
    
    //useEffect - to get department.
    useEffect(()=>{
        axios.get(`http://localhost:8080/FacultyProfile/${facultyId}`)
        .then(department=>{
            setFacultyDepartment({department:department.data.department})
        })
        .catch(err=>{
            alert(err.response.data);
        })
    },[])
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Faculty_Navlinks=document.getElementById('Faculty_navbar').children;
        for(const links of Faculty_Navlinks){
            links.style.color='white';
        }
        Faculty_Navlinks[2].style.color='gray';
    },[])
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    const getSections=(e)=>{
        axios.get(`http://localhost:8080/getSections/${facultyDepartment.department}/${document.getElementById('year').value}/${e.target.value}`)
            .then(section=>{
                setFacultySection(section.data)
                document.getElementById('sections').value='Select Section';
            })
            .catch(err=>{
                alert(err.response.data)
            })
    }
    //getStudentsList() - used to get all the student based on search.
    const getStudentsList=(e)=>{
        e.preventDefault();
        const alerter=document.getElementById('attendenceAlert');
        alerter.innerHTML=""
        const department=document.getElementById('department');
        const year=document.getElementById('year')
        const semester=document.getElementById('facultySelectSemester');
        const section=document.getElementById('sections')
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
        if(section.value==='Select Section'){
            alerter.innerHTML='Select Section';
            section.focus()
            return
        }
        axios.post('http://localhost:8080/getStudents',{
            department:department.value,
            section:section.value,
            semester:semester.value,
            year:year.value
        })
        .then(students=>{
            setStudentInfoList({students:students.data,year:year.value,department:department.value,semester:semester.value,section:section.value})
        })
        .catch(err=>alert(err.response.data))
    }
    const callBack=()=>{
        document.getElementById('department').value='Select Department';
        document.getElementById('year').value='Select Year';
        document.getElementById('sections').value='Select Section';
        document.getElementById('facultySelectSemester').value='Select Semester'
        setFacultySection([]);
        setSemester([])
        setStudentInfoList([])
    }
    const getSemester=(e)=>{
        const sem=Number(e.target.value)+(Number(e.target.value)-1);
        document.getElementById('facultySelectSemester').value='Select Semester';
        document.getElementById('sections').value='Select Section';
        setSemester([sem,sem+1])

    }
    return(
        <div id='markAttendence_section' className='common_attendenceSection'>
            {facultyDepartment==='loading' &&
                <div className="facultyAttendenceLoading">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }  
            {facultyDepartment!=='loading' &&
                <form id='markAttendenceForm' className='common_attendenceForm' onSubmit={getStudentsList}>
                    <div>
                        <label htmlFor="department">Select Department</label>
                        <select id="department" defaultValue='Select Department'>
                            <option value="Select Department" disabled>Select Department</option>
                            <option value={facultyDepartment.department}>{facultyDepartment.department}</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="year">Select Year</label>
                        <select id='year' defaultValue='Select Year' onChange={getSemester}>
                            <option value="Select Year" disabled>Select Year</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div>
                    <label htmlFor="facultySelectSemester">Select Semester</label>
                    <select id="facultySelectSemester" defaultValue={'Select Semester'} onChange={getSections}>
                        <option value="Select Semester" disabled>Select Semester</option>
                        {semester.map((sem,index)=><option key={index} value={sem}>{sem}</option>)}
                    </select>
                    </div>
                    <div>
                        <label htmlFor="sections">Select Section</label>
                        <select id="sections" defaultValue='Select Section'>
                            <option value="Select Section" disabled>Select Section</option>
                            {facultySection.map((section,index)=><option key={index} value={section}>{section}</option>)}
                        </select>
                    </div>
                    <div>
                        <div className='alert_msg' id='attendenceAlert'></div>
                        <button type='submit' className='common_submitButton'>SEARCH</button>
                    </div>
                </form>
            }
           <ShowStudents info={studentInfoList} callBack={callBack}/>
        </div>
    )
}