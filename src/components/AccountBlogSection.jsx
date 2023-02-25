import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import style from "./css/accountBlogs.module.css";
import { Loading, Modal } from "../components";
import { db, deletetBlog } from "../util/blogactions";

const AccountBlogSection = ({ user_id }) => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    errorStatus: false,
    message: "",
  });

  useEffect(() => {
    const q = query(collection(db, "blogs"), where("user_id", "==", user_id));
    onSnapshot(q, (querySnapSot) => {
      const blogs = [];
      querySnapSot.forEach((data) => {
        blogs.push({ ...data.data(), blog_id: data.id });
      });
      setBlogs(blogs);
    });
  }, [user_id]);

  const editHandler = (blog_id) => {
    navigate(`/update-blog/${blog_id}`);
  };

  const deleteHandler = async (blog_id) => {
    setError({ errorStatus: false, message: "" });

    setLoading(true);
    const response = await deletetBlog(blog_id);
    setLoading(false);

    if (response.errorStatus) {
      setError({ errorStatus: true, message: response.message });
    }
  };

  return (
    <>
      {error.errorStatus && <Modal error={error} />}

      {loading && <Loading />}

      <section className={style.container}>
        {blogs.map((data) => {
          const { title, blog_id, blog_image } = data;
          return (
            <div
              key={blog_id}
              className={style.blogContainer}
              onClick={() => navigate(`/blog/${blog_id}`)}
            >
              <img src={blog_image} alt="blog pic" width={200} height={200} />

              <h2>{title}</h2>

              <div className={style.btnContainer}>
                <button onClick={() => editHandler(blog_id)}>
                  <FontAwesomeIcon icon={faPen} /> Edit
                </button>
                <button onClick={() => deleteHandler(blog_id)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default AccountBlogSection;
