import React, { Component,useEffect,useState } from 'react';
import './ViewMarks.css';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';

export default function ViewMarks(){
    //semester - hold sem values based on year.
    //marks - hold the marks of student based on sem selected.
    //student - hold the student ID.
    const studentId=useSelector(state=>state.user.data._id);
    const[marks,setMarks]=useState(['loading'])
    const[student,setStudent]=useState('')
    const[semester,setSemester]=useState('')
    //useEffect - to get the student ID,sem,marks.
    useEffect(()=>{
        axios.get(`http://localhost:8080/StudentProfile/${studentId}`)
        .then(res=>{
            console.log(res)
            setSemester(res.data.semester)
            setStudent(res.data._id)
            axios.post('http://localhost:8080/ViewMarks',{
            student:res.data._id,
            currentSemester:res.data.semester,
            testName:document.getElementById('testName').value
            })
            .then(result=>{
                console.log(result.data)
                setMarks(result.data)
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
        Faculty_Navlinks[3].style.color='gray';
    },[])
    //allSemester - contain sem 1 to current Sem of student.
    const allSemester=[];
    for(let sem=1;sem<Number(semester)+1;sem++){
        allSemester.push(sem)
    }
    const getnewMarks=()=>{
        axios.post('http://localhost:8080/ViewMarks',{
            student:student,
            currentSemester:document.getElementById('studentSelectSemester').value,
            testName:document.getElementById('testName').value
            })
            .then(result=>{
                console.log(result.data)
                setMarks(result.data)
            })
            .catch(err=>alert(err.response.data))
    }
    return(
        <div id='StudentsViewMarksAttendence_Section'>
            {semester!=="" &&
            <div>
                <label htmlFor="studentSelectSemester">Semester : </label>
                <select id='studentSelectSemester' defaultValue={Number(semester)} onChange={getnewMarks}>
                   {allSemester.map((sem,index)=>{
                       return(
                           <option value={sem} key={index}>{sem}</option>
                       )
                   })}
                </select>
                <label htmlFor="testName">Select Test : </label>
                <select id="testName" defaultValue='CycleTest1' onChange={getnewMarks}>
                    <option value="CycleTest1">Cycle Test 1</option>
                    <option value="CycleTest2">Cycle Test 2</option>
                    <option value='CycleTest3'>Cycle Test 3</option>
                    <option value='ModelExam1'>Model Exam 1</option>
                    <option value='ModelExam2'>Model Exam 2</option>
                    <option value='Semester'>Semester</option>
                </select>
            </div>
            }
            {(marks.length>0 && marks[0]!=='loading')&&
                <div id='marksList'>
                    <table>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Subject Code</th>
                                <th>Subject Name</th>
                                <th>Marks Obtained</th>
                                <th>Total Marks</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marks.map((data,index)=>{
                                if(data.marksObtained==='AB'){
                                    return(
                                        <tr key={index}>
                                            <td>{index+1} .</td>
                                            <td>{data.subjectCode}</td>
                                            <td>{data.subjectName}</td>
                                            <td>{data.marksObtained}</td>
                                            <td>{data.totalMark}</td>
                                            <td>0.00 %</td>
                                        </tr>
                                    )
                                }
                                else{
                                    return(
                                    <tr key={index}>
                                        <td>{index+1} .</td>
                                        <td>{data.subjectCode}</td>
                                        <td>{data.subjectName}</td>
                                        <td>{data.marksObtained}</td>
                                        <td>{data.totalMark}</td>
                                        <td>{(data.marksObtained/data.totalMark*100).toFixed(2)}%</td>
                                    </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            }
            {marks.length===0 &&
                <div className='empty'>Empty</div>
            }
        </div>
    )
}