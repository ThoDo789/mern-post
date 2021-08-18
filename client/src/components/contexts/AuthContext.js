import { createContext, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/AuthReducer";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });
};
