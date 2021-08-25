import { createContext, useReducer, useState } from "react";
import { PostReducer } from "../reducers/PostReducer";
import {
  apiUrl,
  POST_LOADED_SUCCESS,
  POST_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,FIND_POST
} from "./contants";
import axios from "axios";
export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //state
  const [postState, dispatch] = useReducer(PostReducer, {
    posts: [],
    postsLoading: true,
    post:null
  });
  //stateShow layout trigger
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({show:false, message:'', type:null});

  //get all post
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: POST_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: POST_LOADED_FAIL });
    }
  };
  // add post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error!!" };
    }
  };
  // delete post
  const deletePost = async(postId)=>{
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`)
      if(response.data.success){
        dispatch({type:DELETE_POST, payload:postId})
      }
    } catch (error) {
      console.log(error)
      
    }
  }

//find post when user  updating post
const findPost = postId =>{
  const post = postState.posts.find(post=>post._id === postId) 
  console.log(post,"find post")
  dispatch({type:FIND_POST, payload:post})
}


//update post
const updatePost = async(updatePost) =>{
  try {
    const response = await axios.put(`${apiUrl}/posts/${updatePost._id}`,updatePost);
    if(response.data.success){
      dispatch({type:UPDATE_POST, payload:response.data.post})
      return response.data
    }
  } catch (error) {
    return error.response.data
      ? error.response.data
      : { success: false, message: "Server Error!!" };
  }
}




  // post context data
  const postContextData = {
    postState,
    getPosts,
    showAddPostModal,
    showUpdatePostModal,
    setShowAddPostModal,
    setShowUpdatePostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,

    
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};
export default PostContextProvider;
