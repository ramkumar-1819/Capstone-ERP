import React, { Component,useEffect,useState } from 'react';
import axios from 'axios';

export default function Results(props){
    //marks hold student ids and marks to update marks.
    const[marks,setMarks]=useState({})
    //set the existing marks as default mark to I/P field.
    useEffect(()=>{
        if(props.result[0]!=='loading' && props.result.length>0){
            let mark=document.getElementsByClassName('studentMark');
            for(let index=0;index<mark.length;index++){
                mark[index].value=props.result[index].marksObtained
            }
        }
    },[props.result]) 
    //UpdateMarks() - update the marks to student in DB.
    const updateMarks=()=>{
        axios.put('http://localhost:8080/updateResult',{
           ids_marks:marks
        })
        .then(result=>{
            alert(result.data);
            props.callBack()
        })
        .catch(err=>{
            console.log(err)
            alert(err.response.data)
        })
    }
    //deleteMarks() - used to delete the student marks.
    const deleteMarks=()=>{
        const ids=[]
        for(let id of props.result){
            ids.push(id._id)
        }
        console.log(ids)
        axios.post('http://localhost:8080/deleteResult',{
            ids:ids
        })
        .then(result=>{
            alert(result.data);
            props.callBack()
        })
        .catch(err=>{
            console.log(err)
            alert(err.response.data)
        })
    }
    //setAllMarks() - set the marks with student id.
    const setAllMarks=(index,ids)=>{
        setMarks({...marks,[ids]:document.getElementsByClassName('studentMark')[index].value})
    }
    return(
        <div id='showResultPage'>
            {props.result.length===0 &&
            <h2>Empty</h2>
            }
            {(props.result[0]!=='loading' && props.result.length>0 )&&
            <>
                <div id='resultDetail'>
                    <div>{props.result[0].subjectCode} - {props.result[0].subjectName}</div>
                <table>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th id='studentNamehead'>Student Name</th>
                            <th>Register Number</th>
                            <th>Marks Obtained</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.result.map((data,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{data.student.name}</td>
                                    <td>{data.student.register_number}</td>
                                    <td><input type='number' className='studentMark' onChange={()=>setAllMarks(index,data._id)} ></input> /{data.totalMark}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
                <div id='result_updateDelete'>
                    <button type='button' className='common_submitButton' onClick={updateMarks}>Update All</button>
                    <button type='button' className='common_submitButton' onClick={deleteMarks}>Delete All</button>
                </div>
            </>
            }
        </div>
    )
}