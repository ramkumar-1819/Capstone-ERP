import React, { Component,useEffect,useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Redirect } from 'react-router-dom';
import './Admin.css'
import AdminNavigation from './AdminNavlinks';
import {useSelector,useDispatch} from 'react-redux';
import { adminVerify } from './ActionAdmin';

export default function Admin(props){
     const dispatch=useDispatch()
     const verify=useSelector(state=>state.user);
    //verify - hold wheather the loggedin user is valid or not.
    //useEffect - check if the loggedin user is valid user or not.
    useEffect(()=>{
        if(verify.user!=='Success'){
            dispatch(adminVerify('Admin'))
        }
    },[])
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    //If Admin is valid then Navigate to Admin Home Page.
    //If not then redirect to Home Page.
    console.log(verify)
    return(
        <>
        {verify==='loading' ?
            <div className="loading_button">
                <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
            </div>:verify.user==='Invalid'?<Redirect to='/Home'></Redirect>:
            <div>
                <AdminNavigation/>
            </div>
        }
        </>
    )
}
