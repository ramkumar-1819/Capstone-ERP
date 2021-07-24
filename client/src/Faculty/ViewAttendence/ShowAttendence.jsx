import React, { Component,useEffect,useState } from 'react';

export default function ShowAttendence(props){
    console.log(props.attendence)
    return(
        <div id='showAttendencePage'>
            {props.attendence.length===0 &&
            <h2>Empty</h2>
            }
            {(props.attendence[0]!=='loading' && props.attendence.length>0 )&&
                <div id='attendenceDetail'>
                    <div>{props.attendence[0].subjectCode} - {props.attendence[0].subjectName}</div>
                <table>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th id='studentNamehead'>Student Name</th>
                            <th>Register Number</th>
                            <th>TotalHours Done</th>
                            <th>TotalHours Present</th>
                            <th>TotolHours Absent</th>
                            <th id='studentPercentHead'>Attendence Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.attendence.map((data,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{data.student.name}</td>
                                    <td>{data.student.register_number}</td>
                                    <td>{data.totalLecturesDone}</td>
                                    <td>{data.attendedLectures}</td>
                                    <td>{data.totalLecturesDone-data.attendedLectures}</td>
                                    <td>{((data.attendedLectures/data.totalLecturesDone)*100).toFixed(2)} %</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
            }
        </div>
    )
}