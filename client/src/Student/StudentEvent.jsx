import React, { Component,useEffect } from 'react';
import ViewEvent from '../ViewEvents/ViewEvents';

export default function StudentViewEvents(){
    useEffect(()=>{
        const Faculty_Navlinks=document.getElementById('Student_navbar').children;
        for(const links of Faculty_Navlinks){
            links.style.color='white';
        }
        Faculty_Navlinks[7].style.color='gray';
    },[])
    return(
        <ViewEvent/>
    )
}