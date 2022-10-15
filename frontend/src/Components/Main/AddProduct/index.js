import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItems } from "../../../redux/reducers/products";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from "react-bootstrap";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.users.token,
      isLoggedIn: state.users.isLoggedIn,
    };
  });

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const handleClose = () => setShow(false);
  const hundleModal = () => setShow(true);

  const addNewItem = async () => {
    const Products = {
      title,
      description,
      price,
    };
    try {
      const result = await axios.post(
        `http://localhost:5000/products`,

        Products,

        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      if (result.data.success) {
        console.log(result);
        dispatch(addItems(Products));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hundleAddButton = () => {
    handleClose();
    addNewItem();
  };

  return (
    isLoggedIn && (
      <Container>
        <Button variant="warning" onClick={hundleModal}>
          {" "}
          New
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>Add New Product</Modal.Header>
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
                <FormControl
                  type="file"
                  placeholder="Product-Img"
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
      </Container>
    )
  );
};

export default AddProduct;
