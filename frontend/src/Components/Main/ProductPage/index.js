import axios from "axios";
import "./style.css";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductPage = () => {
  // ************************
  const { userId, isLoggedIn } = useSelector((state) => {
    return {
      userId: state.users.userId,
      isLoggedIn: state.users.isLoggedIn,
    };
  });

  console.log(userId, "userid");

  // ************************

  const [product, setProduct] = useState([]);

  // ************************

  let { id } = useParams();

  //get Product by Id

  const getProductbyId = () => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((result) => {
        console.log(result.data.result);
        setProduct(result.data.result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductbyId();
  }, []);

  return (
    <Container className="page-con">
      <Row>
        <Col>
          <Card className="mt-5 card-page">
            <Card.Img
              className="mt-5 img-page"
              src="https://www.educationafter12th.com/wp-content/uploads/2016/06/Mechanical-Engineering-in-india-jobs-eligiblity-syllabus.jpg"
            ></Card.Img>
          </Card>
        </Col>
        <Col>
          <Card className="mt-5 card-page">
            <Card.Title className="mt-5 page-title" >hassna</Card.Title>
            <Card.Text className="mt-5 page-des"></Card.Text>
            <Card.Text className="mt-5"> </Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
