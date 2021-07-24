import React, { Component,useEffect,useState } from 'react';
import './OurStudents.css';
import axios from 'axios';
import EditStudent from './EditStudent';

export default function OurStudents(props){
    //semester - hold the semester values based on year.
    //students - hold all student based on search.
    //selectedstudent - hold particular student selected for edit.
    const[semester,setSemester]=useState([])
    const[students,setStudents]=useState(null)
    const[selectedStudent,setSelectedstudent]=useState([])
    //if year is changed then we need to remove the existing sem value.
    useEffect(()=>{
        document.getElementById('SelectSemester').value='Select Semester'   
    },[semester])
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Admin_Navlinks=document.getElementById('Admin_navbar').children;
        for(const links of Admin_Navlinks){
            links.style.color='white';
        }
        Admin_Navlinks[6].style.color='gray';
    },[])
    //Apply Button styles to SUBMIT  button
    const applyButtonStyle=()=>{
        document.getElementById('SearchStudents').innerHTML="FETCHING...";
        document.getElementById('SearchStudents').style.opacity='0.5';
    }
    const removeButtonStyle=()=>{
        document.getElementById('SearchStudents').innerHTML="SEARCH";
        document.getElementById('SearchStudents').style.opacity='1';
    }
    const removeAlertMessage=()=>{
        document.getElementById('ourStudent_alert').innerHTML="";
    }
    //When form is submit to search students.
    const admin_SearchStudents=(e)=>{
        e.preventDefault()
        applyButtonStyle()
        const alert_message=document.getElementById('ourStudent_alert');
        const department=document.getElementById('admin_selectStudentDepartment');
        const year=document.getElementById('admin_selectStudentYear');
        const sem=document.getElementById('SelectSemester');
        if(department.value==='Select Department'){
            alert_message.innerHTML="Select Department"
            removeButtonStyle()
            department.focus()
            return
        }
        if(year.value==="Select Year"){
            alert_message.innerHTML="Select Year"
            removeButtonStyle()
            year.focus()
            return
        }
        if(sem.value==='Select Semester'){
            alert_message.innerHTML='Select Semester';
            removeButtonStyle()
            sem.focus()
            return
        }
        axios.post('http://localhost:8080/getStudents',{
            department:department.value,
            year:year.value,
            semester:sem.value
        })
        .then(result=>{
            removeButtonStyle()
            setStudents(result.data)
        })
        .catch(err=>{
            document.getElementById('ourStudent_alert').innerHTML=err.response.data;
            removeButtonStyle()
        })
    }
    //update_student - set the selected student in useState
    const update_student=(data)=>{
        setSelectedstudent(data)
        document.getElementById('EditStudent').style.display='block';
    }
    //delete_student - used to delete the selected student and update the student in useState.
    const delete_student=(id,index)=>{
        axios.delete(`http://localhost:8080/deleteStudent/${id}`)
        .then(result=>{
                const[...copyStudent]=students;
                copyStudent.splice(index,1)
                setStudents(copyStudent)
            })
            .catch(err=>{
                alert(err.response.data)
            })
    }
    const callBack=(data)=>{
        setStudents(data)
        setSelectedstudent([])
    }
    //hold sem values based on year.
    const getSemester=(value)=>{
        const sem=Number(value)+(Number(value)-1);
        setSemester([sem,sem+1])
    }
    const alert_getSem=(e)=>{
        removeAlertMessage()
        getSemester(e.target.value)
    }
    const upOneSem=()=>{
        axios.get('http://localhost:8080/SemUp')
        .then(result=>{
            alert('Student are moved one semester up')
        })
        .catch(err=>{
            console.log(err)
            alert(err.response.data)
        })
    }
    return(
        <div id="admin_OurStudents_Section">
            <div id='semYearUp_buttons'>
                <button className='common_submitButton' onClick={upOneSem}>SEM UP</button>
            </div>
            <form id="admin_StudentSearch_Form" onSubmit={admin_SearchStudents}>
                <label htmlFor="admin_selectStudentDepartment">Department</label>
                <select id="admin_selectStudentDepartment" defaultValue={'Select Department'} onChange={removeAlertMessage}>
                    <option value="Select Department" disabled>Select Department</option>
                    <option value="BioTech">BioTech</option>
                    <option value="Civil">Civil</option>
                    <option value="C.S.E">C.S.E</option>
                    <option value="E.C.E">E.C.E</option>
                    <option value="E.E.E">E.E.E</option>
                    <option value="IT">IT</option>
                    <option value="Mech">Mech</option>
                    <option value="M.B.A">M.B.A</option>
                </select>
                <label htmlFor="admin_selectStudentYear">Year</label>
                <select id="admin_selectStudentYear" defaultValue={'Select Year'} onChange={alert_getSem}>
                    <option value="Select Year" disabled>Select Year</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <label htmlFor="SelectSemester">Select Semester</label>
                <select id="SelectSemester" defaultValue={'Select Semester'}>
                    <option value="Select Semester" disabled>Select Semester</option>
                    {semester.map((sem,index)=><option value={sem}>{sem}</option>)}
                </select>
                <div id="ourStudent_alert" className='alert_msg'></div>
                <button type="submit" id="SearchStudents"className='common_submitButton'>SEARCH</button>
            </form>
            {students!==null &&
                <div className='display_Students'>
                    <table id="admin_DisplayStudents">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Register Number</th>
                                <th>Name</th>
                                <th>Year</th>
                                <th>Semester</th>
                                <th>Section</th>
                                <th>D.O.B</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((datas,index)=>{
                                return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{datas.register_number}</td>
                                    <td>{datas.name}</td>
                                    <td>{datas.year}</td>
                                    <td>{datas.semester}</td>
                                    <td>{datas.section}</td>
                                    <td>{datas.date_of_birth}</td>
                                    <td className='emailData'>{datas.email}</td>
                                    <td><button type='button' id='update_student' className='commonUpdateDeleteButton' onClick={()=>update_student(students[index])}>Update</button><button type='button' id='delete_student' className='commonUpdateDeleteButton' onClick={()=>delete_student(students[index]._id,index)}>Delete</button></td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                }
                <div id='EditStudent'>
                    <EditStudent student={selectedStudent} callBack={callBack}/>
                </div>
            
        </div>
    )
}