import React, { Component,useEffect,useState } from 'react';
import axios from 'axios';
import './UpdateProfile.css'
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';

export default function StudentUpdateProfile(props){
    const studentId=useSelector(state=>state.user.data._id);
    //studentDatas - Contain the Information about Student.
    const[studentDatas,setStudentDatas]=useState('loading')
    //useEffect - Fetch the Info about student.
    useEffect(()=>{
        axios.get(`http://localhost:8080/StudentProfile/${studentId}`)
        .then(res=>{
            console.log(res)
            setStudentDatas(res.data)
        })
        .catch(err=>{
            console.log(err.response.data)
            setStudentDatas('Failed')
        })
    },[])
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Faculty_Navlinks=document.getElementById('Student_navbar').children;
        for(const links of Faculty_Navlinks){
            links.style.color='white';
        }
        Faculty_Navlinks[1].style.color='gray';
    },[])
    //Apply button styles to Submit button.
    const applyButtonStyle=()=>{
        document.getElementById('submitUpdateStudent').innerHTML="UPDATING....";
        document.getElementById('submitUpdateStudent').style.opacity='0.5';
    }
    const removeButtonStyle=()=>{
        document.getElementById('submitUpdateStudent').innerHTML="UPDATE";
        document.getElementById('submitUpdateStudent').style.opacity='1';
    }
    let profilePicture; //hold selected image file in the form;
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    //studentFormSubmitHandler() - user to update the student with new value.
    const studentFormSubmitHandler=(e)=>{
        e.preventDefault()
        applyButtonStyle()
        const phone_pattern=/^[6789][0-9]{9}$/g;
        if(!phone_pattern.test(document.getElementById('studentphone').value)){
            document.getElementById('alert_studentUpdateProfile').innerHTML="Enter a Valid Phone Number";
            removeButtonStyle()
            return
        }
        //formData - used to create a multipart form data.
        const formData = new FormData();
        formData.append('name', document.getElementById('studentname').value);
        formData.append('phone_number', document.getElementById('studentphone').value);
        formData.append('email', document.getElementById('studentemail').value);
        formData.append('dp', profilePicture);
        formData.append('address',document.getElementById('studentaddress').value);
        axios.patch(`http://localhost:8080/updateStudentDetails/${studentId}`,formData)
        .then(res=>{
            alert("Updated Successfully")
            removeButtonStyle()
            window.location.reload()
        })
        .catch(err=>{
            removeButtonStyle()
            if(err.response.data){
                document.getElementById('alert_studentUpdateProfile').innerHTML=err.response.data;
            }
            else{
                document.getElementById('alert_studentUpdateProfile').innerHTML='Server Error';
            }
        })
    }
    //getProfilePictureFile() - hold the DP file.
    const getProfilePictureFile=(e)=>{
        profilePicture=e.target.files[0]
    }
    const changeAlertMessage=()=>{
        document.getElementById('alert_studentUpdateProfile').innerHTML=""
    }
    return(
        <div id="StudentUpdateProfile_Section" className='common_UpdateProfileSection'>
            {studentDatas==='loading' &&
                <div className="loadingUpdate_Profile">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }
            {(studentDatas!=='loading' && studentDatas!=='Failed') &&
            <form id="studentUpdateform" className='common_UpdateProfileForm' onSubmit={studentFormSubmitHandler} encType='multipart/form-data'>
                <div>
                    <label htmlFor='studentdp'>Profile Picture</label>
                    <input type='file' id="studentdp" onChange={getProfilePictureFile} required></input>
                </div>
                <div>
                    <label htmlFor='studentname'>Name</label>
                    <input type='text' id="studentname" required defaultValue={studentDatas.name}></input>
                </div>
                <div>
                    <label htmlFor='studentphone'>Phone Number</label>
                    <input type='text' id="studentphone" onChange={changeAlertMessage} required defaultValue={studentDatas.contact_number}></input>
                </div>
                <div>
                    <label htmlFor='studentemail'>Email</label>
                    <input type='email' id="studentemail" required defaultValue={studentDatas.email}></input>
                </div>
                <div>
                    <label htmlFor='studentaddress'>Address</label>
                    <textarea id="studentaddress" required defaultValue={studentDatas.address}></textarea>
                </div>
                <div className="alert_msg" id='alert_studentUpdateProfile'></div>
                <button type='submit' id="submitUpdateStudent" className='common_submitButton'>UPDATE</button>
            </form>
            }
        </div>
    )
}