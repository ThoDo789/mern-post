import React, { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import {Spinner, Card, Button, Row, Col, OverlayTrigger, Tooltip}  from "react-bootstrap";

import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../posts/SinglePost";
import AddPostModal from "../posts/AddPostModal";
import addIcon from "../../assets/plus-circle-fill.svg"
const DashBoard = () => {
    const {authState:{user:{username}}} = useContext(AuthContext)


  const {
    
    postState:  {  posts, postsLoading  },getPosts,setShowAddPostModal
  
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
      body=(
        <>
        <Card className="text-center my-5 mx-5">
            <Card.Header as='h1'>
              Hi {username} !!
            </Card.Header> 
            <Card.Body>
              <Card.Title>Welcome to LearnIt </Card.Title>
              <Card.Text>
                Click to button below to track your first skill ro learn!
              </Card.Text>
              <Button variant="primary" >LearnIt</Button>
            </Card.Body>
        </Card>
        </>
      )
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
        {({ ref, ...triggerHandler }) => (
        <Button className="btn-floating" onClick={setShowAddPostModal.bind(this,true)} variant="none" {...triggerHandler}>
          <img src={addIcon} alt="add" height="32" width="32" ref={ref} />
        </Button>
         )}
        </OverlayTrigger>
        </>
      )
    }
  return <>{body}
    <AddPostModal/>
  </>;
};

export default DashBoard;
