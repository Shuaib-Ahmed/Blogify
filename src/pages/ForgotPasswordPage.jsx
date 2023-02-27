import React, { useState } from "react";

import { Loading, Modal } from "../components";
import { sendEmailChangePassword } from "../util/authactions";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    errorStatus: false,
    message: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setError({ errorStatus: false, message: "" });

    setLoading(true);
    const response = await sendEmailChangePassword(email);
    setLoading(false);

    if (!response.errorStatus) {
      alert("Email has been sent, please kindly check");
    } else {
      setError({ errorStatus: true, message: response.message });
    }
  };

  return (
    <section className="formContainer">
      {error.errorStatus && <Modal error={error} />}

      <h1 className="formTitle">FORGOT PASSWORD</h1>

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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">send email</button>
      </form>
    </section>
  );
};

export default ForgotPasswordPage;
