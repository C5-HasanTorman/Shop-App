import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
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

import { setLogin, setUserId } from "../../redux/reducers/users";
import { useDispatch } from "react-redux";

const Login = () => {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  // useDispatch instens
  const dispatch = useDispatch();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (res) {
        dispatch(setLogin(res.data));
        dispatch(setUserId(res.data.userId));

        setStatus(true);
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };
  useEffect(() => {
    if (status) {
      history("/dashboard");
    }
  });

  return (
    <div>
      <Container className="mt-5">
        <Row className="d-flex justify-content-center mt-4">
          <Col xs={12} lg={6}>
            <Card className="shadow-lg">
              <Card.Header className="d-flex justify-content-center">
                <h4>Login</h4>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Control
                      className="mb-3"
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Example@gmail.com"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="d-flex justify-content-center">
                    <Button
                      className="mt-4"
                      variant="primary"
                      onClick={() => {
                        login();
                      }}
                    >
                      Login
                    </Button>
                  </Form.Group>
                  <Form.Group className="d-flex justify-content-center">
                    <Alert
                      variant={
                        message ? (status ? "success " : "danger ") : "light "
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

export default Login;
