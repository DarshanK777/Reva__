import {USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS, POST_SUCCESS, POST_FAIL, FEED_LOADING, FEED_LOADED} from '../actions/actionTypes'
import { loadUser } from '../actions/auth';

const intialState = {
    token : localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    errors: null,
    feedloaded: null
    //make a different reducer
    // postUploaded: null
};

export default function(state=intialState, action){
    switch(action.type){
        case USER_LOADING:
        
            return{
                ...state,
                isLoading: true,
                // postUploaded: null
            }

        case USER_LOADED:
            return{
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.key)  
            return{
                ...state,
                token: action.payload.key,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false,
                errors: null
            }

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token")
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                isLoading: false,
                errors: action.payload
            }

        case FEED_LOADED:
            return{
                ...state,
                feedloaded: true,
                userPosts: action.payload
            }
        
        case FEED_LOADING:
            return{
                ...state,
            }
        
        default:
            return state
    }
}