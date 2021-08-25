import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
  POST_LOADED_FAIL,
  POST_LOADED_SUCCESS,

} from "../contexts/contants";

export const PostReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postsLoading: false,
      };
    case POST_LOADED_FAIL:
      return {
        ...state,
        posts: payload,
        postsLoading: false,
      };
    case ADD_POST:
      
      return {
        ...state,
        posts: [...state.posts,  payload]
      }; 
        case DELETE_POST:
          const deletePost= state.posts.filter(post=>(post._id !==payload ))
      return {
        ...state,
        posts:deletePost
      };
    case FIND_POST:
          return{
              ...state,
              post:payload
          }

   case UPDATE_POST:
          const newPost = state.posts.map(post=>{
            return post._id === payload._id ? payload : post
         
          })
      return {
        ...state,
        posts:newPost         
      };
    default:
      return state;
  }
};
