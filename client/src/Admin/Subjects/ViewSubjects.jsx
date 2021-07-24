import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';
import EditSubjects from './EditSubject';

export default function ViewSubjects(){
    //subjects - hold all the subjects based on search.
    //semester - hold sem values based on year.
    //selectedSubject - hold selected subject to perform edit.
    const[subjects,setSubjects]=useState([])
    const[semester,setSemester]=useState([])
    const [selectedSubject,setSelectedSubject]=useState([])
    //if year is changed then we need to remove the existing sem value.
    useEffect(()=>{
        document.getElementById('SelectSemester').value='Select Semester'   
    },[semester])
    //Apply Button styles to SUBMIT  button
    const applyButtonStyle=()=>{
        document.getElementById('SearchSubjects').innerHTML="FETCHING...";
        document.getElementById('SearchSubjects').style.opacity='0.5';
    }
    const removeButtonStyle=()=>{
        document.getElementById('SearchSubjects').innerHTML="SEARCH";
        document.getElementById('SearchSubjects').style.opacity='1';
    }
    //When form is submit to search subjects.
    const Search_Subjects=(e)=>{
        e.preventDefault()
        applyButtonStyle()
        const alert_message=document.getElementById('subject_alert');
        alert_message.innerHTML="";
        const department=document.getElementById('subject_Department');
        const year=document.getElementById('subject_selectYear');
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
        axios.post('http://localhost:8080/getSubjects',{
            subjectDepartment:department.value,
            subjectYear:year.value,
            subjectSemester:sem.value
        })
        .then(result=>{
            console.log(result)
            removeButtonStyle()
            setSubjects(result.data)
        })
        .catch(err=>{
            document.getElementById('subject_alert').innerHTML=err.response.data;
            removeButtonStyle()
        })
    }
    const callBack=(index,updatedValue)=>{
        const[...newSubject]=subjects;
        newSubject[index]=updatedValue;
        console.log(newSubject)
        setSubjects(newSubject)
    }
    //when updateSubject button is clicked then show edit subject and set the subject in useState.
    const updateSubject=(index)=>{
        setSelectedSubject({...subjects[index],index:index})
        document.getElementById('editSubjects').style.display='block';
    }
    //deleteSubject() - used to delete the subjects.
    const deleteSubject=(index)=>{
        axios.delete(`http://localhost:8080/deleteSubject/${subjects[index]._id}`)
        .then(result=>{
            alert("Deleted Successfully")
            const [...copySubjects]=subjects;
            copySubjects.splice(index,1)
            console.log(copySubjects)
            setSubjects(copySubjects)
        })
        .catch(err=>{
            alert(err.response.data)
        })
    }
    const getSemester=(e)=>{
        const sem=Number(e.target.value)+(Number(e.target.value)-1);
        setSemester([sem,sem+1])
    }
    console.log(semester)
    return(
        <div id='view_subjects_section'>
            <form id="viewSubjects_Form" onSubmit={Search_Subjects} >
                    <label htmlFor="subject_Department">Department</label>
                    <select id="subject_Department" defaultValue={'Select Department'} >
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
                    <label htmlFor="subject_selectYear">Year</label>
                    <select id="subject_selectYear" defaultValue={'Select Year'} onChange={getSemester}>
                        <option value="Select Year" disabled>Select Year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <label htmlFor="SelectSemester">Select Semester</label>
                    <select id="SelectSemester" defaultValue={'Select Semester'} >
                        <option value="Select Semester" disabled>Select Semester</option>
                        {semester.map((sem,index)=><option key={index} value={sem}>{sem}</option>)}
                    </select>
                    <div id="subject_alert" className='alert_msg'></div>
                    <button type="submit" id="SearchSubjects" className='common_submitButton' >SEARCH</button>
            </form>
            <div id='subjects_list'>
                        <table id='subject_list_table'>
                            <thead>
                                <tr>
                                    <th>Subject Name</th>
                                    <th>Subject Code</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {subjects.map((value,index)=>{
                                return(
                                <tr key={index}>
                                    <td>{value.subjectName}</td>
                                    <td>{value.subjectCode}</td>
                                    <td><button type='button' className='commonUpdateDeleteButton' onClick={()=>updateSubject(index)}>Update</button><button type='button' className='commonUpdateDeleteButton' onClick={()=>deleteSubject(index)}>Delete</button></td>
                                </tr>
                                )
                            })}
                            </tbody>
                        </table>
            </div>
            <div id='editSubjects'>
                 <EditSubjects subject={selectedSubject} callBack={callBack}/>
            </div>
        </div>)
}