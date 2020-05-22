import {store} from '../index'
import axios from 'axios'
import {PORT_NO} from './sense'


// const token = localStorage.getItem("token")

export const tokenConfig = () => {
    const state = store.getState()
    const token = state.token
    const config = {
      headers: {
        'content-Type': 'application/json',
      },
    };
  
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  
    return config;
};



// UPDATE USER DETAILS
export const updateUserData = async (username, firstname, lastname, bio) => { // gender to be added

    try{
        const res = await axios.patch(`${PORT_NO}/api/user/`,{
            username: username,
            first_name: firstname,
            last_name: lastname,
            bio : bio
        }, tokenConfig())
        
        return res.data
    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        } 
    }
    
}


export const updatePassword = async (oldPassword, newPassword1, newPassword2) =>{
    
    try{
        const res = await axios.post(`${PORT_NO}/rest-auth/password/change/`, {
            old_password : oldPassword,
            new_password1: newPassword1,
            new_password2: newPassword2
        }, tokenConfig())
        
        return res.data
    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        } 
    }
}


export const updateEmail = async (email) => { // gender to be added

    try{
        const res = await axios.patch(`${PORT_NO}/api/user/`,{
            email : email
        }, tokenConfig())
        
        return res.data
    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        } 
    }
}