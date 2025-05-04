import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { LOGIN_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from "../utils/consts";
import { axiosInstance } from "../services/axios";
import { useAuth } from "../contexts/Auth";
import { parseJwt } from "../utils/parseJwt";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    try {
      const { data } = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        isAdmin,
      });
      const { token } = data;
      const userData = parseJwt(token);
      console.log("Login:", token, userData);
      login(token, userData);
      navigate(PROFILE_PAGE_ROUTE);
    } catch (error) {
      console.error("Registration failed:", error);
      console.log("Response data:", error.response?.data);
      setError("Ошибка регистрации. Попробуйте снова.");
    }
  };

  return (
    <div>
      <Header />

      <div className="auth-container">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="checkbox-wrapper">
            <label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <span> Администратор</span>
            </label>
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form>

        <p>
          Уже есть аккаунт? <Link to={LOGIN_PAGE_ROUTE}>Войти</Link>
          {error && <span>{error.toString()}</span>}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
