import React, { Component,useEffect,useState } from 'react';
import './AddEvent.css';
import axios from 'axios';
import ReactLoading from 'react-loading';

export default function AddEvent(props){
    //events - hold all the events got from backend
    const[events,setEvents]=useState('loading')
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Admin_Navlinks=document.getElementById('Admin_navbar').children;
        for(const links of Admin_Navlinks){
            links.style.color='white';
        }
        Admin_Navlinks[9].style.color='gray';
        getEvents()
    },[])
    //getEvents - used to get all the events from backend and show it in Current Event Section.
    const getEvents=()=>{
        axios.get('http://localhost:8080/viewEvents')
        .then(result=>{
            console.log(result.data)
            removeButtonStyle()
            setEvents(result.data)
        })
        .catch(err=>{
            removeButtonStyle()
            setEvents('Error')
        })
    }
    let eventImage; //contain the selected image file for uploading the event
    const getEventImageFile=(e)=>{
        eventImage=e.target.files[0];
    }
    //applyButtonStyle - give style to button when uploading.
    const applyButtonStyle=()=>{
        document.getElementsByClassName('addEventform_button')[0].innerHTML="ADDING...";
        document.getElementsByClassName('addEventform_button')[0].style.opacity='0.5';
    }
    //removeButtonStyle - remove button style when we got datas or got error from backend
    const removeButtonStyle=()=>{
        document.getElementsByClassName('addEventform_button')[0].innerHTML="Add Event";
        document.getElementsByClassName('addEventform_button')[0].style.opacity='1';
    }
    //show some message when something went wrong in posting a event.
    const removeAlertMessage=()=>{
        document.getElementById('addEvent_alert').innerHTML="";
    }
    //This show the hidden form used to post a event
    const show_addEventForm=()=>{
        document.getElementById('event_name').value="";
        document.getElementById('event_date').value="";
        document.getElementById('event_image').value="";
        document.getElementById('addEvent_blurBackground').style.display='block';
        document.getElementById('addEvent_form').style.display='block';
    }
    //This remove the post form when event posted successfully
    const remove_addEventForm=()=>{
        document.getElementById('addEvent_blurBackground').style.display='none';
        document.getElementById('addEvent_form').style.display='none';
    }
    //submit_addevent - submit the add Event form to backend and send mail to everyone about the event
    const submit_addEvent=(e)=>{
        e.preventDefault()
        removeAlertMessage();
        applyButtonStyle()
        const formData = new FormData();
        formData.append('name', document.getElementById('event_name').value);
        formData.append('date_of_event',document.getElementById('event_date').value);
        formData.append('event_image',eventImage);
        axios.post('http://localhost:8080/addEvents',formData)
        .then(result=>{
            getEvents()
            remove_addEventForm()
        })
        .catch(err=>{
            document.getElementById('addEvent_alert').innerHTML=err.response.data;
        })
    }
    //delete_event - used to delete a event
    const delete_event=(id,index)=>{
        document.getElementsByClassName('delete_event')[index].innerHTML='Deleting';
        document.getElementsByClassName('delete_event')[index].style.opacity='0.5';
        axios.delete(`http://localhost:8080/deleteEvent/${id}`)
        .then(res=>{
            document.getElementsByClassName('delete_event')[index].innerHTML='Delete';
            document.getElementsByClassName('delete_event')[index].style.opacity='1';
            getEvents()
        })
        .catch(err=>{
            document.getElementsByClassName('delete_event')[index].innerHTML='Delete';
            document.getElementsByClassName('delete_event')[index].style.opacity='1';
            alert(err.response.data)
        })
    }
    //cancel_event - cancel the event and sent mail to everyone
    const cancel_event=(id,index)=>{
        document.getElementsByClassName('cancel_event')[index].innerHTML='Cancelling';
        document.getElementsByClassName('cancel_event')[index].style.opacity='0.5';
        axios.delete(`http://localhost:8080/cancelEvent/${id}`)
        .then(res=>{
            document.getElementsByClassName('cancel_event')[index].innerHTML='Cancel';
            document.getElementsByClassName('cancel_event')[index].style.opacity='1';
            alert(res.data)
            getEvents()
        })
        .catch(err=>{
            document.getElementsByClassName('cancel_event')[index].innerHTML='Cancel';
           document.getElementsByClassName('cance;_event')[index].style.opacity='1';
            alert(err.response.data)
        })
    }
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    return(
        <div id="AddEvent_Section">
            {events==='loading' &&
                <div className="loadingEvent ">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }
            {events==='Error' &&
                <div id='eventError'>Error Occurred</div>
            }
            {(events!=='loading' && events!=='Error') &&
            <>
            <div id='eventtable_section'>  
                <table className='addEvent_table'>
                <caption id='eventtable_caption'>Current Events</caption>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Event Image</th>
                            <th>Action</th>
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
                                        <td><button type='button' className='delete_event commonUpdateDeleteButton' onClick={()=>cancel_event(datas._id,index)}>Cancel</button><button type='button' className='cancel_event commonUpdateDeleteButton' onClick={()=>delete_event(datas._id,index)}>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </>
                        }
                    </tbody>
                </table>
            </div>
            <button type='button' className='addEvent common_submitButton' onClick={show_addEventForm}>Add Event</button>
            </>
            }
            <div id='addEvent_blurBackground'></div>
                <form id='addEvent_form' className='commonUpdate_form' onSubmit={submit_addEvent}>
                    <div id='close_addEvent' className='commonClose_button' onClick={remove_addEventForm}>✕</div>
                    <h2>Add Event</h2>
                    <div>
                        <label htmlFor="event_name">Name</label>
                        <input type="text" id='event_name' required autoComplete='off' /> 
                    </div>
                    <div>
                        <label htmlFor="event_date">Date</label>
                        <input type="date" id='event_date' required /> 
                    </div>
                    <div>
                        <label htmlFor="event_image">Event Image</label>
                        <input type="file" id='event_image' required onChange={getEventImageFile} /> 
                    </div>
                    <div id='addEvent_alert' className='alert_msg'></div>
                    <button type='submit' className='addEventform_button common_submitButton'>Add Event</button>
                </form>
        </div>
    )
}