import React, { Component,useEffect,useState } from 'react';
import ReactLoading from 'react-loading';
import { Redirect } from 'react-router-dom';
//import AdminNavigation from './AdminNavlinks';
import {useSelector,useDispatch} from 'react-redux';
import { studentVerify} from './StudentAction';
import StudentNavigation from './StudentNavigation';

export default function Student(props){
     const dispatch=useDispatch()
     const verify=useSelector(state=>state.user);
     console.log(verify)
    //verify - hold wheather the loggedin user is valid or not.
    //useEffect - check if the loggedin user is valid user or not.
    useEffect(()=>{
        if(verify.user!=='Success'){
            dispatch(studentVerify('Student'))
        }
    },[])
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    //If Student is valid then Navigate to Student Home Page.
    //If not then redirect to Home Page.
    return(
        <>
        {verify==='loading' ?
            <div className="loading_button">
                <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
            </div>:verify.user==='Invalid'?<Redirect to='/Home'></Redirect>:
            <div>
                <StudentNavigation/>
            </div>
        }
        </>
    )
}
