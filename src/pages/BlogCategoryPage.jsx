import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getBlogs } from "../util/blogactions";

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
          <div key={blog_id}>
            <img src={blog_image} alt="blog pic" />
            <h2>{title}</h2>
            <p>{summary.substr(0, 100)}</p>
          </div>
        );
      })}
    </section>
  );
};

export default BlogCategoryPage;
