//userreducer - set the loggedin user ID in store.
const userReducer=(state='loading',action)=>{
    switch(action.type){
        case 'Success':
            return {user:"Success",data:action.payload}
        case 'Failure':
            return {user:"Invalid",data:action.payload}
        case 'Logout':
            return 'loading'
        default:
            return state
    }
}
export default userReducer;