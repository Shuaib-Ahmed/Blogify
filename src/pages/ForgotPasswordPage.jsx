import React, { useState } from "react";

import { sendEmailChangePassword } from "../util/authactions";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await sendEmailChangePassword(email);
    if (response.errorStatus) {
      console.log(response.message);
    }
  };

  return (
    <section className="formContainer">
      <h1 className="formTitle">FORGOT PASSWORD</h1>
      <form onSubmit={submitHandler} className="formContent">
        <div className="formInputContainer">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">send email</button>
      </form>
    </section>
  );
};

export default ForgotPasswordPage;
