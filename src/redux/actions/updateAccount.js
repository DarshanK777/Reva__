import axios from 'axios'
import { UPDATED_USER, UPDATE_USER_ERROR, UPDATING_USER,
        UPDATED_PASSWORD, UPDATING_PASSWORD, UPDATE_PASSWORD_ERROR,
        SENDING_FOLLOW_REQUEST, REQUEST_SENT_ERROR, REQUEST_SENT_SUCCESFULL } from './actionTypes'
import {PORT_NO} from '../../utils/sense'  
  

// LOAD TOKEN FUNCTION
export const tokenConfig = (getState) => {

const token = getState().token;

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
export const updateUserData = (username, firstname, lastname, bio) => (dispatch, getState) =>{ // gender to be added
    dispatch({type: UPDATING_USER})

    axios.patch(`${PORT_NO}/api/user/`,{
        username: username,
        first_name: firstname,
        last_name: lastname,
        bio : bio
    }, tokenConfig(getState))
    .then((res) =>{
        dispatch({type: UPDATED_USER})
    })
    .catch((err)=>{
        console.log(err.response.data)
        dispatch({type: UPDATE_USER_ERROR})
    })

}

export const updatePassword = (oldPassword, newPassword1, newPassword2) => (dispatch, getState) =>{
    dispatch({ type: UPDATING_PASSWORD})

    axios.post(`${PORT_NO}/rest-auth/password/change/`, {
        old_password : oldPassword,
        new_password1: newPassword1,
        new_password2:newPassword2
    }, tokenConfig(getState))
    .then((res) =>{
        dispatch({
            type: UPDATED_PASSWORD
        })
    })
    .catch((err)=>{
        console.log(err.response.data)
        dispatch({type: UPDATE_PASSWORD_ERROR})
    })
}

export const updateEmail = (email) => (dispatch, getState) =>{ // gender to be added
    dispatch({type: UPDATING_USER})

    axios.patch(`${PORT_NO}/api/user/`,{
        email : email
    }, tokenConfig(getState))
    .then((res) =>{
        dispatch({type: UPDATED_USER})
    })
    .catch((err)=>{
        console.log(err.response.data)
        dispatch({type: UPDATE_USER_ERROR})
    })
}

export const sendFollowRequest = (userid) => (dispatch, getState) =>{
    dispatch({type: SENDING_FOLLOW_REQUEST})

    axios.post(`${PORT_NO}/api/friends/`, {
        userid: userid,
        accepted: 'True',
    }, tokenConfig(getState))
    .then((res)=>{
        dispatch({
            type: REQUEST_SENT_SUCCESFULL
        })
    })
    .catch((err)=>{
        console.log(err.response.data)
        dispatch({
            type: REQUEST_SENT_ERROR
        })
    })
}