import React, { Component,useEffect,useState } from 'react';
import './ViewResult.css'
import {useSelector,useDispatch} from 'react-redux';
import ReactLoading from 'react-loading';
import axios from 'axios';
import Results from './Results';

export default function ViewResult(){
    //semester - hold the sem values based on year.
    //facultyId - loged in faculty ID.
    //resultInfo -  hold all results of student based on search.
    //facultyDepartment - hold the dept of student.
    //facultySection - hold the student Seaction.
    //facutCode - hold the subject code.
    const facultyId=useSelector(state=>state.user.data._id);
    const[semester,setSemester]=useState([])
    const[facultyDepartment,setFacultyDepartment]=useState('loading')
    const[facultySection,setFacultySection]=useState([])
    const[facultyCode,setFacultyCode]=useState([])
    const[resultInfo,setResultInfo]=useState(['loading'])
    //useEffect to get department.
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
        Faculty_Navlinks[5].style.color='gray';
    },[])
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    //Once dept,year,sem are filled we need to get the sections.
    const getSections=(e)=>{
        console.log(e.target.value)
        axios.get(`http://localhost:8080/getSections/${facultyDepartment.department}/${document.getElementById('year').value}/${e.target.value}`)
            .then(section=>{
                setFacultySection(section.data)
                document.getElementById('sections').value='Select Section';
            })
            .catch(err=>{
                alert(err.response.data)
            })
        //Once we got section the we need to show the subjects.
        axios.post(`http://localhost:8080/getSubjects`,{
            subjectDepartment:facultyDepartment.department,
            subjectYear:document.getElementById('year').value,
            subjectSemester:e.target.value
        })
        .then(subjects=>{
            console.log(subjects.data)
            setFacultyCode(subjects.data)
        })
        .catch(err=>alert(err.response.data))
    }
    //Once Submit the form to search , then search made and show the desired result.
    const getStudentsResult=(e)=>{
        e.preventDefault();
        const alerter=document.getElementById('resultAlert');
        alerter.innerHTML=""
        const department=document.getElementById('department');
        const year=document.getElementById('year');
        const semester=document.getElementById('facultySelectSemester');
        const section=document.getElementById('sections');
        const code=document.getElementById('subjectCode');
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
        if(testName.value==='Select Test'){
            alerter.innerHTML='Select Test';
            testName.focus()
            return
        }
        axios.post('http://localhost:8080/getResult',{
            department:department.value,
            year:year.value,
            semester:semester.value,
            section:section.value,
            subjectCode:facultyCode[code.value].subjectCode,
            testName:testName.value
        })
        .then(result=>{
            console.log(result.data)
            setResultInfo(result.data)
        })
        .catch(err=>alert(err.response.data))
    }
    const callBack=()=>{
        document.getElementById('department').value='Select Department';
        document.getElementById('year').value='Select Year';
        document.getElementById('facultySelectSemester').value='Select Semester';
        document.getElementById('sections').value='Select Section';
        document.getElementById('subjectCode').value='Select SubjectCode';
        document.getElementById('testName').value='Select Test';
        setResultInfo(['loading'])
    }
    const getSemester=(e)=>{
        const sem=Number(e.target.value)+(Number(e.target.value)-1);
        document.getElementById('facultySelectSemester').value='Select Semester';
        document.getElementById('sections').value='Select Section';
        setSemester([sem,sem+1])
    }
    return(
        <div id='viewresult_section' className='common_attendenceSection'>
            {facultyDepartment==='loading' &&
                <div className="facultyAttendenceLoading">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }  
            {facultyDepartment!=='loading' &&
                <form id='viewResultForm' className='common_attendenceForm' onSubmit={getStudentsResult}>
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
                        <label htmlFor="subjectCode">Select SubjectCode</label>
                        <select id='subjectCode'>
                            <option value="Select SubjectCode">Select SubjectCode</option>
                            {facultyCode.map((codes,index)=><option key={index} value={index}>{codes.subjectCode}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="testName">Select Test</label>
                        <select id="testName" defaultValue='Select Test'>
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
                        <div className='alert_msg' id='resultAlert'></div>
                        <button type='submit' className='common_submitButton'>SEARCH</button>
                    </div>
                </form>  
            }
            <Results result={resultInfo} callBack={callBack}/>
        </div>
    )
}
