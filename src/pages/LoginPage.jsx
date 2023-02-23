import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Loading, Modal } from "../components";
import { logInUser } from "../util/authactions";

const LoginPage = () => {
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    errorStatus: false,
    message: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError({ errorStatus: false, message: "" });

    setLoading(true);
    const response = await logInUser(input);
    setLoading(false);

    if (!response.errorStatus) {
      navigate("/");
    } else {
      setError({ errorStatus: true, message: response.message });
    }
  };

  return (
    <section className="formContainer">
      {error.errorStatus && <Modal error={error} />}

      <h1 className="formTitle">LOGIN PAGE</h1>

      <form onSubmit={submitHandler} className="formContent">
        {loading && <Loading />}

        <div className="formInputContainer">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
            onChange={changeHandler}
          />
        </div>
        <div className="formInputContainer">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            onChange={changeHandler}
          />
        </div>
        <button type="submit">Log In</button>
      </form>

      <Link to="/forgot-password" className="forgotPasswordBtn">
        Forgot Password ??
      </Link>
    </section>
  );
};

export default LoginPage;
