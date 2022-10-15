import React from "react";
import { Container } from "react-bootstrap";
import { addToList } from "../../redux/reducers/favorite";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import axios from "axios";

const Favorite = ({ props }) => {
  const dispatch = useDispatch();

  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.users.token,
      isLoggedIn: state.users.isLoggedIn,
    };
  });

  const addToFavorite = (id) => {
    axios
      .post(
        `http://localhost:5000/favorite/${props}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        if (result) {
          dispatch(addToList(result.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    isLoggedIn && (
      <Container className="d-flex ms heart-fav">
        <i class="fa-regular fa-heart fa-lg"></i>{" "}
      </Container>
    )
  );
};

export default Favorite;
