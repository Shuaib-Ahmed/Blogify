import React from "react";
import { Typewriter } from "react-simple-typewriter";

import style from "./css/home.module.css";

const HomePage = () => {
  return (
    <section>
      <section className={style.heroContainer}>
        <h1>
          <Typewriter
            words={[
              "SHARE YOUR THOUGHTS",
              "READ OTHER PEOPLE THOUGHTS",
              "SIX DIFFERENT CATEGORY TO WRITE AND READ",
            ]}
            loop={false}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <div className={style.imgContainer}>
          <div></div>
          <img src="image/hero_image.jpeg" alt="hero pic" />
        </div>
      </section>
    </section>
  );
};

export default HomePage;
