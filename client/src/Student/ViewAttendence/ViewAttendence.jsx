import React, { Component,useEffect,useState } from 'react';
import './ViewAttendence.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ViewAttendence(){
    //semester - hold sem values based on year.
    //studentID - hold all the loggedin student ID.
    //student - list of students.
    //attendence - hold the attendence details based on dept,sem,year.
    const studentId=useSelector(state=>state.user.data._id);
    const[student,setStudent]=useState('')
    const[attendence,setAttendence]=useState(['loading'])
    const[semester,setSemester]=useState('')
    //useEffect - used to get student id,semester,attendece of student.
    useEffect(()=>{
        axios.get(`http://localhost:8080/StudentProfile/${studentId}`)
        .then(res=>{
            setStudent(res.data._id)
            setSemester(res.data.semester)
            axios.post('http://localhost:8080/ViewAttendence',{
            student:res.data._id,
            currentSemester:res.data.semester,
            })
            .then(result=>{
                console.log(result.data)
                setAttendence(result.data)
            })
            .catch(err=>alert(err.response.data))
        })
        .catch(err=>{
            console.log(err)
            alert(err.response.data)
        })
    },[])
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Faculty_Navlinks=document.getElementById('Student_navbar').children;
        for(const links of Faculty_Navlinks){
            links.style.color='white';
        }
        Faculty_Navlinks[4].style.color='gray';
    },[])
    //allSemester - hold sem 1 to currentSemester of student.
    const allSemester=[];
    for(let sem=1;sem<Number(semester)+1;sem++){
        allSemester.push(sem)
    }
    //getnewAttendence() - get the attendence of student based on sem selected.
    const getnewAttendence=(e)=>{
        axios.post('http://localhost:8080/ViewAttendence',{
            student:student,
            currentSemester:e.target.value,
            })
            .then(result=>{
                console.log(result.data)
                setAttendence(result.data)
            })
            .catch(err=>alert(err.response.data))
    }
    return(
        <div id='StudentsViewMarksAttendence_Section'>
            {semester!=="" &&
            <div>
                <label htmlFor="studentSelectSemester">Semester : </label>
                <select id='studentSelectSemester' defaultValue={Number(semester)} onChange={getnewAttendence}>
                   {allSemester.map((sem,index)=>{
                       return(
                           <option value={sem}>{sem}</option>
                       )
                   })}
                </select>
            </div>
            }
            {(attendence.length>0 && attendence[0]!=='loading')&&
                <div id='attendenceList'>
                    <table>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Subject Code</th>
                                <th>Subject Name</th>
                                <th>Attended Lectures</th>
                                <th>Total Lectures Done</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendence.map((data,index)=>{
                                return(
                                <tr key={index}>
                                    <td>{index+1} .</td>
                                    <td>{data.subjectCode}</td>
                                    <td>{data.subjectName}</td>
                                    <td>{data.attendedLectures}</td>
                                    <td>{data.totalLecturesDone}</td>
                                    <td>{(data.attendedLectures/data.totalLecturesDone*100).toFixed(2)}%</td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }
            {attendence.length===0 &&
                <div className='empty'>Empty</div>
            }
        </div>
    )
}