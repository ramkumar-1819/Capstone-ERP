import React, { Component,useEffect,useState } from 'react';
import ReactLoading from 'react-loading';
import { Redirect } from 'react-router-dom';
//import AdminNavigation from './AdminNavlinks';
import {useSelector,useDispatch} from 'react-redux';
import { librarianVerify} from './LibrarianAction';
import LibrarianNavigation from './LibrarianNavigation';

export default function Librarian(props){
     const dispatch=useDispatch()
     const verify=useSelector(state=>state.user);
     console.log(verify)
    //verify - hold wheather the loggedin user is valid or not.
    //useEffect - check if the loggedin user is valid user or not.
    useEffect(()=>{
        if(verify.user!=='Success'){
            dispatch(librarianVerify('Librarian'))
        }
    },[])
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    //If Librarian is valid then Navigate to Librarian Home Page.
    //If not then redirect to Home Page.
    return(
        <>
        {verify==='loading' ?
            <div className="loading_button">
                <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
            </div>:verify.user==='Invalid'?<Redirect to='/Home'></Redirect>:
            <div>
                <LibrarianNavigation/>
            </div>
        }
        </>
    )
}
