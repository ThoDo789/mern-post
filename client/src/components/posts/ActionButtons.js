import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { PostContext } from "../contexts/PostContext";
const ActionButtons = ({ url, _id }) => {
  const {  deletePost, findPost, setShowUpdatePostModal  } = useContext(PostContext);
  const choosePost =(postId)=>{
      findPost(postId)
      setShowUpdatePostModal(true)
  }
  return (
    <>
      <Button
        className="post-button"
        href={url}
        target="_blank"
        variant="light"
      >
        <img src={playIcon} alt="" width="32" height="32" />
      </Button>{" "}
      <Button className="post-button" variant="light" onClick={()=>choosePost(_id)}  >
        <img src={editIcon} alt="" width="24" height="24" />
      </Button>{" "}
      <Button className="post-button" variant="light" onClick={()=>deletePost(_id)}>
        <img src={deleteIcon} alt="" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtons;
