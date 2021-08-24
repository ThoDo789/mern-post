import { createContext, useReducer, useState } from "react";
import { PostReducer } from "../reducers/PostReducer";
import { apiUrl, POST_LOADED_SUCCESS, POST_LOADED_FAIL } from "./contants";
import axios from "axios";
export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //state
  const [postState, dispatch] = useReducer(PostReducer, {
    post: [],
    postsLoading: true,
  });
  const [showAddPostModal, setShowAddPostModal] = useState(false);

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

  // post context data
  const postContextData = {
    postState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};
export default PostContextProvider;
