import {USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS, FEED_LOADING, FEED_LOADED,
        MAINFEED_LOADED, MAINFEED_LOADING, STALK_USER, STALK_LOADING
} from '../actions/actionTypes'

const intialState = {
    token : localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    errors: null,
    feedloaded: null,
    mainFeed: '',
    stalkUser: null,
    userPosts: '',
    mainFeedData: ''
};

export default function(state=intialState, action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading: true,
                
            }

        case USER_LOADED:
            return{
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload,
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
                userPosts: [
                    ...state.userPosts,
                    ...action.payload.results
                ],
                count: action.payload.count,
                next: action.payload.next !== null ? action.payload.next : false,
                previous: action.payload.previous ? action.payload.previous : false
            }
        
        case FEED_LOADING:
        case MAINFEED_LOADING:
        case STALK_LOADING:
            return{
                ...state,
            }
        
        case MAINFEED_LOADED:
            return{
                ...state,
                mainFeed: true,
                mainFeedData:[
                    ...state.mainFeedData,
                    ...action.payload.results
                ],
                mainCount: action.payload.count,
                mainNext: action.payload.next !== null ? action.payload.next : false,
                mainPrevious: action.payload.previous ? action.payload.previous : false
            }
        

        case STALK_USER:
            return{
                ...state,
                stalkUser:true,
                userData: action.payload,
                
            }
        default:
            return state
    }
}