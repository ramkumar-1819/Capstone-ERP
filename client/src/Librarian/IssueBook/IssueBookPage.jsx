import axios from 'axios';
import React, { Component,useEffect,useState } from 'react';

export default function IssueBookPage(props){
    //books - hold the details of list of books going to issue.
    const[books,setBooks]=useState([{bookCode:"",bookName:"",returnDate:""}])
    //today - going to represent the min date as today in date I/P field.
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    const yyyy = today.getFullYear();
    if(dd<10){
    dd='0'+dd
    } 
    if(mm<10){
    mm='0'+mm
    } 
    today = yyyy+'-'+mm+'-'+dd;
    //addInput() - add a new book.
    const addInput=()=>{
        setBooks([...books,{bookCode:"",bookName:"",returnDate:""}])
    }
    //IssueBookHomePage() - when back button is clicked.
    const IssueBookHomePage=()=>{
        exiting()
        document.getElementById('issueBookSection').style.display='flex';
        document.getElementById('issueBookPage').style.display='none';
    }
    //removeBook() - when remove button clicked on addBook section
    const removeBook=(index)=>{
        const [...copyBooks]=books;
        copyBooks.splice(index,1)
        setBooks(copyBooks)
    }
    //exiting() - back back button clicked need to make everything to default value.
    const exiting=()=>{
        setBooks([{bookCode:"",bookName:"",returnDate:""}])
            for(let code of document.getElementsByClassName('bookCode')){
                code.value=""
            }
            for(let name of document.getElementsByClassName('bookName')){
                name.value=""
            }
            for(let date of document.getElementsByClassName('date')){
                date.value=""
            }
    }
    //issueBook() - will issue books to particular student
    const issueBook=()=>{
        const bookCode=document.getElementsByClassName('bookCode');
        const bookName=document.getElementsByClassName('bookName');
        const returnDate=document.getElementsByClassName('date');
        const alerter=document.getElementById('alerterIssueBook');
        alerter.innerHTML=""
        for(let code of bookCode){
            if(code.value===""){
                alerter.innerHTML='Enter the Book Code'
                code.focus()
                return
            }
        }
        for(let name of bookName){
            if(name.value===""){
                alerter.innerHTML='Enter the Book Name'
                name.focus()
                return
            }
        }
        for(let date of returnDate){
            if(date.value===""){
                alerter.innerHTML='Enter the Return Date'
                date.focus()
                return
            }
        }
        axios.post('http://localhost:8080/issueBook',{
           books:books,
           student:props.student._id
        })
        .then(ok=>{
            console.log(ok.data)
            alert(ok.data)
            exiting()
            IssueBookHomePage()
        })
        .catch(err=>{
            alert(err.response.data)
            const existedId=err.response.data.slice(err.response.data.indexOf(':')+1,);
            for(let code of bookCode){
                if(code.value===existedId){
                    code.focus()
                    break
                }
            }
        })
    }
    //setBookDetails() - hold all the details of book.
    const setBookDetails=(e,index,type)=>{
        console.log(e.target.value)
        const [...copyBooks]=books;
        const selectedData=copyBooks[index]
        selectedData[type]=e.target.value;
        copyBooks[index]=selectedData
        setBooks(copyBooks)
    }
    return(
        <>
        <button className='common_submitButton' id='backButtonBook' onClick={IssueBookHomePage}>BACK</button>
            <div id='librarianStudentDetails'>
                <div>Name : {props.student.name}</div>
                <div>Register Number : {props.student.register_number}</div>
                <div>Department : {props.student.department}</div>
                <div>Semester : {props.student.semester}</div>
                <div>Section : {props.student.section}</div>
            </div>
            <div id='issueBookTable' className='common_bookTable'>
                <table>
                    <thead>
                        <tr>
                            <th>Book Code</th>
                            <th>Book Name</th>
                            <th>Return Date</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((data,index)=>{
                            return(
                            <tr key={index}>
                                <td><input type="text" className='bookCode' onChange={(e)=>setBookDetails(e,index,"bookCode")}/></td>
                                <td><input type="text" className='bookName'onChange={(e)=>setBookDetails(e,index,"bookName")} /></td>
                                <td><input type="date" min={today} className='date' onChange={(e)=>setBookDetails(e,index,"returnDate")}/></td>
                                <td><button type='button' id='removeInput' onClick={()=>removeBook(index)}>✕</button></td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='alert_msg' id='alerterIssueBook'></div>
            <button type='button' className='common_submitButton' onClick={addInput}>ADD+</button>
            <button type='button' className='common_submitButton' onClick={issueBook}>ISSUE</button>
        </>
    )
}