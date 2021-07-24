import React, { Component,useEffect } from 'react';
import ViewEvent from '../ViewEvents/ViewEvents';

//This Component Shows any event added by admin.
export default function FacultyViewEvents(){
    useEffect(()=>{
        const Student_Navlinks=document.getElementById('Faculty_navbar').children;
        for(const links of Student_Navlinks){
            links.style.color='white';
        }
        Student_Navlinks[8].style.color='gray';
    },[])
    return(
        <ViewEvent/>
    )
}