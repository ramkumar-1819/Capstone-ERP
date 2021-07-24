import React, { Component,useEffect,useState } from 'react';
import './OurFaculties.css';
import EditFaculty from './EditFaculty';
import axios from 'axios';

export default function OurFaculties(props){
    //faculties - getAllFaculty details from backend
    //selectedFaculty - The faculty that is selected for update
    const[faculties,setFaculties]=useState(null)
    const[selectedFaculty,setSelectedfaculty]=useState([])
    console.log(selectedFaculty)
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Admin_Navlinks=document.getElementById('Admin_navbar').children;
        for(const links of Admin_Navlinks){
            links.style.color='white';
        }
        Admin_Navlinks[7].style.color='gray';
    },[])
    //applyButtonStyle,removeButtonStyle,changeEditButtonStyle,removeEditButtonStyle - Is used to give some style
    //to button used to fetch data from backend
    const applyButtonStyle=()=>{
        document.getElementById('SearchFaculties').innerHTML="FETCHING...";
        document.getElementById('SearchFaculties').style.opacity='0.5';
    }
    const removeButtonStyle=()=>{
        document.getElementById('SearchFaculties').innerHTML="SEARCH";
        document.getElementById('SearchFaculties').style.opacity='1';
    }
    
    //removeAlertMessage,removeEditAlertMessage - used to show some alert message if
    //something went wrong in dealing with api's
    const removeAlertMessage=()=>{
        document.getElementById('ourFaculty_alert').innerHTML="";
    }
    
    //admin_SearchFaculties - used to search for faculties based on selected department.
    //It too perform client side validation on forms
    const admin_SearchFaculties=(e)=>{
        e.preventDefault()
        applyButtonStyle()
        const alert_message=document.getElementById('ourFaculty_alert');
        const department=document.getElementById('admin_selectFacultyDepartment');
        if(department.value==='Select Department'){
            alert_message.innerHTML="Select Department"
            removeButtonStyle()
            department.focus()
            return
        }
        axios.post('http://localhost:8080/getFaculties',{
            department:department.value,
        })
        .then(result=>{
            removeButtonStyle()
            setFaculties(result.data)
        })
        .catch(err=>{
            document.getElementById('ourFaculty_alert').innerHTML=err.response.data;
            removeButtonStyle()
        })
    }
   
    //update_faculty - set the selected faculty in useState
    const update_faculty=(data)=>{
        setSelectedfaculty(data)
        document.getElementById('EditFaculty').style.display='block';
    }
    //delete_faculty - used to delete the selected faculty and update the faculties in useState
    const delete_faculty=(id)=>{
        axios.delete(`http://localhost:8080/deleteFaculty/${id}`)
        .then(result=>{
            axios.post('http://localhost:8080/getFaculties',{
            department:document.getElementById('admin_selectFacultyDepartment').value
            })
            .then(result=>{
                setFaculties(result.data)
                setSelectedfaculty([])
            })
            .catch(err=>{
                alert(err.response.data)
            })
        })
        .catch(err=>alert(err.response.data))
    }
    //Callback passed as a prop to EditFaculty component that set the new faculties with new Data after updation.
    const callBack=(data)=>{
        setFaculties(data)
        setSelectedfaculty([])
    }
    return(
        <div id="admin_OurFaculties_Section">
            <form id="admin_FacultySearch_Form" onSubmit={admin_SearchFaculties}>
                <label htmlFor="admin_selectFacultyDepartment">Department</label>
                <select id="admin_selectFacultyDepartment" defaultValue={'Select Department'} onChange={removeAlertMessage}>
                    <option value="Select Department" disabled>Select Department</option>
                    <option value="BioTech">BioTech</option>
                    <option value="Civil">Civil</option>
                    <option value="C.S.E">C.S.E</option>
                    <option value="E.C.E">E.C.E</option>
                    <option value="E.E.E">E.E.E</option>
                    <option value="IT">IT</option>
                    <option value="Mech">Mech</option>
                    <option value="M.B.A">M.B.A</option>
                </select>
                <div id="ourFaculty_alert" className='alert_msg'></div>
                <button type="submit" id="SearchFaculties" className='common_submitButton'>SEARCH</button>
            </form>
            {faculties!==null && 
                <div className='display_Faculties'>
                    <table id="admin_DisplayFaculties">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Register Number</th>
                                <th>Name</th>
                                <th>D.O.B</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faculties.map((datas,index)=>{
                                return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{datas.register_number}</td>
                                    <td>{datas.name}</td>
                                    <td>{datas.date_of_birth}</td>
                                    <td>{datas.email}</td>
                                    <td><button type='button' id='update_faculty' className='commonUpdateDeleteButton' onClick={()=>update_faculty(faculties[index])}>Update</button><button type='button' className='commonUpdateDeleteButton' id='delete_faculty' onClick={()=>delete_faculty(faculties[index]._id)}>Delete</button></td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                }
                <div id='EditFaculty'>
                        <EditFaculty faculty={selectedFaculty} callBack={callBack}/>
                </div>
        </div>
    )
}