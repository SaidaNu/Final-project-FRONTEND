import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_PAGE_ROUTE, HOME_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from "../utils/consts";
import Header from "../components/Header";
import { axiosInstance } from "../services/axios";
import { useAuth } from "../contexts/Auth";
import { parseJwt } from "../utils/parseJwt";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const userData = parseJwt(data.token); // распарсим payload
      console.log("Login:", data.token, userData);

      console.log(data);
      login(data.token, userData);
      navigate(PROFILE_PAGE_ROUTE);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="auth-container">
        <h2>Вход в аккаунт</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={loading}>
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>
        <p>
          Нет аккаунта? <Link to={REGISTER_PAGE_ROUTE}>Регистрация</Link>
          {error && <span>{error.toString()}</span>}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
