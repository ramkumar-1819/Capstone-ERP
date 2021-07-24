import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';

export default function ShowStudents(props){
    //subjects - hold all the subjects based on student sem year dept.
    const[subjects,setSubjects]=useState([])
    //presentStudentIds - hold the ids of present student.
    const[presentStudentIds,setPresentStudentIds]=useState([])
    //useEffect -to get the subjects based on dept,year,sem.
    useEffect(()=>{
        if(props.info.department!==undefined && props.info.year!==undefined){
            setPresentStudentIds([])
            console.log(props)
            axios.post('http://localhost:8080/getSubjects',{
                subjectDepartment:props.info.department,
                subjectYear:props.info.year,
                subjectSemester:props.info.semester
            })
            .then(subjects=>{
                setSubjects(subjects.data)
            })
        }
    },[props.info])
    //whenever search made we need to unmark the previous checkbox values.
    useEffect(()=>{
            if(document.getElementById('attendenceAlertmsg')!==null){
                document.getElementById('attendenceAlertmsg').innerHTML=""
            }
            for(let unmark of document.getElementsByClassName('mark')){
                unmark.checked=false
            }
    },[props.info])
    //markAttendence() - set present student ids in useState.
    const markAttendence=(e,_id)=>{
      if(e.target.checked){
          setPresentStudentIds([...presentStudentIds,_id])
      }
      else{
          const studentid_index=presentStudentIds.indexOf(_id);
          const [...copyPresentStudent]=presentStudentIds;
          copyPresentStudent.splice(studentid_index,1)
          setPresentStudentIds(copyPresentStudent)
      }
    }
    //submitAttendence() - to submit the attendence in DB.
    const submitAttendence=(e)=>{
        e.preventDefault()
        const alerter=document.getElementById('attendenceAlertmsg');
        alerter.innerHTML="";
        const subjectCode=document.getElementById('subjectCode');
        if(subjectCode.value==='Select Subject'){
            alerter.innerHTML="Select Subject";
            subjectCode.focus()
            return
        }
        axios.post('http://localhost:8080/addAttendence',{
            department:props.info.department,
            year:props.info.year,
            section:props.info.section,
            semester:props.info.semester,
            subjectCode:subjectCode.value,
            studentIds:presentStudentIds
        })
        .then(marked=>{
            alert('Attendence marked Successfully')
            setSubjects([])
            setPresentStudentIds([])
            props.callBack()
        })
        .catch(err=>alerter.innerHTML=err.response.data)
    }
    return(
        <div id='markAttendence'>
        {subjects.length>0 &&
            <form id='submitAttendence' onSubmit={submitAttendence} >
                <select  id="subjectCode"  defaultValue='Select Subject'>
                    <option value="Select Subject" disabled>Select Subject</option>
                    {subjects.map((codes,index)=><option key={index} value={codes.subjectCode}>{codes.subjectCode}</option>)}
                </select>
                <div id='attendenceTable'>
                    <table>
                    <thead>
                        <tr>
                            <th>Registration Number</th>
                            <th>Name</th>
                            <th>Present/Absent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.info.students.map((user,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{user.register_number}</td>
                                    <td>{user.name}</td>
                                    <td><input type="checkbox" className='mark' onChange={(e)=>markAttendence(e,user._id)} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
                <div className='alert_msg' id='attendenceAlertmsg'></div>
                <button type='submit' className='common_submitButton'>SUBMIT</button>
            </form>
        }
        </div>
    )
}