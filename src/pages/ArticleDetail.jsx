import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../services/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ArticleDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axiosInstance.get(`/post/${id}`);
        setPost(data);
      } catch (error) {
        console.error("Ошибка загрузки поста:", error);
        setError("Пост не найден.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;

  return (
    <>
      <Header />
      <div className="post-detail">
        <h2>{post.title}</h2>
        <p>
          <strong>Автор:</strong> {post.user.name || "Неизвестен"}
        </p>
        <div className="post-content">{post.content}</div>

        <hr />

        <h3>Комментарии:</h3>
        {post.comments?.length > 0 ? (
          <ul className="comments">
            {post.comments.map((comment) => (
              <li key={comment._id}>
                <p>
                  <strong>{comment.user.name || "Аноним"}:</strong>{" "}
                  {comment.content}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Комментариев пока нет.</p>
        )}

        <h3>Написать комментарий:</h3>
      </div>
      <Footer />
    </>
  );
};

export default ArticleDetail;
