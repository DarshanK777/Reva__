import axios from 'axios'
import{
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './actionTypes'


// lOAD USER
export const loadUser = () => (dispatch, getState) =>{
    dispatch({ type: USER_LOADING});

    axios.get('http://127.0.0.1:8000/api/user/', tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: USER_LOADED,
            payload: res.data
    });
    }).catch(err=>{
        console.log(err.response.data)
        dispatch({
            type: AUTH_ERROR,

        })
    })
}

// LOGIN
export const login = (username, password) => (dispatch) =>{
    
    const config = {
        header:{
            'Content-Type' : 'application/json'
        }
    }

    axios.post('http://127.0.0.1:8000/rest-auth/login/', {
        username,
        password,
    }, config)
    .then(res =>{
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
    });
    }).catch(err=>{
        console.log(err.data)
        dispatch({
            type: LOGIN_FAIL,

        })
    })
}

// REGISTER
export const register = (username,email, password1, password2) => (dispatch) =>{
    
    const config = {
        header:{
            'Content-Type' : 'application/json'
        }
    }

    axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
        username,
        email,
        password1,
        password2
    }, config)
    .then(res =>{
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
    });
    }).catch(err=>{
        console.log(err.data)
        dispatch({
            type: LOGIN_FAIL,

        })
    })
}

// LOGOUT
export const logout = () => (dispatch, getState) =>{

    axios
    .post('http://127.0.0.1:8000/rest-auth/logout/', null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: 'CLEAR_LEADS' });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}


// LOAD TOKEN FUNCTION
export const tokenConfig = (getState) => {
    
    const token = getState().token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  
    return config;
  };