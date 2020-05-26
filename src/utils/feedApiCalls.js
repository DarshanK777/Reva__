import {store} from '../index'
import axios from 'axios'
import {PORT_NO} from './sense'

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


export const getMainFeed = async () =>{
    try{
        const res = await  axios.get(`${PORT_NO}/api/posts/mainFeed/`, tokenConfig());
        return res.data
    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        } 
    }
}

export const getNextMainFeed = async (link) =>{
    try{
        const res = await axios.get(link, tokenConfig());
        return res.data

    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        } 
    }
}


export const getUserFeed = async (pk) =>{
    try{
        
        const res = await axios.get(`${PORT_NO}/api/posts/listCreate/${pk}`, tokenConfig());
        return res.data

    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        } 
    }
}


export const getUserNextFeed = async (link) =>{
    try{
        const res = await axios.get(link, tokenConfig());
        return res.data

    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        } 
    }
}


export const searchFeedUser = async (value) =>{
    try{
        const res = await axios.get(`${PORT_NO}/api/users?search=${value}`,tokenConfig());
        return res.data

    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        } 
    }
    
}


export const searchFeedNextUser = async (link) =>{
    try{
        const res = await axios.get(link,tokenConfig());
        return res.data

    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        } 
    }
    
}
  
  
export const likeSystemApi = async (id) =>{
    try{
        const res = await axios.post(`${PORT_NO}/api/posts/likePost/${id}/`, null, tokenConfig());
        return res.data
    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        } 
    }
}


export const getPostComment = async (imageId) =>{

    try{
        const res = await axios.get(`${PORT_NO}/api/posts/commentsFeed/${imageId}`,tokenConfig())
        return res.data
    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        }
    }
  
  }

  
export const postComment = async (imageId, comment_content) =>{
  
    try{
        await axios.post(`${PORT_NO}/api/posts/commentsFeed/${imageId}/`,{
            comment_content
        }, tokenConfig())
        return getPostComment(imageId)
    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        }
    }
  
}


export const deletePost = async (postId) =>{
    try{
        const res = await axios.delete(`${PORT_NO}/api/posts/ListUpdate/${postId}/`, tokenConfig())
        return res.data
    }catch(error){
        if (error.response) {
            return {
                errors : error.response.data
            }
        }
    }
}

export const editComment = async (commentId, comment_content) =>{
    try{
        const res = await axios.patch(`${PORT_NO}/api/posts/commentEdit/${commentId}/`, {
            comment_content
        },tokenConfig())
        return res.data
    }catch(error){
        if(error.response){
            return{
                errors : error.response.data
            }
        }
    }
}

export const deleteComment = async (commentId) =>{
    try{
        const res = await axios.delete(`${PORT_NO}/api/posts/commentEdit/${commentId}/`, tokenConfig())
        return res.data
    }catch(error){
        if(error.response){
            return{
                errors : error.response.data
            }
        }
    }
}