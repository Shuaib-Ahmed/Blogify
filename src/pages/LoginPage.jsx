import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logInUser } from "../util/authactions";

const LoginPage = () => {
  const [input, setInput] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await logInUser(input);

    if (!response.errorStatus) {
      navigate("/");
    } else {
      console.log(response.message);
    }
  };

  return (
    <section>
      <h1>LOGIN PAGE</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            required
            onChange={changeHandler}
          />
        </div>
        <button type="submit">Log In</button>
      </form>

      <Link to="/forgot-password">Forgot Password</Link>
    </section>
  );
};

export default LoginPage;
