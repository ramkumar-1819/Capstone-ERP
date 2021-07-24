import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';

export default function ViewBookPage(props){
    //books - hold list of books that student borrowed.
    const[books,setBooks]=useState([]);
    //get books based on student id.
    useEffect(()=>{
        if(props.student!==""){
        axios.get(`http://localhost:8080/books/${props.student._id}`)
        .then(book=>{
            console.log(book.data)
            setBooks(book.data)
        })
        .catch(err=>alert(err.response.data))
        }
    },[props.student])
    //whenever visiting this page gives a default value to everything.
    useEffect(()=>{
        setEverythingDefault()
    })
    const setEverythingDefault=()=>{
        const bookCode=document.getElementsByClassName('viewBookCode');
        const bookName=document.getElementsByClassName('viewBookName');
        const returnDate=document.getElementsByClassName('viewBookreturnDate');
        if(bookCode[0]!==undefined){
            for(let allBooks=0;allBooks<bookCode.length;allBooks++){
                bookCode[allBooks].value=books[allBooks].bookCode
                bookName[allBooks].value=books[allBooks].bookName
                returnDate[allBooks].value=books[allBooks].returnDate
            }
        }
    }
    //ViewBookHomePage() - return to home page of viewbook.
    const ViewBookHomePage=()=>{
        document.getElementById('viewBookSection').style.display='flex';
        document.getElementById('viewBookPage').style.display='none';
        setEverythingDefault()
    }
    //updateBooks() - used to update a books.
    const updateBooks=(index,id)=>{
        const bookCode=document.getElementsByClassName('viewBookCode')[index];
        const bookName=document.getElementsByClassName('viewBookName')[index];
        const returnDate=document.getElementsByClassName('viewBookreturnDate')[index];
        if(bookCode.value===""){
            alert('Enter the Book Code');
            bookCode.focus()
            return
        }
        if(bookName.value===""){
            alert('Enter the Book Name');
            bookName.focus()
            return
        }
        if(returnDate.value===""){
            alert('Enter the Return Date');
            returnDate.focus()
            return
        }
        const[...copyBooks]=books;
        axios.patch(`http://localhost:8080/books/${id}`,{
            bookCode:bookCode.value,
            bookName:bookName.value,
            returnDate:returnDate.value
        })
        .then(success=>{
            console.log(success.data)
            alert('Updated Successfully')
            copyBooks[index]=success.data;
            setBooks(copyBooks)
        })
        .catch(err=>alert(err.response.data))
    }
    return(
        <>
            <button className='common_submitButton' id='backButtonBook' onClick={ViewBookHomePage}>BACK</button>
            <div id='librarianStudentDetails'>
                <div>Name : {props.student.name}</div>
                <div>Register Number : {props.student.register_number}</div>
                <div>Department : {props.student.department}</div>
                <div>Semester : {props.student.semester}</div>
                <div>Section : {props.student.section}</div>
            </div>
            <div id='studentBookList' className='common_bookTable'>
                <table>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Book Code</th>
                            <th>Book Name</th>
                            <th>Issued Date</th>
                            <th>Return Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td><input type="text" className='viewBookCode'/></td>
                                    <td><input type="text" className='viewBookName'/></td>
                                    <td>{book.issueDate}</td>
                                    <td><input type="date" className='viewBookreturnDate'/></td>
                                    <td><button className='common_submitButton' onClick={()=>updateBooks(index,book._id)}>UPDATE</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}