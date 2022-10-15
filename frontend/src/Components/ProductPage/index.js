import axios from "axios";
import "./style.css";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Comment from "../Comment";

const ProductPage = () => {
  // ************************
  const { userId, isLoggedIn } = useSelector((state) => {
    return {
      userId: state.users.userId,
      isLoggedIn: state.users.isLoggedIn,
    };
  });

  // ************************

  const [product, setProduct] = useState([]);

  // ************************

  let { id } = useParams();

  console.log(userId, "userid");
  console.log(id, "id");

  //get Product by Id

  const getProductbyId = () => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((result) => {
        console.log(result.data);
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
              src={
                product.img ||
                `https://thumbs.dreamstime.com/b/wow-offer-great-sale-price-sign-vector-sale-tag-wow-offer-special-sale-price-sign-advertising-discounts-symbol-shopping-banner-148091001.jpg`
              }
            ></Card.Img>
          </Card>
        </Col>
        <Col>
          <Card className="mt-5 card-page-1">
            <Card.Title className="mt-5 page-title">
              Product : {product.title}
            </Card.Title>
            <Card.Text className="mt-5 page-des">
              {`  Product - Description : 
              ${product.description}`}
            </Card.Text>
            <Card.Text className=" page-price">
              {` Price :  ${product.price} $`}{" "}
            </Card.Text>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Comment props={id} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
