import axios from 'axios'
import { FEED_LOADED, FEED_LOADING, FEED_ERROR, POST_FAIL,
  POST_SUCCESS, MAINFEED_LOADING, MAINFEED_LOADED, MAINFEED_ERROR, NEXTFEED_LOADING, MAINNEXTFEED_LOADING } from './actionTypes'
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


// FEED LOAD INCOMPLETE
export const feedload = (pk) => (dispatch, getState) =>{
    dispatch({type: FEED_LOADING})
    axios.get(`${PORT_NO}/api/posts/listCreate/${pk}`, tokenConfig(getState))
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

export const loadNextFeed = (link) => (dispatch, getState) =>{
  dispatch({type: NEXTFEED_LOADING})
  
  axios.get(link, tokenConfig(getState))
  .then((res)=>{
      dispatch({
        type: FEED_LOADED,
        payload: res.data
  })
  }).catch(err=>{
    console.log(err)
    dispatch({
        type: FEED_ERROR,

    })
  })
}


// LOAD MAIN FEED  
export const loadMainFeed = () => (dispatch, getState) =>{
    dispatch({type: MAINFEED_LOADING})

    axios.get(`${PORT_NO}/api/posts/mainFeed/`, tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: MAINFEED_LOADED,
            payload: res.data
    });
    }).catch(err=>{
        console.log(err)
        dispatch({
            type: MAINFEED_ERROR,

        })
    })
}


export const loadNextMainFeed = (link) => (dispatch, getState) =>{
  dispatch({type: MAINNEXTFEED_LOADING})
  
  axios.get(link, tokenConfig(getState))
  .then((res)=>{
      dispatch({
        type: MAINFEED_LOADED,
        payload: res.data
  })
  }).catch(err=>{
    console.log(err)
    dispatch({
        type: MAINFEED_ERROR,

    })
  })
}


// UPLOAD IMAGE
export const postImage = (image, caption, user) => async (dispatch, getState) =>{

  console.log('this is executed')

  let formData = new FormData()
  formData.append('image', image)
  formData.append('caption', caption)

  try{
    const post = await axios.post(`${PORT_NO}/api/posts/createPost/`, formData, tokenConfig(getState))
    dispatch({type:POST_SUCCESS})
    dispatch(feedload(user))
    dispatch(loadMainFeed())
    return post.data.message

  }catch(err){
    dispatch({type: POST_FAIL})
    return err
  }

}