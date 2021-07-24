import React, { Component,useEffect,useState } from 'react';
import default_dp from '../default_dp.jpg';
import './AdminProfile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {useSelector,useDispatch} from 'react-redux';

//This is the Home Page for Admin when he Looged in.
export default function AdminProfile(props){
    const adminId=useSelector(state=>state.user.data._id);
    //adminDatas - Contain the Information about admin.
    const[adminDatas,setAdminDatas]=useState('loading')
    //useEffect - Fetch the Info about admin.
    useEffect(()=>{
        console.log("in")
        axios.get(`http://localhost:8080/AdminProfile/${adminId}`)
        .then(res=>{
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
        Admin_Navlinks[0].style.color='gray';
    },[])
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';

    return(
        <div className="AdminProfile_Section common_Section">
            {adminDatas==='loading' &&
                <div className="loadingProfile">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }
            {(adminDatas!=='loading' && adminDatas!=='Failed') &&
              <>
                <div className="core_info user_info">
                    <img src={`http://localhost:8080/${adminDatas.dp}`} alt="profile_DP" className="profile_DP"/>
                    <div className="username">{adminDatas.name}</div>
                    <div className="userid">{adminDatas.register_number}</div>
                    <Link to='/Admin/UpdateProfile' className="updateProfile_inProfile">Update Profile</Link>
                </div>
                <table className="Admin_infos userInfo">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>:</td>
                            <td>{adminDatas.name}</td>
                        </tr>
                        <tr>
                            <th>Registration Number</th>
                            <td>:</td>
                            <td>{adminDatas.register_number}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>:</td>
                            <td>{adminDatas.email}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>:</td>
                            <td>{adminDatas.phone_number}</td>
                        </tr>
                        <tr>
                            <th>Date of Birth</th>
                            <td>:</td>
                            <td>{adminDatas.date_of_birth}</td>
                        </tr>
                        <tr>
                            <th>Joining Year</th>
                            <td>:</td>
                            <td>{adminDatas.joining_year}</td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>:</td>
                            <td>{adminDatas.type}</td>
                        </tr>
                    </tbody>
                </table>
            </>
            }
            {adminDatas==='Failed' &&
                <div>Error Occured</div>
            }
        </div>)
}