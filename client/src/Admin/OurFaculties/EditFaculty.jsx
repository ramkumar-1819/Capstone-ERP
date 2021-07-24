import React, { Component,useEffect } from 'react';
import axios from 'axios';

export default function EditFaculty(props){
    //Set the Existing values of faculty in their update faculty input field.
    useEffect(()=>{
        document.getElementById('faculty_name').value=props.faculty.name;
        document.getElementById('faculty_register_number').value=props.faculty.register_number;
        document.getElementById('faculty_dob').value=props.faculty.date_of_birth;
        document.getElementById('faculty_email').value=props.faculty.email;
    })
    //Button Style apply Styles to button whenever Submitting and got datas back from backend.
    const changeEditButtonStyle=()=>{
        document.getElementsByClassName('editFacultyform_button')[0].innerHTML="CHANGING...";
        document.getElementsByClassName('editFacultyform_button')[0].style.opacity='0.5';
    }
    const removeEditButtonStyle=()=>{
        document.getElementsByClassName('editFacultyform_button')[0].innerHTML="CHANGE";
        document.getElementsByClassName('editFacultyform_button')[0].style.opacity='1';
    }
    const removeEditAlertMessage=()=>{
        document.getElementById('editFaculty_alert').innerHTML="";
    }
     //close_EditFaculty - close the edit faculty form
     const close_EditFaculty=()=>{
        document.getElementById('EditFaculty').style.display='none';
    }
    //submit_EditFaculty - used to update the the faculties data in the backend and display with updated data.
    const submit_EditFaculty=(e)=>{
        e.preventDefault()
        removeEditAlertMessage()
        changeEditButtonStyle()
        const faculty_name=document.getElementById('faculty_name').value;
        const faculty_register_number=document.getElementById('faculty_register_number').value;
        const faculty_dob=document.getElementById('faculty_dob').value;
        const faculty_email=document.getElementById('faculty_email').value;
        axios.patch(`http://localhost:8080/updateFaculty/${props.faculty._id}`,{
            name:faculty_name,
            register_number:faculty_register_number,
            date_of_birth:faculty_dob,
            email:faculty_email
        })
        .then(result=>{
            axios.post('http://localhost:8080/getFaculties',{
            department:document.getElementById('admin_selectFacultyDepartment').value
            })
            .then(result=>{
                removeEditButtonStyle()
                alert('Updated Successfully')
                props.callBack(result.data)
                document.getElementById('EditFaculty').style.display='none';
            })
            .catch(err=>{
                alert(err.response.data)
                removeEditButtonStyle()
            })
        })
        .catch(err=>{
            document.getElementById('editFaculty_alert').innerHTML=err.response.data;
            removeEditButtonStyle()
        })
    }
    return(
        <form id='editFaculty_form' className='commonUpdate_form' onSubmit={submit_EditFaculty}>
                    <div id='close_addFaculty' className='commonClose_button' onClick={close_EditFaculty}>✕</div>
                    <h2>Edit Faculty</h2>
                    <div>
                        <label htmlFor="faculty_name">Name</label>
                        <input type="text" id='faculty_name' required/> 
                    </div>
                    <div>
                        <label htmlFor="faculty_register_number">Date</label>
                        <input type="text" id='faculty_register_number' required /> 
                    </div>
                    <div>
                        <label htmlFor="faculty_dob">DOB</label>
                        <input type="date" id='faculty_dob' required /> 
                    </div>
                    <div>
                        <label htmlFor="faculty_email">Email</label>
                        <input type="email" id='faculty_email' required /> 
                    </div>
                    <div id='editFaculty_alert' className='alert_msg'></div>
                    <button type='submit' className='editFacultyform_button common_submitButton'>CHANGE</button>
                </form>
    )
}