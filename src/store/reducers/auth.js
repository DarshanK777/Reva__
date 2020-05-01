import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const intialState = {
    token: null,
    error: null,
    loading: false,
}

const authStart = (state, action) =>{
    return updatedObject(state, {
        error: null,
        loading: true
    })
}

const authSuccess = (state, action) =>{
    return updatedObject(state, {
        loading: false,
        token: action.token,
        error: null
    }) 
}


const authFail = (state, action) =>{
    return updatedObject(state, {
        loading: false,
        error: action.error,   
    }) 
}

const authLogout = (state, action) =>{
    return updatedObject(state, {
        token: null,
        isLoggedIn: false,
    })
}

const reducer = (state = intialState, action ) =>{
    switch(action.type){
        case actionTypes.AUTH_START : return authStart(state, action)
        case actionTypes.AUTH_SUCCESS : return authSuccess(state, action)
        case actionTypes.AUTH_FAIL : return authFail(state, action)
        case actionTypes.AUTH_LOGOUT : return authLogout(state, action)
        default:
            return state
    }
}

export default reducer