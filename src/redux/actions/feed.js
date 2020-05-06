import axios from 'axios'
import { FEED_LOADED, FEED_LOADING, FEED_ERROR, POST_FAIL,
  POST_SUCCESS } from './actionTypes'
import { Redirect } from 'react-router-dom';
import { loadUser } from './auth'

// LOAD TOKEN FUNCTION
export const tokenConfig = (getState) => {
    
  const token = getState().token;

  const config = {
    headers: {
      'content-Type': 'multipart/form-data',
    },
  };

  
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};


// FEED LOAD INCOMPLETE
export const feedload = () => (dispatch, getState) =>{
    dispatch({type: FEED_LOADING})

    axios.get('http://127.0.0.1:8000/api/posts/listCreate/', tokenConfig(getState))
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
  

// UPLOAD IMAGE
export const postImage = (image, caption) => async (dispatch, getState) =>{

  console.log('this is executed')

  let formData = new FormData()
  formData.append('image', image)
  formData.append('caption', caption)

  try{
    const post = await axios.post('http://127.0.0.1:8000/api/posts/listCreate/', formData, tokenConfig(getState))
    dispatch({type:POST_SUCCESS})
    return post.data.message

  }catch(err){
    dispatch({type: POST_FAIL})
    return err
  }

}