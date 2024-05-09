import React from "react";
import Slider from "react-slick";
import { ImageWrapper } from "../../pages/HomePage/HomePageStyle";

const SliderComponent = ({ arrSlider }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <Slider {...settings}>
      {arrSlider.map((image, index) => (
        <ImageWrapper key={index}>
          <img src={image} alt="slider" style={{width: "100%", height: "100%" }} />
        </ImageWrapper>
      ))}
    </Slider>
  );
};

export default SliderComponent;