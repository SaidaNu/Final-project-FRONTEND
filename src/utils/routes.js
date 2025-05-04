// import FormPage from "../pages/FormPage";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import Posts from "../pages/Posts";
import ProfilePage from "../pages/Profile";
import RegisterPage from "../pages/RegisterPage";
import Missions from "../pages/Missions";
import NotFound from "../pages/NotFound";
import ArticlePage from "../pages/Articles";
import ArticleDetail from "../pages/ArticleDetail";
import {
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  REGISTER_PAGE_ROUTE,
  POSTS_PAGE_ROUTE,
  ARTICLES_PAGE_ROUTE,
  ARTICLEDETAIL_PAGE_ROUTE,
  ABOUT_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  MISSIONS_PAGE_ROUTE,
  NOTFOUND_PAGE_ROUTE,
} from "./consts";

export const routes = [
  {
    path: HOME_PAGE_ROUTE,
    element: <Home />,
  },
  {
    path: LOGIN_PAGE_ROUTE,
    element: <LoginPage />,
  },
  {
    path: REGISTER_PAGE_ROUTE,
    element: <RegisterPage />,
  },
  {
    path: POSTS_PAGE_ROUTE,
    element: <Posts />,
  },
  {
    path: ARTICLES_PAGE_ROUTE,
    element: <ArticlePage />,
  },
  {
    path: ARTICLEDETAIL_PAGE_ROUTE,
    element: <ArticleDetail />,
  },
  {
    path: ABOUT_PAGE_ROUTE,
    element: <About />,
  },
  {
    path: MISSIONS_PAGE_ROUTE,
    element: <Missions />,
  },
  {
    path: PROFILE_PAGE_ROUTE,
    element: <ProfilePage />,
  },
  {
    path: NOTFOUND_PAGE_ROUTE,
    element: <NotFound />,
  },
];
