import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
const Register = () => {
  // stete
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // send Request

  const addUser = () => {
    axios
      .post("http://localhost:5000/register/", {
        firstName,
        lastName,
        country,
        email,
        password,
      })
      .then((result) => {
        if (result.data.success) {
          setIsRegister(true);
          setMessage("The user has been created successfully");
        } else throw Error;
      })
      .catch((err) => {
        setIsRegister(false);
        if (err.response && err.response.data) {
          return setMessage(err.response.data.message);
        }
        setMessage("Error happened while register, please try again");
      });
  };
  return (
    <div>
      <Container className="mt-5">
        <Row className="d-flex justify-content-center mt-4">
          <Col xs={12} lg={6}>
            <Card className="shadow-lg">
              <Card.Header className="d-flex justify-content-center">
                <h4>Register</h4>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Control
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      className="mb-3"
                      type="text"
                      placeholder="First Name"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      className="mb-3"
                      type="text"
                      placeholder="Last Name"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                      className="mb-3"
                      type="text"
                      placeholder="City"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="mb-3"
                      type="email"
                      placeholder="Example@gmail.com"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      placeholder="Password"
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="d-flex justify-content-center">
                    <Button
                      onClick={() => {
                        addUser();
                      }}
                      className="mt-4"
                      variant="warning"
                    >
                      Register
                    </Button>
                  </Form.Group>
                  <Form.Group className="d-flex justify-content-center">
                    <Alert
                      variant={
                        message
                          ? isRegister
                            ? "success "
                            : "danger "
                          : "light "
                      }
                      className="mt-4"
                    >
                      {message}
                    </Alert>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;