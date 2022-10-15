import React from "react";
import "./style.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/reducers/users";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.users.isLoggedIn,
    };
  });

  return (
    <Container fluid className=" container-fluid p-0 ">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="lg"
        variant="dark"
        className="nav-header"
      >
        <Container fluid="lg" className="cont-max">
          <Navbar.Brand className="title-head" href="/dashboard">
            Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto gap-3">
              <Nav.Link href="#features">
                <i class="fa-solid fa-cart-shopping"></i>
              </Nav.Link>
              <Nav.Link href="#pricing">
                <i class="fa-solid fa-heart"></i>
              </Nav.Link>
              {isLoggedIn ? (
                <Nav.Link>
                  <i
                    class="fa-solid fa-arrow-right-from-bracket"
                    onClick={() => {
                      dispatch(setLogout());
                    }}
                  ></i>{" "}
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link
                    href="#deets"
                    onClick={() => {
                      history("/login");
                    }}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    eventKey={2}
                    href="#memes"
                    onClick={() => {
                      history("/register");
                    }}
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};
export default Header;
