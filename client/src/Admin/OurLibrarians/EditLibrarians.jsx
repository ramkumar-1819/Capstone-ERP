import React, { Component,useEffect } from 'react';
import axios from 'axios';

export default function EditLibrarian(props){
    //useEffect - hold existing values as default value to librarian I/P field.
    useEffect(()=>{
        document.getElementById('librarian_name').value=props.librarian.name;
        document.getElementById('librarian_register_number').value=props.librarian.register_number;
        document.getElementById('librarian_dob').value=props.librarian.date_of_birth;
        document.getElementById('librarian_email').value=props.librarian.email;
    })
    //removeEditAlertMessage() - remove error message.
    const removeEditAlertMessage=()=>{
        document.getElementById('editLibrarian_alert').innerHTML="";
    }
    //Give Button Styles
    const changeEditButtonStyle=()=>{
        document.getElementsByClassName('editLibrarianform_button')[0].innerHTML="CHANGING...";
        document.getElementsByClassName('editLibrarianform_button')[0].style.opacity='0.5';
    }
    const removeEditButtonStyle=()=>{
        document.getElementsByClassName('editLibrarianform_button')[0].innerHTML="CHANGE";
        document.getElementsByClassName('editLibrarianform_button')[0].style.opacity='1';
    }
    //close_EditFaculty - close the edit faculty form
    const close_EditLibrarian=()=>{
        document.getElementById('EditLibrarian').style.display='none';
    }
    //submit_EditFaculty - used to update the the faculties data in the backend and display with updated data.
    const submit_EditLibrarian=(e)=>{
        e.preventDefault()
        removeEditAlertMessage()
        changeEditButtonStyle()
        const librarian_name=document.getElementById('librarian_name').value;
        const librarian_register_number=document.getElementById('librarian_register_number').value;
        const librarian_dob=document.getElementById('librarian_dob').value;
        const librarian_email=document.getElementById('librarian_email').value;
        axios.patch(`http://localhost:8080/updateLibrarian/${props.librarian._id}`,{
            name:librarian_name,
            register_number:librarian_register_number,
            date_of_birth:librarian_dob,
            email:librarian_email
        })
        .then(result=>{
            axios.get('http://localhost:8080/getLibrarians')
            .then(result=>{
                removeEditButtonStyle()
                alert('Updated Successfully')
                props.callBack(result.data)
                document.getElementById('EditLibrarian').style.display='none';
            })
            .catch(err=>{
                alert(err.response.data)
                removeEditButtonStyle()
            })
        })
        .catch(err=>{
            document.getElementById('editLibrarian_alert').innerHTML=err.response.data;
            removeEditButtonStyle()
        })
    }
    return(
        <form id='editLibrarian_form' className='commonUpdate_form' onSubmit={submit_EditLibrarian}>
                    <div id='close_addLibrarian' className='commonClose_button' onClick={close_EditLibrarian}>✕</div>
                    <h2>Edit Librarian</h2>
                    <div>
                        <label htmlFor="librarian_name">Name</label>
                        <input type="text" id='librarian_name' required/> 
                    </div>
                    <div>
                        <label htmlFor="librarian_register_number">Date</label>
                        <input type="text" id='librarian_register_number' required /> 
                    </div>
                    <div>
                        <label htmlFor="librarian_dob">DOB</label>
                        <input type="date" id='librarian_dob' required/> 
                    </div>
                    <div>
                        <label htmlFor="librarian_email">Email</label>
                        <input type="email" id='librarian_email' required /> 
                    </div>
                    <div id='editLibrarian_alert' className='alert_msg'></div>
                    <button type='submit' className='editLibrarianform_button common_submitButton'>CHANGE</button>
                </form>
    )
}