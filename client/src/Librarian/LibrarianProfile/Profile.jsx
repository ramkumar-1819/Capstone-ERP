import React, { Component,useEffect,useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {useSelector} from 'react-redux';

//This is the Home Page for Admin when he Looged in.
export default function LibrarianProfile(props){
    const librarianId=useSelector(state=>state.user.data._id);
    //librarianDatas - Contain the Information about librarian.
    const[librarianDatas,setLibrarianDatas]=useState('loading')
    //useEffect - Fetch the Info about librarian.
    useEffect(()=>{
        axios.get(`http://localhost:8080/LibrarianProfile/${librarianId}`)
        .then(res=>{
            console.log(res)
            setLibrarianDatas(res.data)
        })
        .catch(err=>{
            console.log(err.response.data)
            setLibrarianDatas('Failed')
        })
    },[])
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Librarian_Navlinks=document.getElementById('Librarian_navbar').children;
        for(const links of Librarian_Navlinks){
            links.style.color='white';
        }
        Librarian_Navlinks[0].style.color='gray';
    },[])
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';

    return(
        <div className="LibrarianProfile_Section common_Section">
            {librarianDatas==='loading' &&
                <div className="librarianProfileLoading ">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }
            {(librarianDatas!=='loading' && librarianDatas!=='Failed') &&
              <>
                <div className="core_info user_info">
                    <img src={`http://localhost:8080/${librarianDatas.dp}`} alt="profile_DP" className="profile_DP"/>
                    <div className="username">{librarianDatas.name}</div>
                    <div className="userid">{librarianDatas.register_number}</div>
                    <Link to='/Librarian/UpdateProfile' className="updateProfile_inProfile">Update Profile</Link>
                </div>
                <table className="Librarian_infos userInfo">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>:</td>
                            <td>{librarianDatas.name}</td>
                        </tr>
                        <tr>
                            <th>Registration Number</th>
                            <td>:</td>
                            <td>{librarianDatas.register_number}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>:</td>
                            <td>{librarianDatas.email}</td>
                        </tr>
                        <tr>
                            <th>Date of Birth</th>
                            <td>:</td>
                            <td>{librarianDatas.date_of_birth}</td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>:</td>
                            <td>{librarianDatas.type}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>:</td>
                            <td>{librarianDatas.contact_number}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>:</td>
                            <td>{librarianDatas.address}</td>
                        </tr>
                    </tbody>
                </table>
            </>
            }
            {librarianDatas==='Failed' &&
                <div>Error Occured</div>
            }
        </div>)
}