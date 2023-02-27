import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPenNib,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { auth, logOutUser } from "../util/authactions";
import { blogCategories } from "../util/blogactions";
import style from "./css/navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, []);

  const logoutHandler = async () => {
    const response = await logOutUser();

    if (!response.errorStatus) {
      setShowNav(false);
    } else {
      console.log(response.message);
    }
  };

  return (
    <nav className={style.navbar}>
      <h3 className={style.logo} onClick={() => navigate("/")}>
        Blogify
      </h3>

      <section
        className={`${style.navLinks} ${
          showNav ? style.showNav : style.closeNav
        }`}
      >
        <h3 className={style.closeNavBtn} onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faXmark} /> Close
        </h3>

        <ul className={style.navCategoryLinks}>
          {blogCategories.map((category) => {
            return (
              <li key={category} onClick={() => setShowNav(false)}>
                <Link to={`/blogs/${category}`}>{category}</Link>
              </li>
            );
          })}
        </ul>

        {login && (
          <div className={style.navAuthLinks}>
            <Link to="/account" onClick={() => setShowNav(false)}>
              <FontAwesomeIcon icon={faUser} />
              <span>Account</span>
            </Link>
            <button onClick={logoutHandler} className={style.borderBtn}>
              Log-out
            </button>
            <Link to="/write-new-blog" onClick={() => setShowNav(false)}>
              <FontAwesomeIcon icon={faPenNib} />
              <span>Write</span>
            </Link>
          </div>
        )}

        {!login && (
          <div className={style.navAuthLinks}>
            <Link
              to="/log-in"
              className={style.borderBtn}
              onClick={() => setShowNav(false)}
            >
              Log-in
            </Link>
            <Link
              to="/sign-up"
              className={style.borderBtn}
              onClick={() => setShowNav(false)}
            >
              Sign-Up
            </Link>
          </div>
        )}
      </section>

      <button className={style.openNavBtn} onClick={() => setShowNav(true)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </nav>
  );
};

export default Navbar;
