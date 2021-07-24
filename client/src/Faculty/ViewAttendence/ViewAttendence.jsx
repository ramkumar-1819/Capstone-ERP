import React, { Component,useEffect,useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import ReactLoading from 'react-loading';
import axios from 'axios';
import ShowAttendence from './ShowAttendence';

export default function ViewAttendence(){
    //semester - hold the sem values based on year.
    //facultyId - loged in faculty ID.
    //attendenceInfo -  hold all attendence of student based on search.
    //facultyDepartment - hold the dept of student.
    //facultySection - hold the student Seaction.
    //facutCode - hold the subject code.
    const facultyId=useSelector(state=>state.user.data._id);
    const[facultyDepartment,setFacultyDepartment]=useState('loading')
    const[facultySection,setFacultySection]=useState([])
    const[semester,setSemester]=useState([])
    const[facultyCode,setFacultyCode]=useState([])
    const[attendenceInfo,setAttendenceInfo]=useState(['loading'])
    //useEffect - Fetch the dept .
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
        Faculty_Navlinks[3].style.color='gray';
    },[])
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    //Get Sections based on department,year,sem.
    const getSections_Subjects=(e)=>{
        console.log(e.target.value)
        const studentYear=document.getElementById('year').value;
        axios.get(`http://localhost:8080/getSections/${facultyDepartment.department}/${studentYear}/${e.target.value}`)
            .then(section=>{
                setFacultySection(section.data)
                document.getElementById('sections').value='Select Section';
                document.getElementById('subjectCode').value='Select SubjectCode'
            })
            .catch(err=>{
                alert(err.response.data)
            })
        //get Subjects based on year,dept,sem.
        axios.post(`http://localhost:8080/getSubjects`,{
            subjectDepartment:facultyDepartment.department,
            subjectYear:studentYear,
            subjectSemester:e.target.value
        })
        .then(subjects=>{
            setFacultyCode(subjects.data)
        })
        .catch(err=>alert(err.response.data))
    }
    //get all student attendence based on search.
    const getStudentsList=(e)=>{
        e.preventDefault();
        const alerter=document.getElementById('attendenceAlert');
        alerter.innerHTML=""
        const department=document.getElementById('department');
        const year=document.getElementById('year');
        const semester=document.getElementById('facultySelectSemester');
        const section=document.getElementById('sections');
        const code=document.getElementById('subjectCode');
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
        if(code.value==='Select SubjectCode'){
            alerter.innerHTML='Select SubjectCode';
            code.focus()
            return
        }
        axios.post('http://localhost:8080/getAttendence',{
            year:year.value,
            section:section.value,
            subjectCode:code.value
        })
        .then(attendence=>{
            console.log(attendence.data)
            setAttendenceInfo(attendence.data)
        })
        .catch(err=>{
            console.log(err)
            //alert(err.response.data)
        })
    }
    const getSemester=(e)=>{
        const sem=Number(e.target.value)+(Number(e.target.value)-1);
        document.getElementById('facultySelectSemester').value='Select Semester';
        document.getElementById('sections').value='Select Section';
        document.getElementById('subjectCode').value='Select SubjectCode'
        setSemester([sem,sem+1])
    }
    return(
        <div id='viewAttendence_section' className='common_attendenceSection'>
            {facultyDepartment==='loading' &&
                <div className="facultyAttendenceLoading">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }  
            {facultyDepartment!=='loading' &&
                <form id='viewAttendenceForm' className='common_attendenceForm' onSubmit={getStudentsList}>
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
                    <select id="facultySelectSemester" defaultValue={'Select Semester'} onChange={getSections_Subjects}>
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
                        <label htmlFor="subjectCode">Select SubjectCode</label>
                        <select id='subjectCode' defaultValue='Select SubjectCode'>
                            <option value="Select SubjectCode" disabled>Select SubjectCode</option>
                            {facultyCode.map((codes,index)=><option key={index} value={codes.subjectCode}>{codes.subjectCode}</option>)}
                        </select>
                    </div>
                    <div>
                        <div className='alert_msg' id='attendenceAlert'></div>
                        <button type='submit' className='common_submitButton'>SEARCH</button>
                    </div>
                </form>
            }
            <ShowAttendence attendence={attendenceInfo}/>
        </div>
    )
}
