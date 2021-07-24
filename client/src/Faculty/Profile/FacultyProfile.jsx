import React, { Component,useEffect,useState } from 'react';
import './FacultyProfile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {useSelector,useDispatch} from 'react-redux';

//This is the Home Page for Admin when he Looged in.
export default function FacultyProfile(props){
    const facultyId=useSelector(state=>state.user.data._id);
    //facultyDatas - Contain the Information about faculty.
    const[facultyDatas,setFacultyDatas]=useState('loading')
    //useEffect - Fetch the Info about faculty.
    useEffect(()=>{
        axios.get(`http://localhost:8080/FacultyProfile/${facultyId}`)
        .then(res=>{
            console.log(res)
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
        Faculty_Navlinks[0].style.color='gray';
    },[])
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';

    return(
        <div className="FacultyProfile_Section common_Section">
            {facultyDatas==='loading' &&
                <div className="facultyProfileLoading ">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }
            {(facultyDatas!=='loading' && facultyDatas!=='Failed') &&
              <>
                <div className="core_info user_info">
                    <img src={`http://localhost:8080/${facultyDatas.dp}`} alt="profile_DP" className="profile_DP"/>
                    <div className="username">{facultyDatas.name}</div>
                    <div className="userid">{facultyDatas.register_number}</div>
                    <Link to='/Faculty/UpdateProfile' className="updateProfile_inProfile">Update Profile</Link>
                </div>
                <table className="Faculty_infos userInfo">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>:</td>
                            <td>{facultyDatas.name}</td>
                        </tr>
                        <tr>
                            <th>Registration Number</th>
                            <td>:</td>
                            <td>{facultyDatas.register_number}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>:</td>
                            <td>{facultyDatas.email}</td>
                        </tr>
                        <tr>
                            <th>Department</th>
                            <td>:</td>
                            <td>{facultyDatas.department}</td>
                        </tr>
                        <tr>
                            <th>Designation</th>
                            <td>:</td>
                            <td>{facultyDatas.designation}</td>
                        </tr>
                        <tr>
                            <th>Date of Birth</th>
                            <td>:</td>
                            <td>{facultyDatas.date_of_birth}</td>
                        </tr>
                        <tr>
                            <th>Joining Year</th>
                            <td>:</td>
                            <td>{facultyDatas.joining_year}</td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>:</td>
                            <td>{facultyDatas.type}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>:</td>
                            <td>{facultyDatas.contact_number}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>:</td>
                            <td>{facultyDatas.address}</td>
                        </tr>
                    </tbody>
                </table>
            </>
            }
            {facultyDatas==='Failed' &&
                <div>Error Occured</div>
            }
        </div>)
}