import axios from "axios"

export const adminVerify=()=>(dispatch)=>{       
    axios.get("http://localhost:8080/VerifyUser",{withCredentials:true})
        .then(res=>{
            dispatch({type:"Success",payload:res.data})  
        })
        .catch(err=>{
            dispatch({type:"Failure",payload:err.response.data})
        })
}