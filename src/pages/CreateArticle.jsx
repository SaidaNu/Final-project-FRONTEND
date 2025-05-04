import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axios";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const { data } = await axiosInstance.post(
        "/posts",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post created:", data);
      navigate("/posts"); // после успешного создания перекидываем на список
    } catch (err) {
      console.error("Ошибка при создании поста:", err);
      setError("Не удалось создать пост");
    }
  };

  return (
    <div className="create-post-container">
      <h2>Создание нового поста</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Содержимое"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Отправить</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CreateArticle;