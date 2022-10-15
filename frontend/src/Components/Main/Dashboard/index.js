import React, { useEffect } from "react";
import "./style.css";
import AddProduct from "../AddProduct";
import ProductPage from "../ProductPage";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { setItems, deleteItem } from "../../../redux/reducers/products";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditProduct from "../EditProduct";
import ImgHead from "../../ImgHead";

const Dashboard = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  // ****************************

  const { items, token, userId, isLoggedIn } = useSelector((state) => {
    return {
      items: state.products.items,
      token: state.users.token,
      userId: state.users.userId,
      isLoggedIn: state.users.isLoggedIn,
      ownerId: state.users.ownerId,
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

  console.log(userId, "-----");
  console.log(isLoggedIn, "+++++");

  console.log(items);

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
        <Col className="col-12">
          <ImgHead />
        </Col>
      </Row>

      <Row className="d-md-flex ms-5 row-product">
        {items
          ? items.map((item, index) => {
              return (
                <Col
                  key={index}
                  md="6"
                  lg={"3"}
                  className="mt-3 d-flex me-5 col-item"
                >
                  <Card className="mt-3 card-item">
                    {isLoggedIn && userId === item.owner_id ? (
                      <Container className="mt-1 d-flex continer-item">
                        <EditProduct props={item.id} className="editButton" />
                        <i
                          onClick={() => {
                            deleteProduct(item.id);
                          }}
                          class="fa-sharp fa-solid fa-xmark"
                        ></i>
                      </Container>
                    ) : (
                      <></>
                    )}
                    <figure>
                      <Card.Img
                        variant="top"
                        className="img-item"
                        src="https://www.educationafter12th.com/wp-content/uploads/2016/06/Mechanical-Engineering-in-india-jobs-eligiblity-syllabus.jpg"
                      ></Card.Img>
                      <figcaption>
                        <p>{item.description} </p>
                      </figcaption>
                    </figure>
                    <Card.Body
                      onClick={() => {
                        history(`/detail/${item.id}`);
                      }}
                      className="body-item"
                    >
                      <Container className="mb-5 d-flex justify-content-between row-item ">
                        <Card.Title className="title-item">
                          {item.title}
                        </Card.Title>
                      </Container>
                      <Card.Text className="price-item">
                        {`${item.price}`}
                        <span> $</span>
                      </Card.Text>
                      <Container></Container>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : []}
      </Row>
    </Container>
  );
};

export default Dashboard;
