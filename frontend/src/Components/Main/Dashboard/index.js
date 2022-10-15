import React, { useEffect, useState } from "react";
import AddProduct from "../AddProduct";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { setItems, deleteItem } from "../../../redux/reducers/products";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import EditProduct from "../EditProduct";

const Dashboard = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  // ****************************

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [productId, setProductId] = useState();
  const [updateBox, setUpdateBox] = useState(false);

  // ****************************
  const { items, token } = useSelector((state) => {
    return {
      items: state.products.items,
      token: state.users.token,
    };
  });
  // ****************************

  const getItem = () => {
    axios
      .get(`http://localhost:5000/products`)
      .then((result) => {
        dispatch(setItems(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ****************************

  const deleteProduct = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/products/${id}/remove`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      dispatch(deleteItem(id));
    } catch (error) {
      console.log(error);
    }
  };

  // ****************************

  useEffect(() => {
    getItem();
  }, []);

  // ****************************

  return (
    <Container className="mt-5">
      <Row>
        <Col className="col-12">
          <AddProduct />
        </Col>
      </Row>
      <Row>
        <Col className="mt-5 d-flex me-5">
          {items
            ? items.map((item) => {
                return (
                  <Card key={item.id} className="mt-3">
                    <Link to={`/detail/${item.id}`}>
                      <Card.Img
                        variant="top"
                        src="https://www.educationafter12th.com/wp-content/uploads/2016/06/Mechanical-Engineering-in-india-jobs-eligiblity-syllabus.jpg"
                      ></Card.Img>
                    </Link>
                    <Card.Body>
                      <Row className="d-flex flex-row">
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>{`${item.price} $`}</Card.Text>
                      </Row>
                      <Card.Text>{item.description}</Card.Text>

                      <i
                        onClick={() => {
                          deleteProduct(item.id);
                        }}
                        class="fa-regular fa-xmark"
                      ></i>
                      <EditProduct props={item.id} />
                    </Card.Body>
                  </Card>
                );
              })
            : []}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
