import {store} from '../index'
import axios from 'axios'
import {PORT_NO} from './sense'


// const token = localStorage.getItem("token")

export const tokenConfig = () => {
    const state = store.getState()
    const token = state.token
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


export const getMainFeed = async () =>{
    try{
        const post = await  axios.get(`${PORT_NO}/api/posts/mainFeed/`, tokenConfig())
        return post.data

    }catch(err){
        return err
    }
}

export const getNextMainFeed = async (link) =>{
    try{
        const post = await axios.get(link, tokenConfig())
        return post.data

    }catch(err){
        return err
    }
}


export const getUserFeed = async (pk) =>{
    try{
        const post = await axios.get(`${PORT_NO}/api/posts/listCreate/${pk}`, tokenConfig())
        return post.data

    }catch(err){
        return err
    }
}


export const getUserNextFeed = async (link) =>{
    try{
        const post = await axios.get(link, tokenConfig())
        return post.data

    }catch(err){
        return err
    }
}


