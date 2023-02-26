import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Loading, Modal } from "../components";
import { blogCategories, createNewBlog } from "../util/blogactions";
import style from "./css/writeBlog.module.css";

const WriteBlogPage = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    errorStatus: false,
    message: "",
  });
  const [photoUrl, setPhotoUrl] = useState("/image/default_image.png");

  const changeHandler = (e) => {
    setInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const imageHandler = (e) => {
    const photo = e.target.files[0];
    const photoUrl = URL.createObjectURL(photo);
    setPhotoUrl(photoUrl);
    setInput((prevState) => {
      return { ...prevState, [e.target.id]: photo };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setError({ errorStatus: false, message: "" });

    setLoading(true);
    const response = await createNewBlog(input);
    setLoading(false);

    if (!response.errorStatus) {
      navigate("/account");
    } else {
      setError({ errorStatus: true, message: response.message });
    }

    console.log(input);
  };

  return (
    <section className="formContainer">
      {error.errorStatus && <Modal error={error} />}

      <h1 className="formTitle">PUBLISH NEW BLOG</h1>

      <form onSubmit={submitHandler} className={style.formContent}>
        {loading && <Loading />}

        <div className={style.imgContainer}>
          <img src={photoUrl} alt="blog_pic" />
        </div>

        <div className={style.formInputContainer}>
          <label htmlFor="blog_image">Blog Image</label>
          <input
            type="file"
            name="blog_image"
            id="blog_image"
            accept="image/*"
            required
            onChange={imageHandler}
          />
        </div>

        <div className={style.formInputContainer}>
          <label htmlFor="title">Blog Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            onChange={changeHandler}
            placeholder="Enter blog title"
          />
        </div>

        <div className={style.formInputContainer}>
          <label htmlFor="summary">Blog Details</label>
          <ReactQuill
            theme="snow"
            onChange={(summary) => {
              setInput((prevState) => {
                return { ...prevState, summary };
              });
            }}
            placeholder="Enter blog details"
          />
        </div>

        <div className={style.categoryContainer}>
          <p>Select Category</p>
          <div>
            {blogCategories.map((category, index) => {
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="category"
                    id={category}
                    value={category}
                    required
                    onChange={changeHandler}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              );
            })}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default WriteBlogPage;
