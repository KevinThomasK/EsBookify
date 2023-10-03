import React from "react";
import { useState, useEffect } from "react";
import classes from './Slider.module.css';
import { SliderData } from "./SliderData";


const Slider = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = SliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 2500;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  };

  function auto(){
    slideInterval = setInterval(nextSlide, intervalTime)
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => {
        clearInterval(slideInterval)
    }
  }, [currentSlide]);


  return (
    <div className="slider">
      {/* <ArrowBackIosIcon className="arrow prev" onClick={prevSlide}/>
      <ArrowForwardIosIcon className="arrow next" onClick={nextSlide} /> */}

      {props.SliderData.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <div>
                <img src={slide.image} alt="slide" className="slideimage" />
              
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
