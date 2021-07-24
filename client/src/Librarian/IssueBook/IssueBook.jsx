import React, { Component,useEffect,useState } from 'react';
import './IssueBook.css';
import axios from 'axios';
import IssueBookPage from './IssueBookPage';

export default function IssueBook(){
    //semester - hold sem values based on year.
    //section - hold all the sections based on year,department,sem.
    //student - list of students.
    //selectedStudent - student selected to issue a book.
    const[semester,setSemester]=useState([])
    const[section,setSection]=useState([])
    const[students,setStudents]=useState([])
    const[selectedStudent,setSelectedStudent]=useState("")
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Librarian_Navlinks=document.getElementById('Librarian_navbar').children;
        for(const links of Librarian_Navlinks){
            links.style.color='white';
        }
        Librarian_Navlinks[2].style.color='gray';
    },[])
    //getSemester() - get Sems based on year.
    const getSemester=(e)=>{
        const sem=Number(e.target.value)+(Number(e.target.value)-1);
        document.getElementById('Semester').value='Select Semester';
        document.getElementById('section').value='Select Section';
        setSemester([sem,sem+1])
        setSection([])
    }
    //getSections() - get Sections based on dept,year,sem.
    const getSection=(e)=>{
        const studentDepartment=document.getElementById('department').value;
        const studentYear=document.getElementById('year').value;
        axios.get(`http://localhost:8080/getSections/${studentDepartment}/${studentYear}/${e.target.value}`)
            .then(section=>{
                setSection(section.data)
                document.getElementById('section').value='Select Section';
            })
            .catch(err=>{
                alert(err.response.data)
            })
    }
    //searchStudents() - search for list of students based on dept,year,sem,section.
    const searchStudents=(e)=>{
        e.preventDefault();
        const department=document.getElementById('department');
        const year=document.getElementById('year');
        const semester=document.getElementById('Semester');
        const section=document.getElementById('section');
        const alerter=document.getElementById('issueBookAlert');
        alerter.innerHTML="";
        if(department.value==='Select Department'){
            alerter.innerHTML='Select Department'
            return
        }
        if(year.value==='Select Year'){
            alerter.innerHTML='Select Year';
            return
        }
        if(semester.value==='Select Semester'){
            alerter.innerHTML='Select Semester';
            return
        }
        if(section.value==='Select Section'){
            alerter.innerHTML='Select Section';
            return
        }
        axios.post('http://localhost:8080/getStudents',{
            department:department.value,
            year:year.value,
            semester:semester.value,
            section:section.value
        })
        .then(students=>{
            setStudents(students.data)
        })
        .catch(err=>alert(err.response.data))
    }
    //issueBookSection() - get the selected student details and show the issueBook page.
    const issueBookSection=(student)=>{
        setSelectedStudent(student)
        document.getElementById('issueBookSection').style.display='none';
        document.getElementById('issueBookPage').style.display='block';
    }
    const changeEverything=()=>{
        document.getElementById('year').value='Select Year';
        document.getElementById('Semester').value='Select Semester';
        document.getElementById('section').value='Select Section';
    }
    return(
        <>
        <div id='issueBookSection' className='common_LibrarianBookSection'>
            <form id='searchStudent' onSubmit={searchStudents}>
                <div>
                    <label htmlFor="department">Select Department</label>
                    <select id="department" defaultValue='Select Department' onChange={changeEverything}>
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
                </div>
                <div>
                    <label htmlFor="year">Select Year</label>
                    <select id='year' defaultValue='Select Year' onChange={getSemester}>
                        <option value="Select Year" disabled>Select Year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="Semester">Select Semester</label>
                    <select id="Semester" defaultValue='Select Semester' onChange={getSection}>
                        <option value="Select Semester" disabled>Select Semester</option>
                        {semester.map((sem,index)=><option key={index} value={sem}>{sem}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor='section'>Select Section</label>
                    <select id='section' defaultValue='Select Section'>
                        <option value="Select Section" disabled>Select Section</option>
                        {section.map((data,index)=>{
                            return(
                               <option key={index} value={data}>{data}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <div className='alert_msg' id='issueBookAlert'></div>
                    <button type='submit' className='common_submitButton'>SEARCH</button>
                </div>
            </form>
            {students.length>0 &&
                <div id='studentsList'>
                    <table>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Register Number</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{student.register_number}</td>
                                        <td>{student.name}</td>
                                        <td><button type='button' className='common_submitButton' onClick={()=>issueBookSection(student)}>Issue Book</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
        <div id='issueBookPage' className='view_issue_returnBook'>
            <IssueBookPage student={selectedStudent}/>
        </div>
        </>
    )
}