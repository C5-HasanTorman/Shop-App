import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from "react-bootstrap";
import "./style.css";
import { useSelector } from "react-redux";

const Comment = ({ props }) => {
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.users.token,
      isLoggedIn: state.users.isLoggedIn,
    };
  });

  // ********************

  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const handleClose = () => setShow(false);
  const hundleModal = () => setShow(true);

  // ********************
  const addNewComment = () => {
    axios
      .post(
        `http://localhost:5000/comments/${props}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      )
      .then((result) => {
        getAllComment();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(comments);
  // ********************

  const getAllComment = () => {
    axios
      .get(`http://localhost:5000/comments/product_id/${props}`)
      .then((res) => {
        setComments(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hundleAddButton = () => {
    handleClose();
    addNewComment();
  };

  useEffect(() => {
    getAllComment();
  }, []);

  return (
    <Container className="comment-btn">
      <section className="d-comment">
        <header>Comments</header>
        {isLoggedIn && (
          <>
            <Button variant="primary" onClick={hundleModal}>
              {" "}
              Add Comment
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header> New Comment </Modal.Header>
              <Modal.Body>
                <Form>
                  <FormGroup className="mb-3">
                    <FormControl
                      type="text"
                      placeholder="Comment"
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></FormControl>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
                <Button
                  onClick={() => {
                    hundleAddButton();
                  }}
                >
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </section>
      <Container className="mt-5">
        <br />
        {comments &&
          comments.map((ele, index) => {
            return (
              <section className="map-commet mt-4">
                <img
                  src="https://cdn5.vectorstock.com/i/thumb-large/45/59/profile-photo-placeholder-icon-design-in-gray-vector-37114559.jpg"
                  className="commenterPhoto"
                />
                <p key={ele.id} className="comment-text">
                  <span className="user-col">User {ele.commenter_id} </span>{" "}
                  {`:    ${ele.comment}`}
                </p>
              </section>
            );
          })}
      </Container>
    </Container>
  );
};

export default Comment;
