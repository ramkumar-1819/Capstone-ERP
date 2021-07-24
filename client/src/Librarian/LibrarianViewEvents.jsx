import React, { Component,useEffect } from 'react';
import ViewEvent from '../ViewEvents/ViewEvents';

//This component show list of events that admin added.
export default function LibraianViewEvents(){
    useEffect(()=>{
        const Librarian_Navlinks=document.getElementById('Librarian_navbar').children;
        for(const links of Librarian_Navlinks){
            links.style.color='white';
        }
        Librarian_Navlinks[5].style.color='gray';
    },[])
    return(
        <ViewEvent/>
    )
}