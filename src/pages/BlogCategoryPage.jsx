import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getBlogs } from "../util/blogactions";
import style from "./css/blogCategory.module.css";

const BlogCategoryPage = () => {
  const { category } = useParams();

  const [blogs, setBlogs] = useState([]);

  const getBlogsData = async () => {
    const response = await getBlogs(category);
    if (!response.errorStatus) {
      setBlogs(response.data);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getBlogsData();
  }, [category]);

  return (
    <section>
      {blogs.map(({ title, summary, blog_image, blog_id }) => {
        return (
          <div key={blog_id} className={style.blogContainer}>
            <div className={style.blogContent}>
              <h2>{title}</h2>
              <p>{summary.substr(0, 250)} ...</p>
              <Link to="/">Read More</Link>
            </div>
            <div className={style.imgContainer}>
              <div></div>
              <img src={blog_image} alt="blog pic" />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default BlogCategoryPage;
