import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/Auth";

const ProfilePage = () => {
  const { user, logout, isAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuth || !user) {
    return <div>Загрузка...</div>;
  }

  const handleAuthClick = () => {
    if (isAuth) {
      logout();
    } else {
      navigate("/login");
    }
  };

  if (!isAuth || !user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="profile-container">
      <Header />
      <h2>Профиль пользователя</h2>
      <p>
        <strong>ID:</strong> {user.name}
      </p>
      <p>
        <strong>Роль:</strong> {user.isAdmin ? "Администратор" : "Пользователь"}
      </p>
      <button onClick={handleLogout} className="auth-button">
        Выйти
      </button>
    </div>
  );
};

export default ProfilePage;
