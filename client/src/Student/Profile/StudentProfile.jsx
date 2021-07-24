import React, { Component,useEffect,useState } from 'react';
import './StudentProfile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {useSelector,useDispatch} from 'react-redux';

//This is the Home Page for Admin when he Looged in.
export default function StudentProfile(props){
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
        Faculty_Navlinks[0].style.color='gray';
    },[])
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';

    return(
        <div className="StudentProfile_Section common_Section">
            {studentDatas==='loading' &&
                <div className="studentProfileLoading ">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }
            {(studentDatas!=='loading' && studentDatas!=='Failed') &&
              <>
                <div className="core_info user_info">
                    <img src={`http://localhost:8080/${studentDatas.dp}`} alt="profile_DP" className="profile_DP"/>
                    <div className="username">{studentDatas.name}</div>
                    <div className="userid">{studentDatas.register_number}</div>
                    <Link to='/Student/UpdateProfile' className="updateProfile_inProfile">Update Profile</Link>
                </div>
                <table className="Student_infos userInfo">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>:</td>
                            <td>{studentDatas.name}</td>
                        </tr>
                        <tr>
                            <th>Registration Number</th>
                            <td>:</td>
                            <td>{studentDatas.register_number}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>:</td>
                            <td>{studentDatas.email}</td>
                        </tr>
                        <tr>
                            <th>Department</th>
                            <td>:</td>
                            <td>{studentDatas.department}</td>
                        </tr>
                        <tr>
                            <th>Year</th>
                            <td>:</td>
                            <td>{studentDatas.year}</td>
                        </tr>
                        <tr>
                            <th>Semester</th>
                            <td>:</td>
                            <td>{studentDatas.semester}</td>
                        </tr>
                        <tr>
                            <th>Section</th>
                            <td>:</td>
                            <td>{studentDatas.section}</td>
                        </tr>
                        <tr>
                            <th>Date of Birth</th>
                            <td>:</td>
                            <td>{studentDatas.date_of_birth}</td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>:</td>
                            <td>{studentDatas.type}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>:</td>
                            <td>{studentDatas.contact_number}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>:</td>
                            <td>{studentDatas.address}</td>
                        </tr>
                    </tbody>
                </table>
            </>
            }
            {studentDatas==='Failed' &&
                <div>Error Occured</div>
            }
        </div>)
}