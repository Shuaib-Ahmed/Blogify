import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../util/authactions";

const SignUpPage = () => {
  const [input, setInput] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput((prevState) => {
      if (e.target.id === "photo") {
        return { ...prevState, [e.target.id]: e.target.files[0] };
      } else {
        return { ...prevState, [e.target.id]: e.target.value };
      }
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const response = await createUser(input);

    if (!response.errorStatus) {
      navigate("/");
    } else {
      console.log(response.message);
    }
  };

  return (
    <section>
      <h1>SIGN UP</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="photo">Profile Photo</label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            required
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="displayName">Pen Name</label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            required
            onChange={changeHandler}
          />
        </div>
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
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default SignUpPage;
