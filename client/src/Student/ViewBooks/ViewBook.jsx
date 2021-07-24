import React, { Component,useState,useEffect } from 'react';
import './ViewBook.css'
import axios from 'axios';
import {useSelector} from 'react-redux';
import ReactLoading from 'react-loading';

export default function StudentViewBook(){
    //books - hold the list of books that student borrowed.
    const[books,setBooks]=useState(['loading'])
    //studentId - logged in student ID.
    const studentId=useSelector(state=>state.user.data._id);
    //useEffect - to get list of books that he/she borrowed from library.
    useEffect(()=>{
        axios.get(`http://localhost:8080/StudentProfile/${studentId}`)
        .then(res=>{
            axios.get(`http://localhost:8080/books/${res.data._id}`)
            .then(success=>{
                setBooks(success.data)
            })
            .catch(err=>{
                console.log(err)
                alert(err.response.data)
            })
        })
        .catch(err=>alert(err.response.data))
    },[])
    //This UseEffect is used to change color of current Route in Navigation Bar.
    useEffect(()=>{
        const Faculty_Navlinks=document.getElementById('Student_navbar').children;
        for(const links of Faculty_Navlinks){
            links.style.color='white';
        }
        Faculty_Navlinks[5].style.color='gray';
    },[])
    const submitIssue=(e)=>{
        e.preventDefault()
        const bookCode=document.getElementById('issuebookCode');
        console.log(bookCode.value)
        
    }
    //type,color used for loading animation
    const type='spinningBubbles';
    const color='black';
    
    return(
        <div id='studentViewBook_Section'>
            {books[0]==='loading' &&
                <div className="booksLoading ">
                    <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
                </div>
            }
            {(books.length>0 && books[0]!=='loading') &&
            <div id='studentsBookTable'>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Book Code</th>
                            <th>Book Name</th>
                            <th>Issue Date</th>
                            <th>Return Date</th>
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
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            }
            {books.length===0 &&
                <div className='empty'>Empty</div>
            }
        </div>
    )
}