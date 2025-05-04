import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { axiosInstance } from "../services/axios";
import { Link } from "react-router-dom";

const ArticlePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true);
        const { data } = await axiosInstance.get("/post");
        setPosts(data);
      } catch (error) {
        console.error("Ошибка при загрузке постов:", error);
        setError("Не удалось загрузить статьи.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      <Header />
      <div className="container">
        <Link to={CREATE_POST_ROUTE} className="add-post-btn">
          ➕ Добавить пост
        </Link>
        {posts.length === 0 ? (
          <p>Нет постов для отображения.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <Link to={`/articles/${post._id}`}>
                  <h3>{post.title}</h3>
                </Link>
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ArticlePage;
