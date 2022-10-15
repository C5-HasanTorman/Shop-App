import "./style.css";
import React from "react";
import Figure from "react-bootstrap/Figure";

const ImgHead = () => {
  return (
    <div className="container img-head">
      <Figure>
        <Figure.Image
          width={171}
          height={180}
          className="col-12 img-top"
          alt="171x180"
          src="https://mediacdn.grabone.co.nz/asset/XZ6ZrWkz9d"
        />
      </Figure>
    </div>
  );
};

export default ImgHead;