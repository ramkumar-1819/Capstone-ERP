import axios from "axios"

//studentVerify - verify the logged in student in valid or not.
export const studentVerify=(type)=>(dispatch)=>{       
    axios.get("http://localhost:8080/VerifyUser",{withCredentials:true})
        .then(res=>{
            if(res.data.type===type){
                dispatch({type:"Success",payload:res.data})
            }
            else{
                dispatch({type:"Failure",payload:res.data})
            }
        })
        .catch(err=>{
            dispatch({type:"Failure",payload:err.response.data})
        })
}