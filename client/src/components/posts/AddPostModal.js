import React, { useContext, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { PostContext } from "../contexts/PostContext";
const AddPostModal = () => {
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);
  const closeDialog = () => {
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddPostModal(false);

  };
  //state
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
  const { title, url, description } = newPost;
  const onChangeNewPostForm = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    closeDialog();
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };
 
  return (
    <Modal show={showAddPostModal} animation={false} onHide={closeDialog}>
      <Modal.Header closeButton onClick={closeDialog}>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              className="mt-2"
              onChange={onChangeNewPostForm}
              value={title}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>

            <Form.Control
              as="textarea"
              placeholder="Description"
              row="3"
              name="description"
              className="mt-2"
              onChange={onChangeNewPostForm}
              value={description}
            />
            <Form.Control
              type="text"
              placeholder="URL to tutorial channel"
              name="url"
              className="mt-3"
              onChange={onChangeNewPostForm}
              value={url}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            to LearnIt
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
