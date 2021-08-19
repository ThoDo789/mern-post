export const apiUrl =
  process.env.NODE !== "production"
    ? "http://localhost:5000/api"
    : "someDeployUrl ";
export const LOCAL_STORAGE_TOKEN = "learnit-mern";
