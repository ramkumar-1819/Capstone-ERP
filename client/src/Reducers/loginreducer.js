//loginReducer used to set the new loggedin user in store.
const loginReducer=(state='Login',action)=>{
    switch(action.type){
        case 'Student':
            return 'Student';
        case 'Faculty':
            return 'Faculty';
        case 'Librarian':
            return 'Librarian';
        case 'Admin':
            return 'Admin';
        default:
            return 'Login'
    }
}
export default loginReducer;