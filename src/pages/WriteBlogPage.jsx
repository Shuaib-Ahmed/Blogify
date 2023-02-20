import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { blogCategories, createNewBlog } from "../util/blogactions";

const WriteBlogPage = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({});
  const [photoUrl, setPhotoUrl] = useState("");

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
    const response = await createNewBlog(input);

    if (!response.errorStatus) {
      navigate("/account");
    } else {
      console.log(response.message);
    }
  };

  return (
    <section>
      <h1>Write new blogs</h1>

      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">Blog Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="summary">Blog Details</label>
          <textarea
            name="summary"
            id="summary"
            required
            onChange={changeHandler}
          ></textarea>
        </div>
        <div>
          {photoUrl && <img src={photoUrl} alt="blog_pic" />}
          <div>
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
        </div>
        <div>
          <h3>Select Category</h3>
          {blogCategories.map((category, index) => {
            return (
              <div key={index}>
                <label htmlFor={category}>{category}</label>
                <input
                  type="radio"
                  name="category"
                  id={category}
                  value={category}
                  required
                  onChange={changeHandler}
                />
              </div>
            );
          })}
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default WriteBlogPage;
