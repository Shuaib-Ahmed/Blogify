import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import style from "./css/blogDetail.module.css";
import { Loading, Modal } from "../components";
import { getBlog, getUserDetails } from "../util/blogactions";

const BlogDetailPage = () => {
  const { blog_id } = useParams();

  const [blogData, setBlogData] = useState({});
  const [writerData, setWriterData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    errorStatus: false,
    message: "",
  });

  const getWriterData = async (user_id) => {
    setError({ errorStatus: false, message: "" });

    setLoading(true);
    const response = await getUserDetails(user_id);
    setLoading(false);

    if (!response.errorStatus) {
      setWriterData(response.data);
    } else {
      setError({ errorStatus: true, message: response.message });
    }
  };

  const fetchBlogData = async (blog_id) => {
    setError({ errorStatus: false, message: "" });

    setLoading(true);
    const response = await getBlog(blog_id);
    setLoading(false);

    if (!response.errorStatus) {
      setBlogData(response.data);
      getWriterData(response.data.user_id);
    } else {
      setError({ errorStatus: true, message: response.message });
    }
  };

  useEffect(() => {
    fetchBlogData(blog_id);
  }, [blog_id]);

  return (
    <>
      {error.errorStatus && <Modal error={error} />}

      {loading && <Loading />}

      {Object.keys(blogData).length !== 0 && (
        <section className={style.blogDetailContainer}>
          <img
            src={blogData.blog_image}
            alt="blog pic"
            className={style.blogImage}
          />

          <div className={style.blogDetails}>
            <h1>{blogData.title}</h1>
            <div className={style.authorDetails}>
              <img src={writerData.photoURL} alt="writer pic" />
              <span>{writerData.displayName}</span>
            </div>
          </div>

          <p className={style.blogSummary}>{blogData.summary}</p>
        </section>
      )}
    </>
  );
};

export default BlogDetailPage;
