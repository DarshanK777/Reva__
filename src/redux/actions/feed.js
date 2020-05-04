import axios from 'axios'
import { FEED_LOADED, FEED_LOADING, FEED_ERROR } from './actionTypes'

export const feedload = () => (dispatch, getState) =>{
    dispatch({type: FEED_LOADING})

    axios.get('http://127.0.0.1:8000/api/user/posts/', tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: FEED_LOADED,
            payload: res.data
    });
    }).catch(err=>{
        console.log(err)
        dispatch({
            type: FEED_ERROR,

        })
    })
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