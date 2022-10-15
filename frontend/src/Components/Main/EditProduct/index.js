import React, { useState } from "react";
import { updateItemById } from "../../../redux/reducers/products";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const EditProduct = ({ props, getItem }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const handleClose = () => setShow(false);
  const hundleModal = () => setShow(true);

  // **********************

  const dispatch = useDispatch();
  // **********************

  const { token } = useSelector((state) => {
    return {
      token: state.users.token,
    };
  });

  const updateArticle = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/products/${id}`,
        {
          title,
          description,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      dispatch(
        updateItemById({
          title,
          description,
          price,
          id,
        })
      );
      getItem();
    } catch (error) {
      console.log(error);
    }
  };

  // **********************

  const hundleAddButton = () => {
    handleClose();
    updateArticle(props);
  };
  return (
    <Container className=" editContiner">
      <i onClick={hundleModal} class="fa-solid fa-gear"></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>Update Product Info</Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></FormControl>
            </FormGroup>
            <FormGroup className="mb-3">
              <FormControl
                as="textarea"
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></FormControl>
            </FormGroup>{" "}
            <FormGroup className="mb-3">
              <FormControl
                type="number"
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></FormControl>
            </FormGroup>{" "}
            <FormGroup className="mb-3">
              <FormControl type="file" placeholder="Product-Img"></FormControl>
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
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditProduct;
