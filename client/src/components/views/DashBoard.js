import React, { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import {
  Spinner,
  Card,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Toast,
} from "react-bootstrap";

import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../posts/SinglePost";
import AddPostModal from "../posts/AddPostModal";
import addIcon from "../../assets/plus-circle-fill.svg"
import UpdatePostModal from "../posts/UpdatePostModal";
const DashBoard = () => {
    const {authState:{user:{username}}} = useContext(AuthContext)


  const {
    postState: { posts, postsLoading,post },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  
  } = useContext(PostContext);
  //start get all posts
  useEffect(()=>{
      getPosts()
  },[])
    let body=null;
    if(postsLoading){
      body=(
       <div className="spinner-container">
          <Spinner animation="border" variant="info" />
       </div>
      )
    }else if(posts.length===0){
      body = (
        <>
          <Card className="text-center my-5 mx-5">
            <Card.Header as="h1">Hi {username} !!</Card.Header>
            <Card.Body>
              <Card.Title>Welcome to LearnIt </Card.Title>
              <Card.Text>
                Click to button below to track your first skill ro learn!
              </Card.Text>
              <Button
                variant="primary"
                onClick={()=>setShowAddPostModal(true)}
              >
                LearnIt
              </Button>
            </Card.Body>
          </Card>
        </>
      );
    }else{
      body=(
        <>
        <Row className="row-cols-1 row-cols-md-3 mx-auto mt-3 ">
              {posts.map((post)=>(
                    <Col key={post._id} className="my-2">
                      <SinglePost posts={post}/>
                    </Col>
              ))}
        </Row>
        {/* open add post modal */}
        <OverlayTrigger placement='left' overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
       
        <Button 
        className="btn-floating" 
        onClick={()=>setShowAddPostModal(true)}
        variant="none" >
          <img src={addIcon} alt="add" height="32" width="32" />
        </Button>
     
        </OverlayTrigger>
        </>
      )
    }
  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {/* after post is added ,show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={()=>setShowToast({
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default DashBoard;
