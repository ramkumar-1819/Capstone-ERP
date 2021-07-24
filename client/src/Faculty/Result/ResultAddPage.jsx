import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';

export default function ResultAddPage(props){
    //subjects - hold all subjects based on search.
    const[subjects,setSubjects]=useState([])
    //useEffect - to get subjects based on search.
    useEffect(()=>{
        if(props.info.type==='fetched'){
            axios.post(`http://localhost:8080/getSubjects`,{
                subjectDepartment:props.info.department,
                subjectYear:props.info.year,
                subjectSemester:props.info.semester
            })
            .then(subjects=>{
                document.getElementById('subjectCode').value='Select Subject'
                setSubjects(subjects.data)
            })
            .catch(err=>alert(err.response.data))
            const marks=document.getElementsByClassName('studentsMarks');
            for(let mark of marks){
                mark.value=""
            }
            document.getElementById('subjectCode').value='Select Subject';
            document.getElementById('testType').value='Select Test';
            document.getElementById('totalMarks').value="";
        }
    },[props.info])
    //when marks are submitted then it will get updated in DB.
    const submitMarks=()=>{
        const code=document.getElementById('subjectCode');
        const test=document.getElementById('testType');
        const total=document.getElementById('totalMarks');
        const marks=document.getElementsByClassName('studentsMarks');
        const alerter=document.getElementById('marksAlertmsg');
        alerter.innerHTML=""
        if(code.value==='Select Subject'){
            alerter.innerHTML='Select Subject';
            code.focus()
            return
        }
        if(test.value==='Select Test'){
            alerter.innerHTML='Select Test';
            test.focus()
            return
        }
        if(total.value===""){
            alerter.innerHTML="Enter the Total Marks";
            total.focus()
            return
        }
        if(total.value<=0){
            alerter.innerHTML="Mark should be greater than Zero";
            total.focus()
            return
        }
        for(let mark of marks){
            if(Number(mark.value)>Number(total.value)){
                alerter.innerHTML="Mark is Greater than total Mark"
                mark.focus()
                return
            }
        }
        const studentMarks={}
        for(let index=0;index<marks.length;index++){
            studentMarks[String(props.info.students[index]._id)]=marks[index].value
        }
        axios.post('http://localhost:8080/addResult',{
            subjectCode:subjects[code.value].subjectCode,
            subjectName:subjects[code.value].subjectName,
            totalMark:total.value,
            testName:test.value,
            semester:props.info.semester,
            studentMarks:studentMarks
        })
        .then(result=>{
            alert(result.data);
            props.callBack()
        })
        .catch(err=>{
            console.log(err)
            alert(err.response.data)
        })
    }
    return(
        <div id='showAddResultForm'>
        {props.info.type==='fetched' &&
        <>
        <form>
            <div>
                <label htmlFor="subjectCode">Select Subject</label>
                <select id='subjectCode' defaultValue='Select Subject'>
                    <option value="Select Subject" disabled>Select Subject</option>
                    {subjects.map((data,index)=>{
                        return(
                            <option key={index} value={index}>{data.subjectCode}</option>
                        )
                    })}
                </select>
            </div>
            <div>
                <label htmlFor="testType">Select Test</label>
                <select id="testType" defaultValue='Select Test'>
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
                <label htmlFor="totalMarks">Total Marks</label>
                <input type='number' min='0' id='totalMarks'></input>
            </div>
            <div className='alert_msg' id='marksAlertmsg'></div>
        </form>
        <div id='studentsMarkEntry'>
            <table>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Register Number</th>
                        <th>Name</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {props.info.students.map((data,index)=>{
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{data.register_number}</td>
                                <td>{data.name}</td>
                                <td><input type='number' className='studentsMarks'></input></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <div id='studentNote'>NOTE : If a Student is Absent then left the mark Section as Empty,It will Defaulty take the Student as Absent</div>
        <button type='button' id='submitMarks' onClick={submitMarks} className='common_submitButton'>SUBMIT</button>
        </>
    }
    </div>
    )
}