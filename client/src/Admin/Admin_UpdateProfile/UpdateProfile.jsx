import React, { Component,useEffect,useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import './UpdateProfile.css'
import { useSelector } from 'react-redux';

export default function AdminUpdateProfile(props){
    //adminId - hold Logedin admin's ID.
    const adminId=useSelector(state=>state.user.data._id);
    //adminDatas - Contain the Information about admin.
    const[adminDatas,setAdminDatas]=useState('loading')
    //useEffect - Fetch the Info about admin.
    useEffect(()=>{
        axios.get(`http://localhost:8080/AdminProfile/${adminId}`)
        .then(res=>{
            console.log(res.data)
            setAdminDatas(res.data)
        })
        .catch(err=>{
            console.log(err.response.data)
            setAdminDatas('Failed')
        })
    },[])
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Admin_Navlinks=document.getElementById('Admin_navbar').children;
        for(const links of Admin_Navlinks){
            links.style.color='white';
        }
        Admin_Navlinks[1].style.color='gray';
    },[])
    let profilePicture; //hold selected image file in the form;
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    //When UPDATE the ADMIN client side validation Done and Update it in the backend.
    const adminFormSubmitHandler=(e)=>{
        e.preventDefault()
        document.getElementById('submitUpdateAdmin').innerHTML="UPDATING...."
        const phone_pattern=/^[6789][0-9]{9}$/g;
        if(!phone_pattern.test(document.getElementById('adminphone').value)){
            document.getElementById('alert_adminUpdateProfile').innerHTML="Enter a Valid Phone Number";
            document.getElementById('submitUpdateAdmin').innerHTML='UPDATE'
            return
        }
        console.log(profilePicture)
        //FormDate() - Constructor to Create a multipart form Data.
        const formData = new FormData();
        formData.append('name', document.getElementById('adminname').value);
        formData.append('phone_number', document.getElementById('adminphone').value);
        formData.append('email', document.getElementById('adminemail').value);
        formData.append('dp', profilePicture);
        axios.patch(`http://localhost:8080/UpdateAdmin/${adminId}`,formData)
        .then(res=>{
            alert("Updated Successfully")
            document.getElementById('submitUpdateAdmin').innerHTML='UPDATED';
            window.location.reload()
        })
        .catch(err=>{
            document.getElementById('submitUpdateAdmin').innerHTML='UPDATE';
            if(err.response.data){
                document.getElementById('alert_adminUpdateProfile').innerHTML=err.response.data.Error;
            }
            else{
                document.getElementById('alert_adminUpdateProfile').innerHTML='Server Error';
            }
        })
    }
    //Hold the profile picture file.
    const getProfilePictureFile=(e)=>{
        profilePicture=e.target.files[0]
    }
    //Remove Error Message when changing the input field.
    const changeAlertMessage=()=>{
        document.getElementById('alert_adminUpdateProfile').innerHTML=""
    }
    return(
        <div id="AdminUpdateProfile_Section" className='common_UpdateProfileSection'>
            {adminDatas==='loading' &&
                <div className="loadingUpdate_Profile">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }
            {(adminDatas!=='loading' && adminDatas!=='Failed') &&
            <form id="adminUpdateform" className='common_UpdateProfileForm' onSubmit={adminFormSubmitHandler} encType='multipart/form-data'>
                <div>
                    <label htmlFor='admindp'>Profile Picture</label>
                    <input type='file' id="admindp" onChange={getProfilePictureFile} required></input>
                </div>
                <div>
                    <label htmlFor='adminname'>Name</label>
                    <input type='text' id="adminname" required defaultValue={adminDatas.name}></input>
                </div>
                <div>
                    <label htmlFor='adminphone'>Phone Number</label>
                    <input type='text' id="adminphone" onChange={changeAlertMessage} required defaultValue={adminDatas.phone_number}></input>
                </div>
                <div>
                    <label htmlFor='adminemail'>Email</label>
                    <input type='email' id="adminemail" required defaultValue={adminDatas.email}></input>
                </div>
                <div className="alert_msg" id='alert_adminUpdateProfile'></div>
                <button type='submit' id="submitUpdateAdmin" className='common_submitButton'>UPDATE</button>
            </form>
            }
        </div>
    )
}