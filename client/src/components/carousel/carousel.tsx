import React from "react";
import { Carousel } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './carousel.css'

import january from "../img/Prompts/2024/January_2024.jpg"
import february from "../img/Prompts/2024/february_2024.jpg"
import march from "../img/Prompts/2024/March_2024.jpg"
import june from "../img/Prompts/2024/June_2024.jpg"
import august from "../img/Prompts/2024/August_2024.jpg"
import september from "../img/Prompts/2024/September_2024.jpg"
import october from "../img/Prompts/2024/October_2024.jpg"

const images = [
  { month: "january", src: january },
  { month: "february", src: february },
  { month: "march", src: march },
  // { month: "april", src: april },
  // { month: "may", src: may },
  { month: "june", src: june },
  // { month: "july", src: july },
  { month: "august", src: august },
  { month: "september", src: september },
  { month: "october", src: october },
  // { month: "november", src: november },
  // { month: "december", src: december },
];

const Carousel1: React.FC = () => {
  return (
    <div className="d-flex justify-content-center col-12 col-lg-6  mx-auto carr">
      <Carousel 
        interval={3000}         // autoplay every 3 seconds
        indicators={true}       // show dots
        controls={true}         // show next/prev arrows
        fade={true}             // Bootstrap fade transition
        // pause="hover"           // pause when hovered
        
      >
        {images.map((item, index) => (
          <Carousel.Item key={index}>
            {/* <Link to={`#${item.month}`}> */}
              
            {/* </Link> */}
            <a href={`#${item.month}`}>
              <motion.img
                src={item.src}
                alt={item.month}
                className="d-block car"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Carousel1;