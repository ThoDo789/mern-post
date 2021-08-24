export const apiUrl =
  process.env.NODE !== "production"
    ? "http://localhost:5000/api"
    : "someDeployUrl ";
export const LOCAL_STORAGE_TOKEN = "learnit-mern";
export const POST_LOADED_SUCCESS = "POST_LOADED_SUCCESS";
export const POST_LOADED_FAIL = "POST_LOADED_FAIL";

    