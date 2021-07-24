import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';

export default function ReturnBookPage(props){
    //books - hold the list of books that user is going to return.
    const[books,setBooks]=useState([]);
    //useEffect - get the list of books that student borrowed from library.
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
    //useEffect -  when visiting this page make everything to default.
    useEffect(()=>{
        const returnedBooks=document.getElementsByClassName('selectedBooks');
        for(let book of returnedBooks){
            book.checked=false
        }
    })
    //ReturnBookHomePage() - when back button is clicked we are taken to return book home page.
    const ReturnBookHomePage=()=>{
        document.getElementById('returnBookSection').style.display='flex';
        document.getElementById('returnBookPage').style.display='none';
        const returnedBooks=document.getElementsByClassName('selectedBooks');
        for(let index=0;index<returnedBooks.length;index++){
            returnedBooks[index].checked=false
        }
    }
    //returnBook() - used to return the books that student borrowed.
    const returnBook=()=>{
        const indexes=[];
        const bookIds=[];
        const returnedBooks=document.getElementsByClassName('selectedBooks');
        for(let index=0;index<returnedBooks.length;index++){
            if(returnedBooks[index].checked){
                indexes.push(index)
                bookIds.push(books[index]._id)
            }
        }
        axios.post(`http://localhost:8080/deleteBooks`,{
            Ids:bookIds
        })
        .then(success=>{
            alert(success.data)
            const [...copyBooks]=books;
            for(let books of indexes){
                delete copyBooks[books]
            }
            const newBooks=copyBooks.filter(value=>value!==undefined)
            setBooks(newBooks)
        })
        .catch(err=>alert(err.response.data))
    }
    return(
        <>
            <button className='common_submitButton' id='backButtonBook' onClick={ReturnBookHomePage}>BACK</button>
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
                                    <td>{book.bookCode}</td>
                                    <td>{book.bookName}</td>
                                    <td>{book.issueDate}</td>
                                    <td>{book.returnDate}</td>
                                    <td><input type='checkbox' className='selectedBooks'/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <button type='button' className='common_submitButton' onClick={returnBook}>RETURN</button>
        </>
    )
}