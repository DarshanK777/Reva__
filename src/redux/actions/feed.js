import axios from 'axios'
import { POST_FAIL,
  POST_SUCCESS, POSTING_COMMENT, COMMENT_POSTED, COMMENT_ERROR,
  RETRIEVING_SEARCH_USERS,  SEARCH_USERS_RETRIEVED, 
 
} from './actionTypes'
import {PORT_NO} from '../../utils/sense'

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

// UPLOAD IMAGE
export const postImage = (image, caption) => async (dispatch, getState) =>{

  console.log('this is executed')

  let formData = new FormData()
  formData.append('image', image)
  formData.append('caption', caption)

  try{
    const post = await axios.post(`${PORT_NO}/api/posts/createPost/`, formData, tokenConfig(getState))
    dispatch({type:POST_SUCCESS})
    return post.data.message

  }catch(err){
    dispatch({type: POST_FAIL}) 
    return err
  }

}



export const postComments = (imageId, comment_content) => (dispatch, getState) =>{

  dispatch({type: POSTING_COMMENT})

  const token = getState().token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

  axios.post(`${PORT_NO}/api/posts/commentsFeed/${imageId}/`, { 
        comment_content
      }, config)
  .then((res)=>{
      dispatch({
        type: COMMENT_POSTED,
        payload: res.data
      })
  }).catch((error)=>{
      dispatch({
        type: COMMENT_ERROR,
      })
      console.log(error)
  })

}

export const searchFeedUser = (value) => (dispatch, getState) =>{

  dispatch({type: RETRIEVING_SEARCH_USERS})

  axios.get(`${PORT_NO}/api/users?search=${value}`,tokenConfig(getState))
  .then((res)=>{
    dispatch(
      {
        type: SEARCH_USERS_RETRIEVED,
        payload: res.data
      }
    )
  })


}

