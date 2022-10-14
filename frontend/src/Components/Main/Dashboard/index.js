import React, { useEffect } from "react";
import AddProduct from "../AddProduct";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { setItems } from "../../../redux/reducers/products";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => {
    return {
      items: state.products.items,
    };
  });
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

  useEffect(() => {
    getItem();
  }, []);

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
                    <Card.Img
                      variant="top"
                      src="https://www.educationafter12th.com/wp-content/uploads/2016/06/Mechanical-Engineering-in-india-jobs-eligiblity-syllabus.jpg"
                    ></Card.Img>
                    <Card.Body>
                      <Row className="d-flex flex-row">
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>{`${item.price} $`}</Card.Text>
                      </Row>
                      <Card.Text>{`${item.description} $`}</Card.Text>
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
