import React, { Component,useEffect,useState } from 'react';
import axios from 'axios';
import './UpdateProfile.css'
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';

export default function LibrarianUpdateProfile(props){
    const librarianId=useSelector(state=>state.user.data._id);
    //librarianDatas - Contain the Information about librarian.
    const[librarianDatas,setLibrarianDatas]=useState('loading')
    //useEffect - Fetch the Info about librarian.
    useEffect(()=>{
        axios.get(`http://localhost:8080/LibrarianProfile/${librarianId}`)
        .then(res=>{
            setLibrarianDatas(res.data)
        })
        .catch(err=>{
            alert(err.response.data)
            setLibrarianDatas('Failed')
        })
    },[])
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Librarian_Navlinks=document.getElementById('Librarian_navbar').children;
        for(const links of Librarian_Navlinks){
            links.style.color='white';
        }
        Librarian_Navlinks[1].style.color='gray';
    },[])
    //Apply Buutin Styles to submit button
    const applyButtonStyle=()=>{
        document.getElementById('submitUpdateLibrarian').innerHTML="UPDATING....";
        document.getElementById('submitUpdateLibrarian').style.opacity='0.5';
    }
    const removeButtonStyle=()=>{
        document.getElementById('submitUpdateLibrarian').innerHTML="UPDATE";
        document.getElementById('submitUpdateLibrarian').style.opacity='1';
    }
    let profilePicture; //hold selected image file in the form;
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    //librarianFormSubmitHandler() - used to update the librarian details.
    const librarianFormSubmitHandler=(e)=>{
        e.preventDefault()
        applyButtonStyle()
        const phone_pattern=/^[6789][0-9]{9}$/g;
        if(!phone_pattern.test(document.getElementById('librarianphone').value)){
            document.getElementById('alert_librarianUpdateProfile').innerHTML="Enter a Valid Phone Number";
            removeButtonStyle()
            return
        }
        //formData - used to create a multipart form data.
        const formData = new FormData();
        formData.append('name', document.getElementById('librarianname').value);
        formData.append('contact_number', document.getElementById('librarianphone').value);
        formData.append('email', document.getElementById('librarianemail').value);
        formData.append('dp', profilePicture);
        formData.append('address',document.getElementById('librarianaddress').value);
        axios.patch(`http://localhost:8080/updateLibrarianDetails/${librarianId}`,formData)
        .then(res=>{
            alert("Updated Successfully")
            removeButtonStyle()
            window.location.reload()
        })
        .catch(err=>{
            removeButtonStyle()
            if(err.response.data){
                document.getElementById('alert_librarianUpdateProfile').innerHTML=err.response.data;
            }
            else{
                document.getElementById('alert_librarianUpdateProfile').innerHTML='Server Error';
            }
        })
    }
    //getProfilePictureFile() - hold DP file.
    const getProfilePictureFile=(e)=>{
        profilePicture=e.target.files[0]
    }
    const changeAlertMessage=()=>{
        document.getElementById('alert_librarianUpdateProfile').innerHTML=""
    }
    return(
        <div id="LibrarianUpdateProfile_Section" className='common_UpdateProfileSection'>
            {librarianDatas==='loading' &&
                <div className="loadingUpdate_Profile">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }
            {(librarianDatas!=='loading' && librarianDatas!=='Failed') &&
            <form id="librarianUpdateform" className='common_UpdateProfileForm' onSubmit={librarianFormSubmitHandler} encType='multipart/form-data'>
                <div>
                    <label htmlFor='librariandp'>Profile Picture</label>
                    <input type='file' id="librariandp" onChange={getProfilePictureFile} required></input>
                </div>
                <div>
                    <label htmlFor='librarianname'>Name</label>
                    <input type='text' id="librarianname" required defaultValue={librarianDatas.name}></input>
                </div>
                <div>
                    <label htmlFor='librarianphone'>Phone Number</label>
                    <input type='text' id="librarianphone" onChange={changeAlertMessage} required defaultValue={librarianDatas.contact_number}></input>
                </div>
                <div>
                    <label htmlFor='librarianemail'>Email</label>
                    <input type='email' id="librarianemail" required defaultValue={librarianDatas.email}></input>
                </div>
                <div>
                    <label htmlFor='librarianaddress'>Address</label>
                    <textarea id="librarianaddress" required defaultValue={librarianDatas.address}></textarea>
                </div>
                <div className="alert_msg" id='alert_librarianUpdateProfile'></div>
                <button type='submit' id="submitUpdateLibrarian" className='common_submitButton'>UPDATE</button>
            </form>
            }
        </div>
    )
}