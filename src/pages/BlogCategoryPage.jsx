import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Loading, Modal } from "../components";
import { getBlogs } from "../util/blogactions";
import style from "./css/blogCategory.module.css";

const BlogCategoryPage = () => {
  const { category } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    errorStatus: false,
    message: "",
  });
  const [blogs, setBlogs] = useState([]);

  const getBlogsData = async () => {
    setError({ errorStatus: false, message: "" });

    setLoading(true);
    const response = await getBlogs(category);
    setLoading(false);

    if (!response.errorStatus) {
      setBlogs(response.data);
    } else {
      setError({ errorStatus: true, message: response.message });
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  useEffect(() => {
    getBlogsData();
  }, [category]);

  return (
    <section>
      {error.errorStatus && <Modal error={error} />}

      {loading && <Loading />}

      {!loading &&
        blogs.map(({ title, summary, blog_image, blog_id }) => {
          return (
            <div key={blog_id} className={style.blogContainer}>
              <div className={style.blogContent}>
                <h2>{title}</h2>
                <p>{getText(summary).substr(0, 250)} ...</p>
                <Link to={`/blog/${blog_id}`}>Read More</Link>
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
