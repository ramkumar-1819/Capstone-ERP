import React, { Component,useState,useEffect } from 'react';
import './ViewTimeTable.css';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';

export default function ViewTimeTable(){
    //studentID - hold the student reg.no.
    //timeTable - get the timetables uploaded by faculty.
    const studentId=useSelector(state=>state.user.data._id);
    const[timeTable,setTimeTable]=useState('loading')
    //useEffect - Fetch the timetable uploaded by faculty.
    useEffect(()=>{
        axios.get(`http://localhost:8080/StudentProfile/${studentId}`)
        .then(res=>{
            console.log(res)
            axios.post('http://localhost:8080/getTimeTable',{
            department:res.data.department,
            year:res.data.year,
            semester:res.data.semester,
            })
            .then(result=>{
                setTimeTable(result.data)
            })
            .catch(err=>alert(err.response.data))
        })
        .catch(err=>{
            console.log(err.response.data)
        })
    },[])
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Faculty_Navlinks=document.getElementById('Student_navbar').children;
        for(const links of Faculty_Navlinks){
            links.style.color='white';
        }
        Faculty_Navlinks[2].style.color='gray';
    },[])
    return(
        <div id='studentTimeTable'>
            {timeTable!=='loading' &&
                <>
                    <h1>TimeTables</h1>
                    {timeTable.length===0 &&
                        <div className='empty'>Empty</div>
                    }
                    {timeTable.length>0 &&
                        <div id='allTimeTables'>
                            {timeTable.map((data,index)=>{
                                return(
                                    <div key={index}>
                                        <div>{index+1} .</div>
                                        <div>{data.testName}</div>
                                        <a href={`http://localhost:8080/${data.timetable}`} target='blank'>Click here to View</a>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </>
            }
        </div>
    )
}