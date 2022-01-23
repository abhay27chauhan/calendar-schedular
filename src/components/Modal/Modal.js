import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

import "./Modal.scss";

const Modal = ({ onClose, media }) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    arrow: false,
    speed: 500,
  };
  return (
    <>
      <div className="Modal">
        <Slider {...settings}>
          {media.map((obj, index) => (
            <div key={index} className="media-container">
              <img src={obj?.mediaurl} />
            </div>
          ))}
        </Slider>
      </div>

      <div
        className="modalBackDrop"
        onClick={() => (onClose ? onClose() : "")}
      ></div>
    </>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  media: PropTypes.array,
};

export default Modal;
