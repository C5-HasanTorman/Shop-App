import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOwnerId } from "../../../redux/reducers/users";
import { addItems } from "../../../redux/reducers/products";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from "react-bootstrap";

const AddProduct = ({ props }) => {
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.users.token,
      isLoggedIn: state.users.isLoggedIn,
    };
  });

  const [media, setMedia] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const handleClose = () => setShow(false);
  const hundleModal = () => setShow(true);
  console.log(img);

  const addNewItem = async () => {
    const Products = {
      title,
      description,
      price,
      img,
    };
    console.log(Products);
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
      props();
      if (result.data.success) {
        console.log(result);
        dispatch(addItems(Products));
        dispatch(setOwnerId(result.data.userId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "media-app");
    data.append("cloud_name", "hassan1995");

    fetch("https://api.cloudinary.com/v1_1/hassan1995/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImg(data.url);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };

  const hundleAddButton = () => {
    handleClose();
    addNewItem();
  };

  return (
    isLoggedIn && (
      <Container className="add-item">
        <Button variant="primary" onClick={hundleModal}>
          {" "}
          Add New Product
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
              <FormGroup className="mb-3 d-flex">
                <FormControl
                  type="file"
                  placeholder="Product-Img"
                  onChange={(e) => {
                    setMedia(e.target.files[0]);
                  }}
                ></FormControl>
                <Button
                  onClick={() => {
                    uploadImage();
                  }}
                >
                  Uplode
                </Button>
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
