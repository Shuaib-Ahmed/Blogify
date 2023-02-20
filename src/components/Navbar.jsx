import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

import { auth, logOutUser } from "../util/authactions";
import { blogCategories } from "../util/blogactions";

const Navbar = () => {
  const [login, setLogin] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  const logoutHandler = async () => {
    const response = await logOutUser();

    if (response.errorStatus) {
      console.log(response.message);
    }
  };

  return (
    <section>
      <nav>
        <h3>Logo</h3>

        <ul>
          {blogCategories.map((category) => {
            return (
              <li key={category}>
                <Link to={`/blogs/${category}`}>{category}</Link>
              </li>
            );
          })}
        </ul>

        {login && (
          <div>
            <Link to="/account">Account</Link>
            <button onClick={logoutHandler}>Logout</button>
            <Link to="/write-new-blog">Write</Link>
          </div>
        )}

        {!login && (
          <div>
            <Link to="/log-in">Login</Link>
            <Link to="/sign-up">Sign-Up</Link>
          </div>
        )}
      </nav>
    </section>
  );
};

export default Navbar;
