import React, { Component,useEffect,useState } from 'react';
import './OurLibrarians.css';
import axios from 'axios';
import ReactLoading from 'react-loading';
import EditLibrarian from './EditLibrarians';

export default function OurLibrarians(props){
    //librarian - hold all librarians.
    //selectedLibrarian - hold the particular librarian details to edit.
    const[librarians,setLibrarians]=useState('loading')
    const[selectedLibrarian,setSelectedlibrarian]=useState([])
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Admin_Navlinks=document.getElementById('Admin_navbar').children;
        for(const links of Admin_Navlinks){
            links.style.color='white';
        }
        Admin_Navlinks[8].style.color='gray';
        //get All librarians from backend.
        axios.get('http://localhost:8080/getLibrarians')
        .then(result=>{
            console.log(result)
            setLibrarians(result.data)
        })
        .catch(err=>{
            console.log(err.response.data)
            setLibrarians('Error')
        })
    },[])
    //update_faculty - set the selected faculty in useState
    const update_librarian=(data)=>{
        setSelectedlibrarian(data)
        document.getElementById('EditLibrarian').style.display='block';
    }
    //delete_faculty - used to delete the selected faculty and update the faculties in useState
    const delete_librarian=(id)=>{
        axios.delete(`http://localhost:8080/deleteLibrarian/${id}`)
        .then(result=>{
            axios.get('http://localhost:8080/getLibrarians')
            .then(result=>{
                setLibrarians(result.data)
                setSelectedlibrarian([])
            })
            .catch(err=>{
                alert(err.response.data)
            })
        })
        .catch(err=>alert(err.response.data))
    }
    const callBack=(data)=>{
        setLibrarians(data)
        setSelectedlibrarian([])
    }
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    return(
        <div id="admin_OurLibrarians_Section">
            {librarians==='loading' &&
                <div className="loadingLibrarian">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }
            {librarians==='Error' && 
                  <div id="errorHandler">Server Error</div>
                }
            {(librarians!=='loading' && librarians!=='Error') &&
                <div className='display_Librarians'>
                    <table id="admin_DisplayLibrarians">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Register Number</th>
                                <th>Name</th>
                                <th>Date Of Birth</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {librarians.map((datas,index)=>{
                                return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{datas.register_number}</td>
                                    <td>{datas.name}</td>
                                    <td>{datas.date_of_birth}</td>
                                    <td>{datas.email}</td>
                                    <td><button type='button' id='update_librarian' className='commonUpdateDeleteButton' onClick={()=>update_librarian(librarians[index])}>Update</button><button type='button' id='delete_librarian' className='commonUpdateDeleteButton' onClick={()=>delete_librarian(librarians[index]._id)}>Delete</button></td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                }
                <div id='EditLibrarian'>
                    <EditLibrarian librarian={selectedLibrarian} callBack={callBack}/>
                </div>
        </div>
    )
}