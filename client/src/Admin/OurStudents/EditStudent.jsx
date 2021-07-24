import React, { Component,useEffect,useState } from 'react';
import axios from 'axios';

export default function EditStudent(props){
    //semester hold sem values based on year.
    const[semester,setSemester]=useState([])
    //set the existing values as default values of I/P field for edit Student form.
    useEffect(()=>{
        document.getElementById('student_name').value=props.student.name;
        document.getElementById('student_register_number').value=props.student.register_number;
        document.getElementById('student_section').value=props.student.section;
        document.getElementById('student_dob').value=props.student.date_of_birth;
        document.getElementById('student_email').value=props.student.email;
        document.getElementById('editSelectSemester').value='Select Semester';
        document.getElementById('editstudent_year').value='Select Year'
    },[props.student])
    //Apply Button Styles to SUBMIT button.
    const changeEditButtonStyle=()=>{
        document.getElementsByClassName('editStudentform_button')[0].innerHTML="CHANGING...";
        document.getElementsByClassName('editStudentform_button')[0].style.opacity='0.5';
    }
    const removeEditButtonStyle=()=>{
        document.getElementsByClassName('editStudentform_button')[0].innerHTML="CHANGE";
        document.getElementsByClassName('editStudentform_button')[0].style.opacity='1';
    }
    //submit_EditStudent - used to update the the students data in the backend and display with updated data.
    const submit_EditStudent=(e)=>{
        e.preventDefault()
        changeEditButtonStyle()
        const student_name=document.getElementById('student_name').value;
        const student_register_number=document.getElementById('student_register_number').value;
        const student_dob=document.getElementById('student_dob').value;
        const student_email=document.getElementById('student_email').value;
        const student_section=document.getElementById('student_section').value;
        const student_year=document.getElementById('editstudent_year');
        const student_semester=document.getElementById('editSelectSemester');
        if(student_year.value==='Select Year'){
            removeEditButtonStyle()
            alert('Select Year');
            student_year.focus()
            return
        }
        console.log(student_semester.value)
        if(student_semester.value==='Select Semester'){
            removeEditButtonStyle()
            alert('Select Semester');
            student_semester.focus()
            return
        }
        axios.patch(`http://localhost:8080/updateStudent/${props.student._id}`,{
            name:student_name,
            section:student_section,
            year:student_year.value,
            semester:student_semester.value,
            register_number:student_register_number,
            date_of_birth:student_dob,
            email:student_email
        })
        .then(result=>{
            axios.post('http://localhost:8080/getStudents',{
                department:document.getElementById('admin_selectStudentDepartment').value,
                year:document.getElementById('admin_selectStudentYear').value,
                semester:document.getElementById('SelectSemester').value
            })
            .then(result=>{
                alert('Updated Successfully')
                removeEditButtonStyle()
                document.getElementById('EditStudent').style.display='none';
                props.callBack(result.data)
            })
            .catch(err=>{
                alert(err.response.data)
                removeEditButtonStyle()
            })
        })
        .catch(err=>{
            document.getElementById('editStudent_alert').innerHTML=err.response.data;
            removeEditButtonStyle()
        })
    }
    //close_EditStudent - close the edit Student form
    const close_EditStudent=()=>{
        document.getElementById('EditStudent').style.display='none';
    }
    const getSemester=(e)=>{
        const sem=Number(e.target.value)+(Number(e.target.value)-1);
        setSemester([sem,sem+1])
    }
    return(
        <>
        <h2 id='editStudent_header'>Edit Student</h2>
        <form id='editStudent_form'  onSubmit={submit_EditStudent}>
                    <div id='close_addStudent' className='commonClose_button' onClick={close_EditStudent}>✕</div>
                    <div>
                        <label htmlFor="student_name">Name</label>
                        <input type="text" id='student_name' required/> 
                    </div>
                    <div>
                        <label htmlFor="student_register_number">Date</label>
                        <input type="text" id='student_register_number' required/> 
                    </div>
                    <div>
                        <label htmlFor="editstudent_year">Select Year</label>
                        <select id="editstudent_year" defaultValue={'Select Year'} onChange={getSemester}>
                            <option value="Select Year" disabled>Select Year</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="editSelectSemester">Select Semester</label>
                        <select id="editSelectSemester" defaultValue={'Select Semester'} >
                            <option value="Select Semester" disabled>Select Semester</option>
                            {semester.map((sem,index)=><option key={index} value={sem}>{sem}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="student_section">Section</label>
                        <input type="text" id='student_section' required/> 
                    </div>
                    <div>
                        <label htmlFor="student_dob">DOB</label>
                        <input type="date" id='student_dob' required/> 
                    </div>
                    <div>
                        <label htmlFor="student_email">Email</label>
                        <input type="email" id='student_email' required/> 
                    </div>
                    <button type='submit' className='editStudentform_button common_submitButton'>CHANGE</button>
                </form>
    </>
    )
}