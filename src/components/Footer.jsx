import React from "react";
import style from "./css/footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <h2 className={style.logo}>Blogify</h2>
      <h3 className={style.content}>
        Copyright &#169; 2023 Shuaib Ahmed, All rights reserved.
      </h3>
    </footer>
  );
};

export default Footer;
