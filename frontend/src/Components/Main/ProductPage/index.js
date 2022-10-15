import axios from "axios";
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

  console.log(userId ,"userid");

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
    <Container>
      <Row>
        <Col>
          <Card className="mt-5">
            <Card.Img
              className="mt-5"
              src="https://www.educationafter12th.com/wp-content/uploads/2016/06/Mechanical-Engineering-in-india-jobs-eligiblity-syllabus.jpg"
            ></Card.Img>
          </Card>
        </Col>
        <Col>
          {/* <Card className="mt-5">
            <Card.Title className="mt-5">{product[0].title}</Card.Title>
            <Card.Text className="mt-5"> {product[0].description}</Card.Text>
            <Card.Text className="mt-5"> {product[0].price}</Card.Text>
            {isLoggedIn && userId === product[0].owner_id ? (
              <Button></Button>
            ) : (
              <></>
            )}
          </Card> */}
        </Col>
      </Row>
      {/* <DeleteProduct props={product.owner_id} /> */}
    </Container>
  );
};

export default ProductPage;
