import React, { Component,useEffect,useState } from 'react';
import axios from 'axios';
import './UpdateProfile.css'
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';

export default function FacultyUpdateProfile(props){
    //facultyId - loged in faculty ID.
    //facultyDatas -  hold details of faculty.
    const facultyId=useSelector(state=>state.user.data._id);
    const[facultyDatas,setFacultyDatas]=useState('loading')
    //useEffect - to fetch the faculty details.
    useEffect(()=>{
        axios.get(`http://localhost:8080/FacultyProfile/${facultyId}`)
        .then(res=>{
            setFacultyDatas(res.data)
        })
        .catch(err=>{
            console.log(err.response.data)
            setFacultyDatas('Failed')
        })
    },[])
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Faculty_Navlinks=document.getElementById('Faculty_navbar').children;
        for(const links of Faculty_Navlinks){
            links.style.color='white';
        }
        Faculty_Navlinks[1].style.color='gray';
    },[])
    const applyButtonStyle=()=>{
        document.getElementById('submitUpdateFaculty').innerHTML="UPDATING....";
        document.getElementById('submitUpdateFaculty').style.opacity='0.5';
    }
    const removeButtonStyle=()=>{
        document.getElementById('submitUpdateFaculty').innerHTML="UPDATE";
        document.getElementById('submitUpdateFaculty').style.opacity='1';
    }
    let profilePicture; //hold selected image file in the form;
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    //adminFormSubmitHandler() - used to update faculty with inputed datas.
    const adminFormSubmitHandler=(e)=>{
        e.preventDefault()
        applyButtonStyle()
        const phone_pattern=/^[6789][0-9]{9}$/g;
        if(!phone_pattern.test(document.getElementById('facultyphone').value)){
            document.getElementById('alert_facultyUpdateProfile').innerHTML="Enter a Valid Phone Number";
            removeButtonStyle()
            return
        }
        //formData - used to create multipart form data.
        const formData = new FormData();
        formData.append('name', document.getElementById('facultyname').value);
        formData.append('phone_number', document.getElementById('facultyphone').value);
        formData.append('email', document.getElementById('facultyemail').value);
        formData.append('dp', profilePicture);
        formData.append('address',document.getElementById('facultyaddress').value);
        axios.patch(`http://localhost:8080/UpdateFacultyDetails/${facultyId}`,formData)
        .then(res=>{
            alert("Updated Successfully")
            removeButtonStyle()
            window.location.reload()
        })
        .catch(err=>{
            removeButtonStyle()
            if(err.response.data){
                document.getElementById('alert_facultyUpdateProfile').innerHTML=err.response.data.Error;
            }
            else{
                document.getElementById('alert_facultyUpdateProfile').innerHTML='Server Error';
            }
        })
    }
    //getProfilePictureFile() - hold the DP file.
    const getProfilePictureFile=(e)=>{
        profilePicture=e.target.files[0]
    }
    const changeAlertMessage=()=>{
        document.getElementById('alert_facultyUpdateProfile').innerHTML=""
    }
    return(
        <div id="FacultyUpdateProfile_Section" className='common_UpdateProfileSection'>
            {facultyDatas==='loading' &&
                <div className="loadingUpdate_Profile">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }
            {(facultyDatas!=='loading' && facultyDatas!=='Failed') &&
            <form id="facultyUpdateform" className='common_UpdateProfileForm' onSubmit={adminFormSubmitHandler} encType='multipart/form-data'>
                <div>
                    <label htmlFor='facultydp'>Profile Picture</label>
                    <input type='file' id="facultydp" onChange={getProfilePictureFile} required></input>
                </div>
                <div>
                    <label htmlFor='facultyname'>Name</label>
                    <input type='text' id="facultyname" required defaultValue={facultyDatas.name}></input>
                </div>
                <div>
                    <label htmlFor='facultyphone'>Phone Number</label>
                    <input type='text' id="facultyphone" onChange={changeAlertMessage} required defaultValue={facultyDatas.contact_number}></input>
                </div>
                <div>
                    <label htmlFor='facultyemail'>Email</label>
                    <input type='email' id="facultyemail" required defaultValue={facultyDatas.email}></input>
                </div>
                <div>
                    <label htmlFor='facultyaddress'>Address</label>
                    <textarea id="facultyaddress" required defaultValue={facultyDatas.address}></textarea>
                </div>
                <div className="alert_msg" id='alert_facultyUpdateProfile'></div>
                <button type='submit' id="submitUpdateFaculty" className='common_submitButton'>UPDATE</button>
            </form>
            }
        </div>
    )
}