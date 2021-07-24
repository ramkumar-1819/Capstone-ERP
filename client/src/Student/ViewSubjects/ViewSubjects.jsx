import React, { Component,useEffect,useState } from 'react';
import './ViewSubjects.css';
import axios from 'axios';
import {useSelector} from 'react-redux';

export default function ViewSubjects(){
    //semester - hold sem values based on year.
    ///department - hold student Department.
    //subjects - get the subjects based on sem.
    //studentID - hold the student reg.no.
    const studentId=useSelector(state=>state.user.data._id);
    const[semester,setSemester]=useState('')
    const[department,setDepartment]=useState()
    const[subjects,setSubjects]=useState(['loading'])
    //useEffect - to fetch the student subjects based on his current sem.
    useEffect(()=>{
        axios.get(`http://localhost:8080/StudentProfile/${studentId}`)
        .then(res=>{
            setSemester(res.data.semester)
            setDepartment(res.data.department)
            axios.post('http://localhost:8080/getSubjects',{
                subjectDepartment:res.data.department,
                subjectSemester:res.data.semester
            })
            .then(result=>setSubjects(result.data))
            .catch(err=>console.log(err))
        })
        const Faculty_Navlinks=document.getElementById('Student_navbar').children;
        for(const links of Faculty_Navlinks){
            links.style.color='white';
        }
        Faculty_Navlinks[6].style.color='gray';
    },[])
    //searchSubjects - when student want to search for subjects for any sem.
    const searchSubjects=(e)=>{
        setSemester(e.target.value)
        axios.post('http://localhost:8080/getSubjects',{
            subjectDepartment:department,
            subjectSemester:e.target.value
        })
        .then(result=>setSubjects(result.data))
        .catch(err=>console.log(err))
    }
    const allSemester=[1,2,3,4,5,6,7,8]
    return(
        <>
        {semester!=='' &&
        <div id='Student_ViewSubjects'>
            <div>
                Semester 
                : <select id='allSemesters' onChange={searchSubjects} defaultValue={semester}>
                    {allSemester.map((sem,index)=><option key={index} value={sem}>{sem}</option>)}
                </select>
            </div>
            {(subjects.length>0 && subjects[0]!=='loading')&&
                <div id='allSubjects'>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Subject Code</th>
                                <th>Subject Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {subjects.map((subject,index)=>{
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{subject.subjectCode}</td>
                                <td>{subject.subjectName}</td>
                            </tr>
                        )
                        })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
        }
        {subjects.length===0 &&
            <div className='empty'>Empty</div>
        }
    </>
    )
}