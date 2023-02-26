import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Loading, Modal } from "../components";
import { blogCategories, getBlog, updateBlog } from "../util/blogactions";
import style from "./css/writeBlog.module.css";

const UpdateBlogPage = () => {
  const navigate = useNavigate();
  const { blog_id } = useParams();

  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    errorStatus: false,
    message: "",
  });
  const [blog, setBlog] = useState({});
  const [photoUrl, setPhotoUrl] = useState("/image/default_image.png");

  const getBlogData = async () => {
    setError({ errorStatus: false, message: "" });

    setLoading(true);
    const response = await getBlog(blog_id);
    setLoading(false);

    if (!response.errorStatus) {
      setBlog(response.data);
      setPhotoUrl(response.data.blog_image);
    } else {
      setError({ errorStatus: true, message: response.message });
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
    setError({ errorStatus: false, message: "" });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (Object.values(input).length === 0) {
      setError({ errorStatus: true, message: "Please update blog data" });
    } else {
      setLoading(true);
      const response = await updateBlog(input, blog_id);
      setLoading(false);

      if (!response.errorStatus) {
        navigate("/account");
      } else {
        setError({ errorStatus: true, message: response.message });
      }
    }
  };

  return (
    <section className="formContainer">
      {error.errorStatus && <Modal error={error} />}

      {Object.values(blog).length === 0 && loading && <Loading />}

      {Object.values(blog).length !== 0 && (
        <>
          <h1 className="formTitle">UPDATE BLOG</h1>
          <form onSubmit={submitHandler} className={style.formContent}>
            {loading && <Loading />}

            <div className={style.imgContainer}>
              <img src={photoUrl} alt="blog_pic" />
            </div>

            <div className={style.formInputContainer}>
              <label htmlFor="blog_image">Change Blog Image</label>
              <input
                type="file"
                name="blog_image"
                id="blog_image"
                accept="image/*"
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
                defaultValue={blog.title}
              />
            </div>

            <div className={style.formInputContainer}>
              <label htmlFor="summary">Blog Details</label>
              <ReactQuill
                theme="snow"
                defaultValue={blog.summary}
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
        </>
      )}
    </section>
  );
};

export default UpdateBlogPage;
