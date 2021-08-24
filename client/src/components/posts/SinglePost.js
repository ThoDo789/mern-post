import React from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import ActionButtons from "./ActionButtons";
const SinglePost = ({ posts: { _id, title, description, url, status } }) => {
  return (
    <Card
      className="shadow"
      border={
        status === "LEARNED"
          ? "success"
          : status === "LEARNING"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill={true}
                className={
                  status === "LEARNED"
                    ? "bg-success "
                    : status === "LEARNING"
                    ? "bg-warning"
                    : "bg-danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
