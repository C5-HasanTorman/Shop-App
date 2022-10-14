import React from "react";
import AddProduct from "../AddProduct";
import { Container, Row } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container>
      <Row>
        <AddProduct />
      </Row>
    </Container>
  );
};

export default Dashboard;
