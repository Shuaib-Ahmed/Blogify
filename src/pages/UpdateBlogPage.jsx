import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { blogCategories, getBlog, updateBlog } from "../util/blogactions";

const UpdateBlogPage = () => {
  const navigate = useNavigate();
  const { blog_id } = useParams();

  const [input, setInput] = useState({});
  const [blog, setBlog] = useState({});
  const [photoUrl, setPhotoUrl] = useState("");

  const getBlogData = async () => {
    const response = await getBlog(blog_id);
    if (!response.errorStatus) {
      setBlog(response.data);
      setPhotoUrl(response.data.blog_image);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getBlogData();
  }, [blog_id]);

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
    if (Object.values(input).length === 0) {
      console.log("Please update form");
    } else {
      const response = await updateBlog(input, blog_id);
      if (!response.errorStatus) {
        navigate("/account");
      } else {
        console.log(response.message);
      }
    }
    console.log(input);
  };

  return (
    <section>
      <h1>Update blog</h1>

      {Object.values(blog).length !== 0 && (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              onChange={changeHandler}
              defaultValue={blog.title}
            />
          </div>
          <div>
            <label htmlFor="summary">Blog Details</label>
            <textarea
              name="summary"
              id="summary"
              required
              onChange={changeHandler}
              defaultValue={blog.summary}
            ></textarea>
          </div>
          <div>
            {photoUrl && <img src={photoUrl} alt="blog_pic" />}
            <div>
              <label htmlFor="blog_image">Change Blog Image</label>
              <input
                type="file"
                name="blog_image"
                id="blog_image"
                accept="image/*"
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
                    onChange={changeHandler}
                    defaultChecked={category === blog.category}
                  />
                </div>
              );
            })}
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </section>
  );
};

export default UpdateBlogPage;
