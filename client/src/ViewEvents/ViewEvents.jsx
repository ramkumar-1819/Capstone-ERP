import React, { Component,useState,useEffect } from 'react';
import './ViewEvents.css';
import axios from 'axios';

export default function ViewEvent(){
    //events - contain a list of events uploaded by admin.
    const[events,setEvents]=useState([])
    //useEffect - to get all events.
    useEffect(()=>{
        axios.get('http://localhost:8080/viewEvents')
        .then(result=>{
            console.log(result.data)
            setEvents(result.data)
        })
        .catch(err=>{
            alert('Error Occured')
        })
    },[])
    return(
        <div id='event_section'>  
                <table className='addEvent_tableSection'>
                <caption>Current Events</caption>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Event Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length===0 &&
                        <>
                        <tr>
                           <td>-</td> 
                           <td>-</td>
                           <td>-</td>
                           <td>-</td>
                        </tr>
                         
                    </>
                        }
                        {events.length>0 &&
                        <>
                            {events.map((datas,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{datas.name}</td>
                                        <td>{datas.date_of_event}</td>
                                        <td><img src={`http://localhost:8080/${datas.event_image}`} id='event_pic' alt='event_pic'></img></td>
                                    </tr>
                                )
                            })}
                        </>
                        }
                    </tbody>
                </table>
            </div>
    )
}