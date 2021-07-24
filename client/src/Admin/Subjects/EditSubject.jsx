import React, { Component,useEffect } from 'react';
import axios from 'axios';

export default function EditSubjects(props){
    //gives the existing value as default value to I/P field for editSubjects.
    useEffect(()=>{
        document.getElementById('subject_name').value=props.subject.subjectName;
        document.getElementById('subject_code').value=props.subject.subjectCode;
    })
    //closeEditSubjectForm() - close the edit subject form.
    const closeEditSubjectForm=()=>{
        document.getElementById('editSubjects').style.display='none';
    }   
    //Apply buttonStyles to submit button.   
    const applyButtonStyle=()=>{
        document.getElementsByClassName('editSubjectform_button')[0].innerHTML='CHANGING...';
        document.getElementsByClassName('editSubjectform_button')[0].style.opacity='0.5';
    }
    const removeButtonStyle=()=>{
        document.getElementsByClassName('editSubjectform_button')[0].innerHTML='CHANGE';
        document.getElementsByClassName('editSubjectform_button')[0].style.opacity='1';
    }
    //SubmitEditSubjectForm() - used to update the subject with new values in DB.
    const SubmitEditSubjectForm=(e)=>{
        e.preventDefault()
        const alreter=document.getElementById('editSubject_alert');
        alreter.innerHTML="";
        applyButtonStyle()
        axios.patch(`http://localhost:8080/updateSubject/${props.subject._id}`,{
           subjectName:document.getElementById('subject_name').value,
           subjectCode:document.getElementById('subject_code').value,
        })
        .then(result=>{
            alert('Updated Successfully')
            removeButtonStyle()
            props.callBack(props.subject.index,result.data)
            document.getElementById('editSubjects').style.display='none';
            
        })
        .catch(err=>{
            removeButtonStyle()
            alreter.innerHTML=err.response.data
        })
    }
    return(
        <form id='editSubject_form' className='commonUpdate_form' onSubmit={SubmitEditSubjectForm}>
                    <div id='close_editSubject' className='commonClose_button' onClick={closeEditSubjectForm}>✕</div>
                    <h2>Edit Subject</h2>
                    <div>
                        <label htmlFor="subject_name">SubjectName</label>
                        <input type="text" id='subject_name' required  /> 
                    </div>
                    <div>
                        <label htmlFor="subject_code">SubjectCode</label>
                        <input type="text" id='subject_code' required /> 
                    </div>
                    <div id='editSubject_alert' className='alert_msg'></div>
                    <button type='submit' className='editSubjectform_button common_submitButton'>CHANGE</button>
                </form>
    )
}