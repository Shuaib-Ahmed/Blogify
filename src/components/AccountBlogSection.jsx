import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import { db } from "../util/blogactions";

const AccountBlogSection = ({ user_id }) => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

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

  const deleteHandler = () => {};

  return (
    <section>
      {blogs.map((data) => {
        const { title, blog_id, blog_image } = data;
        return (
          <div key={blog_id}>
            <img src={blog_image} alt="blog pic" width={200} height={200} />
            <h2>{title}</h2>
            <button onClick={() => editHandler(blog_id)}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        );
      })}
    </section>
  );
};

export default AccountBlogSection;
