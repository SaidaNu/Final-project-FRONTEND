import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HOME_PAGE_ROUTE,
  ABOUT_PAGE_ROUTE,
  MISSIONS_PAGE_ROUTE,
  ARTICLES_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
} from "../utils/consts";
import { useTheme } from "./ThemeContext";
import { useAuth } from "../contexts/Auth";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <header className={theme}>
      <div className="logo">Space Explorer</div>
      <nav>
        <ul>
          <li>
            <Link to={HOME_PAGE_ROUTE} className="nav-link">
              Главная
            </Link>
          </li>
          <li>
            <Link to={ABOUT_PAGE_ROUTE} className="nav-link">
              О нас
            </Link>
          </li>
          <li>
            <Link to={MISSIONS_PAGE_ROUTE} className="nav-link">
              Миссии
            </Link>
          </li>
          <li>
            <Link to={ARTICLES_PAGE_ROUTE} className="nav-link">
              Статьи
            </Link>
          </li>
          <li>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === "dark" ? "🌞 Светлая" : "🌙 Темная"}
            </button>
          </li>
          <li>
            {user ? (
              <>
                <Link to={PROFILE_PAGE_ROUTE} className="nav-link">
                  Мой профиль
                </Link>
                <button onClick={logout} className="auth-button">
                  Выйти
                </button>
              </>
            ) : (
              <button onClick={handleAuthClick} className="auth-button">
                {user ? "Выйти" : "Войти"}
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
